import { Shield, ArrowRight, Building, Server, Lock } from "lucide-react";
import { Button } from "./ui/Button";

export function Hero() {
  return (
    <>
      <section className="relative bg-slate-900 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,#1e3a8a4d,transparent)] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-sm font-medium text-slate-300 mb-8 backdrop-blur-sm animate-fade-in-up">
          <Shield className="w-4 h-4 text-blue-400" />
          <span>Trusted IT Solutions in the Philippines</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mb-6">
          Protect Your Home & Business <span className="text-blue-500">Today.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Upgrade your security with our Smart WiFi CCTV and Biometric Attendance Systems. 
          Complete packages, zero hidden costs, <span className="text-white font-medium">FREE installation.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button variant="primary" size="lg" className="w-full sm:w-auto text-base h-12 px-8 group">
            Shop Packages
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="glass" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
            View Biometrics
          </Button>
        </div>
      </div>
      </section>

      {/* Trust Band */}
      <div className="w-full border-t border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm py-4 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="uppercase tracking-widest text-xs font-semibold text-slate-500 mb-2">
            Trusted for Modern Business Security
          </p>
          <div className="flex flex-row justify-center items-center gap-8 md:gap-16 mt-4 flex-wrap">
            <div className="flex items-center gap-2 text-slate-600"><Shield className="w-5 h-5" /><span className="font-medium text-sm">SecureCorp</span></div>
            <div className="flex items-center gap-2 text-slate-600"><Building className="w-5 h-5" /><span className="font-medium text-sm">TechSpace</span></div>
            <div className="flex items-center gap-2 text-slate-600"><Server className="w-5 h-5" /><span className="font-medium text-sm">DataVault</span></div>
            <div className="flex items-center gap-2 text-slate-600"><Lock className="w-5 h-5" /><span className="font-medium text-sm">SafeGuard</span></div>
          </div>
        </div>
      </div>
    </>
  );
}
