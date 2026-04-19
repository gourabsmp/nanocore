import { Shield, ArrowRight, Building, Server, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <>
      <section className="relative overflow-hidden py-24 px-6 bg-[#020617]">
        {/* Hero Background Image with Priority */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero_bg.png"
            alt="NanoCore Hero"
            fill
            priority
            className="object-cover object-center opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>
        {/* Depth: Radial gradient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none z-0" />
        
        <div className="container mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm font-medium text-blue-400 mb-8 animate-fade-in-up">
            <Shield className="w-4 h-4" />
            <span className="tracking-wide uppercase text-[10px] font-bold">Trusted IT Solutions Philippines</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mb-6">
            Protect Your Home & Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Today.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            Upgrade your security with our Smart WiFi CCTV and Biometric Attendance Systems. Complete packages, zero hidden costs, <span className="text-white font-medium">FREE installation.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/products" className="w-full sm:w-auto">
              <Button className="w-full h-14 px-10 text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
                Shop Packages
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/products" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full h-14 px-10 text-sm font-bold uppercase tracking-widest border-white/10 hover:bg-white/5 hover:scale-105 transition-all duration-300">
                View Biometrics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust band – Premium Glass */}
      <div className="w-full border-y border-white/5 bg-white/2 backdrop-blur-md py-8 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="uppercase tracking-[0.3em] text-[10px] font-black text-slate-500 mb-6">
            Trusted for Modern Business Security
          </p>
          <div className="flex flex-row justify-center items-center gap-8 md:gap-16 flex-wrap opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-3 text-slate-400 font-bold tracking-tighter"><Shield className="w-5 h-5"/><span>SECURECORP</span></div>
            <div className="flex items-center gap-3 text-slate-400 font-bold tracking-tighter"><Building className="w-5 h-5"/><span>TECHSPACE</span></div>
            <div className="flex items-center gap-3 text-slate-400 font-bold tracking-tighter"><Server className="w-5 h-5"/><span>DATAVAULT</span></div>
            <div className="flex items-center gap-3 text-slate-400 font-bold tracking-tighter"><Lock className="w-5 h-5"/><span>SAFEGUARD</span></div>
          </div>
        </div>
      </div>
    </>
  );
}
