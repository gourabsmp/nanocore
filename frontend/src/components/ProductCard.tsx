'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Check, ShoppingCart, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

interface Variant {
  id: number;
  name: string;
  priceAdjustment: number;
  stock: number;
}

interface Product {
  id: number;
  name: string;
  description: string | null;
  basePrice: number;
  imageUrl: string | null;
  variants: Variant[];
}

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const user = useAuthStore((s) => s.user);
  const [added, setAdded] = useState(false);
  
  const firstVariant = product.variants[0];
  const inStock = firstVariant && firstVariant.stock > 0;

  const handleAction = () => {
    if (!user) {
      router.push('/login?redirect=/products');
      return;
    }

    if (added) {
      router.push('/cart');
      return;
    }

    if (!firstVariant || !inStock) return;
    
    addItem({
      variantId: firstVariant.id,
      productName: product.name,
      variantName: firstVariant.name,
      unitPrice: product.basePrice + firstVariant.priceAdjustment,
      stock: firstVariant.stock,
    });
    setAdded(true);
  };

  const features = product.description?.split('. ').filter(Boolean) || [];

  // Local Image Mapping
  const getProductImage = (name: string) => {
    if (name.includes('CCTV')) return '/assets/NANO-A39L Smart WiFi CCTV.png';
    if (name.includes('Attendance') || name.includes('Biometric')) return '/assets/NanoCore Attendance Biometric System.png';
    return product.imageUrl || '';
  };

  return (
    <div className="flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 max-w-lg w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500/30 group">
      <div className="w-full h-48 bg-white/5 rounded-lg mb-6 flex items-center justify-center border border-white/5 relative overflow-hidden">
        {product.name ? (
          <Image 
            src={getProductImage(product.name)} 
            alt={product.name} 
            width={400}
            height={200}
            className="object-cover w-full h-48 rounded-lg object-center group-hover:scale-110 transition-transform duration-700" 
          />
        ) : (
          <ImageIcon className="w-10 h-10 text-slate-500 group-hover:scale-110 transition-transform duration-300" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{product.name}</h3>

        <div className="flex items-end gap-2 mb-4">
          <span className="text-3xl font-extrabold text-blue-500">₱{product.basePrice.toLocaleString()}</span>
        </div>

        {/* Variants */}
        {product.variants.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <span
                key={v.id}
                className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  v.stock > 0
                    ? 'border-blue-500/20 text-blue-400 bg-blue-500/5'
                    : 'border-red-500/20 text-red-400 bg-red-500/5'
                }`}
              >
                {v.name} {v.stock === 0 ? '— SOLD OUT' : `— ₱${(product.basePrice + v.priceAdjustment).toLocaleString()}`}
              </span>
            ))}
          </div>
        )}

        {features.length > 0 && (
          <ul className="space-y-3 mb-8">
            {features.slice(0, 5).map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 bg-blue-500/20 p-0.5 rounded-full">
                  <Check className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-slate-400 text-xs leading-relaxed font-medium uppercase tracking-wide">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button
        className={`w-full mt-auto h-12 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 transform active:scale-95 ${
          !inStock && !added
            ? 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed'
            : added
            ? 'bg-white text-black hover:bg-blue-500 hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
        }`}
        onClick={handleAction}
        disabled={!inStock && !added}
      >
        {added ? (
          <>
            <ArrowRight className="w-3.5 h-3.5 mr-2 animate-bounce-x" />
            Go to Cart
          </>
        ) : inStock ? (
          <>
            <ShoppingCart className="w-3.5 h-3.5 mr-2" />
            Add to Deployment
          </>
        ) : (
          'Out of Stock'
        )}
      </Button>
    </div>
  );
}

export function ProductSection({ products }: { products: Product[] }) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <section className="py-24 px-6 bg-[#020617] relative overflow-hidden">
      {/* Depth: Radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">FEATURED PACKAGES</h2>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Limited offer – install now, pay once!</p>
        </div>

        {safeProducts.length === 0 ? (
          <p className="text-center text-slate-500 font-bold uppercase tracking-widest py-20">No assets available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {safeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
