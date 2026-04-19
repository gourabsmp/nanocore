'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { apiFetch } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const PAYMENT_METHODS = [
  { id: 'COD', label: 'Cash on Delivery', icon: '💵' },
  { id: 'BANK_TRANSFER', label: 'Bank Transfer', icon: '🏦' },
  { id: 'CREDIT_CARD', label: 'Credit Card', icon: '💳' },
  { id: 'GCASH', label: 'GCash', icon: '📱' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const { items, totalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-32 pb-16">
          <div className="text-center">
            <p className="text-slate-400 text-lg mb-4">Please sign in to checkout</p>
            <Link href="/login"><Button>Sign In</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-32 pb-16">
          <div className="text-center">
            <p className="text-slate-400 text-lg mb-4">Your cart is empty</p>
            <Link href="/products"><Button>Browse Products</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);
    try {
      await apiFetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
          items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
          paymentMethod,
        }),
      });
      clearCart();
      router.push('/order-success');
    } catch (err: any) {
      setError(err.message || 'Order failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.variantId} className="flex justify-between text-sm">
                  <span className="text-slate-300">
                    {item.productName} ({item.variantName}) × {item.quantity}
                  </span>
                  <span className="text-white font-medium">
                    ₱{(item.unitPrice * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t border-slate-700 pt-3 flex justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-blue-400 font-bold text-lg">₱{totalPrice().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>
            <div className="grid grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                    paymentMethod === method.id
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-slate-700 bg-slate-800/30 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span className="text-xl block mb-1">{method.icon}</span>
                  <span className="text-sm font-medium">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button
            className="w-full h-12 text-base"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Placing Order...' : `Place Order — ₱${totalPrice().toLocaleString()}`}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
