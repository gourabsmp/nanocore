import { Router, Response } from 'express';
import prisma from '../prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// POST /api/orders — Create order (requires auth)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { items, paymentMethod } = req.body;
    // items: [{ variantId: number, quantity: number }]

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    if (!paymentMethod) {
      return res.status(400).json({ error: 'Payment method is required' });
    }

    const validMethods = ['COD', 'BANK_TRANSFER', 'CREDIT_CARD', 'GCASH'];
    if (!validMethods.includes(paymentMethod)) {
      return res.status(400).json({ error: 'Invalid payment method' });
    }

    // Use transaction to validate stock, create order, and deduct stock
    const order = await prisma.$transaction(async (tx) => {
      let totalPrice = 0;
      const orderItems: { variantId: number; quantity: number; unitPrice: number }[] = [];

      for (const item of items) {
        const variant = await tx.variant.findUnique({
          where: { id: item.variantId },
          include: { product: true },
        });

        if (!variant) {
          throw new Error(`Variant ${item.variantId} not found`);
        }

        if (variant.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${variant.product.name} - ${variant.name}. Available: ${variant.stock}`);
        }

        const unitPrice = variant.product.basePrice + variant.priceAdjustment;
        totalPrice += unitPrice * item.quantity;
        orderItems.push({ variantId: variant.id, quantity: item.quantity, unitPrice });
      }

      // Create order
      const newOrder = await tx.order.create({
        data: {
          userId: req.user!.userId,
          totalPrice,
          paymentMethod,
          items: {
            create: orderItems,
          },
        },
        include: { items: { include: { variant: { include: { product: true } } } } },
      });

      // Deduct stock AFTER successful order creation
      for (const item of items) {
        await tx.variant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    res.status(201).json({ order });
  } catch (err: any) {
    console.error('Order error:', err);
    if (err.message.includes('not found') || err.message.includes('Insufficient stock')) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/orders/my — Get current user's orders
router.get('/my', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.userId },
      include: { items: { include: { variant: { include: { product: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ orders });
  } catch (err) {
    console.error('My orders error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
