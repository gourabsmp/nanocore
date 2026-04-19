import { Router, Response } from 'express';
import prisma from '../prisma/client';
import { authMiddleware, adminMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// All admin routes require auth + admin role
router.use(authMiddleware);
router.use(adminMiddleware);

// GET /api/admin/orders — Get all orders
router.get('/orders', async (_req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: { include: { variant: { include: { product: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ orders });
  } catch (err) {
    console.error('Admin orders error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/admin/orders/:id/status — Update order status
router.put('/orders/:id/status', async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const validStatuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    const order = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: { status },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: { include: { variant: { include: { product: true } } } },
      },
    });

    res.json({ order });
  } catch (err) {
    console.error('Update order status error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
