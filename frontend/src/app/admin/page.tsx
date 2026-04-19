'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { apiFetch } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';

interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  variant: {
    name: string;
    product: { name: string };
  };
}

interface Order {
  id: number;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  user: { id: number; name: string; email: string };
  items: OrderItem[];
}

const STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  CONFIRMED: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  PROCESSING: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  SHIPPED: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  DELIVERED: 'bg-green-500/10 text-green-400 border-green-500/30',
  CANCELLED: 'bg-red-500/10 text-red-400 border-red-500/30',
};

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  // Wait for auth to load before checking role — prevents auth loop
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    if (user.role !== 'ADMIN') {
      router.replace('/');
      return;
    }

    // Fetch orders
    apiFetch<{ orders: Order[] }>('/api/admin/orders')
      .then((data) => setOrders(Array.isArray(data.orders) ? data.orders : []))
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, [isLoading, user, router]);

  const updateStatus = async (orderId: number, status: string) => {
    setUpdating(orderId);
    try {
      const data = await apiFetch<{ order: Order }>(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(null);
    }
  };

  // Loading state — prevents flash/redirect loop
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <span className="text-sm text-slate-400">
              {orders.length} order{orders.length !== 1 ? 's' : ''}
            </span>
          </div>

          {loadingOrders ? (
            <div className="text-center py-20 text-slate-400">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 text-slate-400">No orders yet.</div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-white font-semibold">
                        Order #{order.id}
                        <span className={`ml-3 text-xs px-2.5 py-1 rounded-full border ${STATUS_COLORS[order.status] || ''}`}>
                          {order.status}
                        </span>
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">
                        {order.user.name} ({order.user.email}) — {order.paymentMethod.replace('_', ' ')}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="text-blue-400 font-bold text-lg">
                      ₱{order.totalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="bg-slate-800/30 rounded-lg p-4 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm py-1">
                        <span className="text-slate-300">
                          {item.variant.product.name} ({item.variant.name}) × {item.quantity}
                        </span>
                        <span className="text-slate-400">₱{(item.unitPrice * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {/* Status update */}
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={order.status === s ? 'primary' : 'ghost'}
                        onClick={() => updateStatus(order.id, s)}
                        disabled={updating === order.id || order.status === s}
                        className="text-xs"
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
