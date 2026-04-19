import { Router, Request, Response } from 'express';
import prisma from '../prisma/client';

const router = Router();

// GET /api/products
router.get('/', async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { variants: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ products });
  } catch (err) {
    console.error('Products error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { variants: true },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (err) {
    console.error('Product error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:id/variants
router.get('/:id/variants', async (req: Request, res: Response) => {
  try {
    const variants = await prisma.variant.findMany({
      where: { productId: parseInt(req.params.id) },
    });
    res.json({ variants });
  } catch (err) {
    console.error('Variants error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
