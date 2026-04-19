import {
  Fingerprint,
  Video,
  Server,
  Briefcase,
  Code,
  Wrench,
  CheckCircle2,
} from 'lucide-react';

export function CompanyOverview() {
  const services = [
    { name: 'Biometric Attendance Systems', icon: Fingerprint },
    { name: 'CCTV Surveillance Solutions', icon: Video },
    { name: 'IT Hardware & Network Setup', icon: Server },
    { name: 'Business Automation Solutions', icon: Briefcase },
    { name: 'Customized Software Development', icon: Code },
    { name: 'Installation & Technical Support', icon: Wrench },
  ];

  const whyUs = ['Fast Setup', 'Dedicated Support', 'Affordable', 'Customized for your workflow'];

  return (
    <section className="py-24 px-6 bg-[#020617] border-y border-white/5 relative overflow-hidden">
      {/* Depth: Radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Our Mission & Vision</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              Providing affordable, high-quality IT solutions that simplify operations and help organizations embrace modern technology with confidence.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium text-sm">
              We envision a future where businesses of all sizes have access to secure, reliable, and scalable technology infrastructure without the complexity or high costs typically associated with enterprise solutions.
            </p>
          </div>

          <div className="lg:col-span-7">
            <h3 className="text-2xl font-bold text-white mb-8 tracking-tight uppercase">What We Offer</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div key={idx} className="flex items-center gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group cursor-default">
                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="font-bold text-[11px] text-slate-300 uppercase tracking-widest">{service.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-10 lg:p-14 text-center border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-10 tracking-tight relative z-10">Reliable. Modern. Scalable.</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto relative z-10">
            {whyUs.map((point, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 group/item">
                <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover/item:scale-110 group-hover/item:text-white transition-all duration-500">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
