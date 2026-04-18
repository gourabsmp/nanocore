import { Check, ShoppingCart, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/Button";

interface ProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  features: string[];
  imageUrl?: string;
}

export function ProductCard({ name, price, originalPrice, features, imageUrl }: ProductCardProps) {
  return (
    <div className="flex flex-col bg-slate-900/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 max-w-lg w-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] hover:border-blue-500/30">
      {/* Image Area */}
      <div className="w-full h-64 bg-slate-800/50 rounded-xl mb-6 flex items-center justify-center border border-slate-700/50 relative overflow-hidden group">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <ImageIcon className="w-10 h-10 text-slate-300 group-hover:scale-110 transition-transform duration-300" />
        )}
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{name}</h3>
        
        <div className="flex items-end gap-2 mb-6">
          <span className="text-3xl font-extrabold text-blue-600">{price}</span>
          {originalPrice && (
            <span className="text-lg text-slate-400 line-through mb-1">{originalPrice}</span>
          )}
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-0.5 bg-blue-500/20 p-0.5 rounded-full">
                <Check className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <span className="text-slate-300 text-sm leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button className="w-full mt-auto h-12 text-base font-semibold group">
        <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
        Add to Cart
      </Button>
    </div>
  );
}

export function ProductSection() {
  const products = [
    {
      name: "NANO-A39L Smart WiFi CCTV",
      price: "₱5,999",
      imageUrl: "assets/NANO-A39L%20Smart%20WiFi%20CCTV.png",
      features: [
        "View Anytime via Mobile App",
        "WiFi Ready - Easy Setup",
        "FREE 128GB Storage",
        "FREE UPS (Works Brownout)",
        "FREE Installation"
      ]
    },
    {
      name: "NanoCore Attendance Biometric System",
      price: "₱4,999",
      originalPrice: "₱6,000",
      imageUrl: "assets/NanoCore%20Attendance%20Biometric%20System.png",
      features: [
        "USB Data Export to Excel",
        "Fingerprint Recognition (1,200 users)",
        "120,000 log storage",
        "Fast dual-core processor",
        "FREE Installation"
      ]
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Featured Packages</h2>
          <p className="text-lg text-blue-600 font-medium">Limited offer – install now, pay once!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, i) => (
            <ProductCard key={i} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
