'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Order Placed!</h1>
          <p className="text-slate-400 mb-8">
            Thank you for your order. We will contact you shortly to confirm your installation schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Go Home</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
