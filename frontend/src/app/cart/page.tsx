'use client';

import { useCartStore } from '@/store/cartStore';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg mb-6">Your cart is empty</p>
              <Link href="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{item.productName}</h3>
                      <p className="text-slate-400 text-sm">{item.variantName}</p>
                      <p className="text-blue-400 font-bold mt-1">₱{item.unitPrice.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="p-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="p-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-slate-600 transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-white font-bold">
                        ₱{(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-300 text-lg">Total</span>
                  <span className="text-white text-2xl font-bold">₱{totalPrice().toLocaleString()}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/checkout" className="flex-1">
                    <Button className="w-full h-12 text-base">Proceed to Checkout</Button>
                  </Link>
                  <Button variant="outline" onClick={clearCart} className="h-12">
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
