import prisma from './prisma/client';
import bcrypt from 'bcrypt';

async function seed() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@nanocore.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@nanocore.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create products with variants
  const cctv = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'NANO-A39L Smart WiFi CCTV',
      description: 'View Anytime via Mobile App. WiFi Ready - Easy Setup. FREE 128GB Storage, FREE UPS (Works during Brownout), FREE Installation.',
      basePrice: 5999,
      imageUrl: '/assets/cctv.png',
    },
  });

  const biometric = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'NanoCore Attendance Biometric System',
      description: 'USB Data Export to Excel. Fingerprint Recognition (1,200 users). 120,000 log storage. Fast dual-core processor. FREE Installation.',
      basePrice: 4999,
      imageUrl: '/assets/biometric.png',
    },
  });

  // Variants for CCTV
  await prisma.variant.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, productId: cctv.id, name: '2-Camera Package', priceAdjustment: 0, stock: 50 },
  });
  await prisma.variant.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, productId: cctv.id, name: '4-Camera Package', priceAdjustment: 3000, stock: 30 },
  });
  await prisma.variant.upsert({
    where: { id: 3 },
    update: {},
    create: { id: 3, productId: cctv.id, name: '8-Camera Package', priceAdjustment: 7000, stock: 15 },
  });

  // Variants for Biometric
  await prisma.variant.upsert({
    where: { id: 4 },
    update: {},
    create: { id: 4, productId: biometric.id, name: 'Standard', priceAdjustment: 0, stock: 40 },
  });
  await prisma.variant.upsert({
    where: { id: 5 },
    update: {},
    create: { id: 5, productId: biometric.id, name: 'Pro (Face Recognition)', priceAdjustment: 2000, stock: 20 },
  });

  console.log('Seeding complete!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
