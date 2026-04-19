'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductSection } from '@/components/ProductCard';
import { CompanyOverview } from '@/components/CompanyOverview';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function HomePage() {
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
    <div className="min-h-screen flex flex-col font-sans bg-[#020617] selection:bg-blue-500/30">
      <Navbar />
      <main className="flex-1">
        <Hero />
        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Initializing Assets...</p>
          </div>
        ) : (
          <ProductSection products={products} />
        )}
        <CompanyOverview />
      </main>
      <Footer />
    </div>
  );
}
