import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/Button";

export function Navbar() {
  return (
    <>
      {/* Logo Area (Fixed Top Left) */}
      <a href="#" className="fixed top-6 left-6 md:left-12 z-50 group cursor-pointer transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
        <img 
          src="/assets/logo.jpg" 
          alt="NanoCore Logo" 
          className="h-20 w-auto object-contain" 
        />
      </a>

      {/* Command Island (Top Right) */}
      <header className="fixed top-6 right-6 md:right-12 z-50 bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full px-5 sm:px-6 py-2.5 flex items-center gap-4 sm:gap-6 transition-all duration-300">
        
        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-2">
          <a href="#" className="text-slate-300 text-sm font-semibold transition-all duration-300 relative px-3 py-1.5 rounded-md hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Services
          </a>
          <a href="#" className="text-slate-300 text-sm font-semibold transition-all duration-300 relative px-3 py-1.5 rounded-md hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            About Us
          </a>
        </nav>

        {/* Subtle Divider */}
        <div className="hidden md:block w-px h-6 bg-white/10"></div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          
          {/* Cart Icon */}
          <div className="relative inline-flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] text-slate-300 hover:text-blue-400 cursor-pointer group">
            <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-[1.5px] border-slate-950 animate-pulse"></span>
          </div>
          
          {/* Mobile Menu Icon */}
          <button className="md:hidden p-2 text-slate-300 hover:text-white transition-colors">
            <Menu className="w-6 h-6" />
          </button>

          {/* Solid Contact Button */}
          <button className="hidden sm:inline-flex items-center justify-center bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] text-white font-bold rounded-full px-5 py-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]">
            Contact Us
          </button>
        </div>

      </header>
    </>
  );
}
