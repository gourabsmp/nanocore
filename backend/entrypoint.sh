#!/bin/sh
set -e

echo "Running Prisma db push..."
npx prisma db push

echo "Running seed..."
npx ts-node src/seed.ts

echo "Starting server..."
exec npm run start
