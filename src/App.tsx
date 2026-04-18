import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductSection } from "./components/ProductCard";
import { CompanyOverview } from "./components/CompanyOverview";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950 selection:bg-blue-200">
      <Navbar />
      <main className="flex-1 pt-32">
        <Hero />
        <ProductSection />
        <CompanyOverview />
      </main>
      <Footer />
    </div>
  );
}

export default App;
