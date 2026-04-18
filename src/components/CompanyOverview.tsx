import { 
  Fingerprint, 
  Video, 
  Server, 
  Briefcase, 
  Code, 
  Wrench,
  CheckCircle2
} from "lucide-react";

export function CompanyOverview() {
  const services = [
    { name: "Biometric Attendance Systems", icon: Fingerprint },
    { name: "CCTV Surveillance Solutions", icon: Video },
    { name: "IT Hardware & Network Setup", icon: Server },
    { name: "Business Automation Solutions", icon: Briefcase },
    { name: "Customized Software Development", icon: Code },
    { name: "Installation & Technical Support", icon: Wrench },
  ];

  const whyUs = [
    "Fast Setup",
    "Dedicated Support",
    "Affordable",
    "Customized for your workflow",
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Left Column: Mission & Vision */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Our Mission & Vision</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Providing affordable, high-quality IT solutions that simplify operations and help organizations embrace modern technology with confidence.
            </p>
            <p className="text-slate-500 leading-relaxed">
              We envision a future where businesses of all sizes have access to secure, reliable, and scalable technology infrastructure without the complexity or high costs typically associated with enterprise solutions.
            </p>
          </div>

          {/* Right Column: Services Grid */}
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">What We Offer</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-slate-700">{service.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Row: Why Us */}
        <div className="bg-slate-900 rounded-3xl p-10 lg:p-14 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-10 tracking-tight">Reliable. Modern. Scalable.</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {whyUs.map((point, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-blue-500" />
                <span className="text-white font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
