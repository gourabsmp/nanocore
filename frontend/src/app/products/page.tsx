'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { ProductSection } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ products: any[] }>('/api/products')
      .then((data) => {
        setProducts(Array.isArray(data.products) ? data.products : []);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1 pt-32">
        {loading ? (
          <div className="py-24 text-center text-slate-400">Loading products...</div>
        ) : (
          <ProductSection products={products} />
        )}
      </main>
      <Footer />
    </div>
  );
}
