import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { printsData } from "../data/images";
import { X, Check, Mail, ArrowRight, Shield } from "lucide-react";

const categories = ["All", "Big Cats", "Elephants", "Birds", "Marine"];

interface SelectedSize {
  size: string;
  price: number;
}

function ArtworkModal({ print, onClose }: { print: typeof printsData[0]; onClose: () => void }) {
  const [selectedSizes, setSelectedSizes] = useState<SelectedSize[]>([]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate prices based on size
  const sizePricing: Record<string, number> = {
    "12×8 inch": print.basePrice,
    "20×13 inch": Math.round(print.basePrice * 1.8),
    "30×20 inch": Math.round(print.basePrice * 2.8),
    "40×27 inch": Math.round(print.basePrice * 4.2),
  };

  const toggleSize = (size: string) => {
    const price = sizePricing[size];
    setSelectedSizes(prev => {
      const exists = prev.find(s => s.size === size);
      if (exists) {
        return prev.filter(s => s.size !== size);
      }
      return [...prev, { size, price }];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In real implementation, you would send to your backend
    // fetch('/api/enquiry', { method: 'POST', body: JSON.stringify({ email, print, selectedSizes }) })
    
    setSubmitted(true);
    setIsLoading(false);
  };

  const totalPrice = selectedSizes.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={print.image} 
          alt="" 
          className="w-full h-full object-cover opacity-30 blur-xl scale-110"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-4 lg:mx-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-h-[90vh] overflow-y-auto py-8">
        
        {/* Left: Framed Artwork Preview */}
        <div className="flex items-center justify-center">
          <div className="relative">
            {/* Frame Container */}
            <div 
              className="relative bg-white p-6 lg:p-10 shadow-2xl"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset"
              }}
            >
              {/* Mat Board */}
              <div className="bg-white p-4 lg:p-6">
                <img 
                  src={print.image} 
                  alt={print.title}
                  className="w-full h-auto max-w-md lg:max-w-lg object-contain"
                  style={{ maxHeight: "60vh" }}
                />
              </div>
              
              {/* Frame Label */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 text-xs tracking-[0.3em] uppercase text-gray-900 font-medium shadow-lg">
                {print.edition}
              </div>
            </div>
            
            {/* Hanging Wire Effect */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-16 overflow-hidden opacity-30">
              <svg viewBox="0 0 100 60" className="w-full h-full">
                <path d="M 10 50 Q 50 10 90 50" stroke="white" strokeWidth="1" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Selection Panel */}
        <div className="bg-white/95 backdrop-blur-xl rounded-sm p-8 lg:p-12 flex flex-col">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-10">
                <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-3 font-semibold">
                  {print.category}
                </p>
                <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
                  {print.title}
                </h2>
                <p className="text-gray-500 text-sm tracking-wide mb-2">{print.location}</p>
                <div className="w-16 h-px bg-amber-500 mt-6" />
              </div>

              {/* Size Selection */}
              <div className="mb-10">
                <h3 className="text-xs tracking-[0.3em] uppercase text-gray-900 font-bold mb-6">
                  Select Sizes
                </h3>
                <div className="space-y-3">
                  {print.sizes.map((size) => {
                    const price = sizePricing[size];
                    const isSelected = selectedSizes.find(s => s.size === size);
                    
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`w-full flex items-center justify-between p-5 border-2 transition-all duration-300 group ${
                          isSelected 
                            ? "border-gray-900 bg-gray-900 text-white" 
                            : "border-gray-200 hover:border-gray-400 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 border-2 flex items-center justify-center transition-all ${
                            isSelected ? "border-white bg-white" : "border-gray-300 group-hover:border-gray-500"
                          }`}>
                            {isSelected && <Check size={14} className="text-gray-900" />}
                          </div>
                          <span className="text-sm tracking-wide font-medium">{size}</span>
                        </div>
                        <span className="text-lg font-light">£{price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Total */}
              {selectedSizes.length > 0 && (
                <div className="mb-8 p-6 bg-gray-50 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Selected ({selectedSizes.length})</span>
                    <span className="text-2xl font-light text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
                      £{totalPrice}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Including VAT & Certificate of Authenticity</p>
                </div>
              )}

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="mt-auto">
                <div className="mb-6">
                  <label className="block text-xs tracking-[0.2em] uppercase text-gray-900 font-bold mb-3">
                    Your Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={selectedSizes.length === 0 || isLoading}
                  className="w-full bg-gray-900 text-white py-5 text-xs tracking-[0.3em] uppercase hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 font-medium"
                >
                  {isLoading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      Submit Enquiry <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
                  <Shield size={14} />
                  <span>Secure & Confidential</span>
                </div>
              </form>
            </>
          ) : (
            /* Success Message */
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8">
                <Check size={40} className="text-green-600" />
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
                Thank You
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md">
                Thank you so much for purchasing. Mr. Koushik will soon personally be in touch with you.
              </p>
              <div className="w-16 h-px bg-amber-500 mb-8" />
              <p className="text-sm text-gray-400">
                A confirmation has been sent to<br />
                <span className="text-gray-900 font-medium">{email}</span>
              </p>
              <button
                onClick={onClose}
                className="mt-10 text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Prints() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPrint, setSelectedPrint] = useState<typeof printsData[0] | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered = activeCategory === "All"
    ? printsData
    : printsData.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      <Navbar isLight={true} forceTransparent={true} />

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <img
          src="https://images.pexels.com/photos/32420357/pexels-photo-32420357.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920"
          alt="Fine Art Gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-amber-400 text-xs tracking-[0.6em] uppercase mb-6 font-light animate-fade-in">
            Limited Edition Wildlife Photography
          </p>
          <h1 className="text-6xl lg:text-8xl text-white font-light mb-8 tracking-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            The Collection
          </h1>
          <div className="w-24 h-px bg-amber-400/60 mb-8" />
          <p className="text-white/70 text-sm lg:text-base max-w-lg leading-relaxed font-light">
            Museum-quality fine art prints. Hand-signed and numbered.<br />
            Each piece tells a story of the wild.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>

      {/* Category Filter - Sticky */}
      <div className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-white py-8"}`}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 text-xs tracking-[0.25em] uppercase transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "bg-transparent border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid - Masonry Style */}
      <div className="py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filtered.map((print, index) => (
              <div
                key={print.id}
                className="break-inside-avoid group cursor-pointer relative"
                onClick={() => setSelectedPrint(print)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={print.image}
                    alt={print.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-gray-900 transition-all duration-300">
                        View Details <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>

                  {/* Edition Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-900 text-[10px] tracking-[0.2em] uppercase px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {print.edition}
                  </div>
                </div>

                {/* Info */}
                <div className="mt-5 text-center">
                  <p className="text-amber-600 text-[10px] tracking-[0.3em] uppercase mb-2">{print.category}</p>
                  <h3 className="text-gray-900 text-xl font-medium mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
                    {print.title}
                  </h3>
                  <p className="text-gray-400 text-xs tracking-wide">{print.location}</p>
                  <p className="text-gray-900 text-sm mt-3 font-medium">From £{print.basePrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-600 text-xs tracking-[0.4em] uppercase mb-4">The Process</p>
            <h2 className="text-4xl font-light text-gray-900 mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              How It Works
            </h2>
            <div className="w-16 h-px bg-amber-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Select Your Artwork",
                desc: "Browse our collection and choose the pieces that speak to you. Select your preferred sizes."
              },
              {
                step: "02",
                title: "Personal Consultation",
                desc: "Mr. Koushik will personally reach out to discuss your selection and answer any questions."
              },
              {
                step: "03",
                title: "Delivery & Authentication",
                desc: "Receive your hand-signed, numbered print with certificate of authenticity. Worldwide shipping."
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <p className="text-5xl font-light text-amber-500/30 mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
                  {item.step}
                </p>
                <h3 className="text-lg font-medium text-gray-900 mb-3 tracking-wide">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-6 bg-gray-900 text-white text-center">
        <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-6 font-light">Bespoke Commissions</p>
        <h2 className="text-4xl lg:text-5xl font-light mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
          Looking for Something Specific?
        </h2>
        <p className="text-white/50 text-sm leading-relaxed max-w-xl mx-auto mb-12">
          I offer bespoke print commissions, custom sizes for commercial spaces, and exclusive licensing. 
          Let's create something extraordinary together.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-3 border border-amber-400 text-amber-400 px-12 py-5 text-xs tracking-[0.3em] uppercase hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
        >
          Get in Touch
        </a>
      </section>

      {/* Modal */}
      {selectedPrint && (
        <ArtworkModal print={selectedPrint} onClose={() => setSelectedPrint(null)} />
      )}

      <Footer />
    </div>
  );
}
