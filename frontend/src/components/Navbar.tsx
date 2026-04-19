'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Logo */}
      <Link
        href="/"
        className="fixed top-8 left-6 md:left-12 z-50 group cursor-pointer transition-all duration-300 hover:scale-105"
      >
        <Image 
          src="/assets/logo.jpg" 
          alt="NanoCore Logo" 
          width={150} 
          height={40} 
          priority
          className="object-contain h-10 w-auto brightness-200" 
        />
      </Link>

      {/* Floating Glass Nav */}
      <header className="fixed top-8 right-6 md:right-12 z-50 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-2xl flex items-center gap-6 transition-all duration-300 shadow-2xl">
        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-all"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-all"
          >
            Products
          </Link>
          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-blue-300 transition-all"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="hidden md:block w-px h-4 bg-white/10" />

        {/* Cart */}
        <Link
          href="/cart"
          className="relative inline-flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all group"
        >
          <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] flex items-center justify-center bg-blue-600 rounded-full text-[9px] font-black text-white border-2 border-[#020617]">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Auth */}
        {user ? (
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/account"
              className="text-slate-300 text-[10px] font-black uppercase tracking-widest hover:text-white flex items-center gap-2"
            >
              <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <User className="w-3 h-3" />
              </div>
              {user.name.split(' ')[0]}
            </Link>
            <button
              onClick={() => {
                console.log("Terminal session terminated.");
                logout();
                window.location.href = "/login";
              }}
              className="p-2 text-slate-500 hover:text-red-400 transition-colors cursor-pointer active:scale-95"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl px-6 py-2.5 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          >
            Access Terminal
          </Link>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#020617]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden">
          <Link href="/" className="text-2xl text-white font-black uppercase tracking-widest" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="/products" className="text-2xl text-white font-black uppercase tracking-widest" onClick={() => setMobileOpen(false)}>
            Products
          </Link>
          <Link href="/cart" className="text-2xl text-white font-black uppercase tracking-widest" onClick={() => setMobileOpen(false)}>
            Cart
          </Link>
          {user ? (
            <>
              <span className="text-slate-500 font-bold uppercase tracking-[0.3em]">{user.name}</span>
              <button 
                onClick={() => { 
                  console.log("Mobile session terminated.");
                  logout(); 
                  window.location.href = "/login";
                  setMobileOpen(false); 
                }} 
                className="text-red-500 text-lg font-black uppercase tracking-[0.2em] cursor-pointer active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-2xl text-blue-500 font-black uppercase tracking-widest" onClick={() => setMobileOpen(false)}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </>
  );
}
