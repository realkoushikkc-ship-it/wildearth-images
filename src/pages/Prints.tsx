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

  // Calculate prices based on size
  const sizePricing: Record<string, number> = {
    "12×8 inch": print.basePrice,
    "20×13 inch": Math.round(print.basePrice * 1.8),
    "30×20 inch": Math.round(print.basePrice * 2.8),
    "40×27 inch": Math.round(print.basePrice * 4.2),
  };

  const toggleSize = (size: string) => {
    const price = sizePricing[size];
    setSelectedSizes((prev) => {
      const exists = prev.find((s) => s.size === size);
      if (exists) {
        return prev.filter((s) => s.size !== size);
      }
      return [...prev, { size, price }];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the email body
    const sizesText = selectedSizes.map((s) => `• ${s.size} - £${s.price}`).join("\n");
    const subject = `Customer Request: ${print.title}`;
    const body = `Hello Mr. Koushik,

I am interested in purchasing the following fine art print:

ARTWORK DETAILS:
Title: ${print.title}
Category: ${print.category}
Location: ${print.location}
Edition: ${print.edition}

SELECTED SIZES:
${sizesText}

TOTAL ESTIMATED PRICE: £${totalPrice}

CUSTOMER EMAIL: ${email}

Please contact me to proceed with the order.

Thank you.`;

    // Create the native mailto link (Zero backend, Zero 3rd party)
    const mailtoLink = `mailto:realkoushikkc@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    
    // Open the user's email client
    window.location.href = mailtoLink;
    
    // Show the success message immediately
    setSubmitted(true);
  };

  const totalPrice = selectedSizes.reduce((sum, s) => sum + s.price, 0);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-0 lg:p-8 backdrop-blur-sm" 
      onClick={onClose} // Click outside the modal to close
    >
      {/* Close Button (X) */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 lg:top-8 lg:right-8 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 group"
        aria-label="Close modal"
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {!submitted ? (
        <div 
          className="w-full max-w-7xl h-full lg:h-auto bg-white grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-2xl relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          {/* LEFT SIDE: Framed Artwork Display */}
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-8 lg:p-16 min-h-[50vh] lg:min-h-[700px]">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

            <div className="relative z-10">
              {/* The Frame & Mat Board */}
              <div 
                className="relative bg-stone-100 p-2 lg:p-3" 
                style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.1) inset" }}
              >
                {/* White Mat Board */}
                <div className="bg-white p-8 lg:p-12">
                  <img 
                    src={print.image} 
                    alt={print.title} 
                    className="w-full h-auto max-w-lg max-h-[50vh] lg:max-h-[450px] object-contain" 
                  />
                </div>
              </div>
              
              {/* Edition Label */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 text-xs tracking-[0.3em] uppercase text-gray-900 font-medium shadow-lg whitespace-nowrap">
                {print.edition}
              </div>

              {/* Realistic Hanging Shadow */}
              <div 
                className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-48 h-20 opacity-40" 
                style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 70%)", filter: "blur(10px)" }} 
              />
            </div>

            {/* Image Info Overlay */}
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-2">{print.category}</p>
              <h3 className="text-2xl font-light" style={{ fontFamily: "Playfair Display, serif" }}>{print.title}</h3>
              <p className="text-white/60 text-sm mt-1">{print.location}</p>
            </div>
          </div>

          {/* RIGHT SIDE: Selection Panel */}
          <div className="bg-white p-8 lg:p-12 overflow-y-auto max-h-screen lg:max-h-[90vh]">
            <div className="mb-8">
              <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-3 font-semibold">{print.category}</p>
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
                {print.title}
              </h2>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-px bg-amber-500" />
                <p className="text-gray-400 text-xs tracking-[0.2em] uppercase">{print.edition}</p>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-xs tracking-[0.3em] uppercase text-gray-900 font-bold mb-4">Select Sizes</h3>
              <div className="space-y-3">
                {print.sizes.map((size) => {
                  const price = sizePricing[size];
                  const isSelected = selectedSizes.find((s) => s.size === size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-full flex items-center justify-between p-4 border-2 transition-all duration-300 group ${
                        isSelected ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 hover:border-gray-400 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${
                          isSelected ? "border-white bg-white" : "border-gray-300 group-hover:border-gray-500"
                        }`}>
                          {isSelected && <Check size={12} className="text-gray-900" />}
                        </div>
                        <span className="text-sm tracking-wide font-medium">{size}</span>
                      </div>
                      <span className="text-base font-light">£{price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Price */}
            {selectedSizes.length > 0 && (
              <div className="mb-8 p-5 bg-gray-50 border border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Total ({selectedSizes.length})</span>
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
                disabled={selectedSizes.length === 0}
                className="w-full bg-gray-900 text-white py-4 text-xs tracking-[0.3em] uppercase hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 font-medium"
              >
                Submit Enquiry <ArrowRight size={16} />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
                <Shield size={14} />
                <span>Opens your email client securely</span>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* SUCCESS MESSAGE */
        <div className="w-full max-w-2xl bg-white p-12 lg:p-16 text-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 mx-auto">
            <Check size={48} className="text-green-600" />
          </div>
          <h3 className="text-4xl font-light text-gray-900 mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
            Thank You
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
            Thank you so much for purchasing. Mr. Koushik will soon personally be in touch with you.
          </p>
          <div className="w-16 h-px bg-amber-500 mb-8 mx-auto" />
          <p className="text-sm text-gray-400 mb-2">Your email client has been prepared with the details.</p>
          <p className="text-gray-900 font-medium mb-8">{email}</p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 transition-colors border border-gray-300 px-8 py-4"
          >
            Continue Browsing
          </button>
        </div>
      )}
    </div>
  );
}

export default function Prints() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPrint, setSelectedPrint] = useState<typeof printsData[0] | null>(null);

  const filtered = activeCategory === "All" ? printsData : printsData.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      <Navbar isLight={false} forceTransparent={false} />

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/32420357/pexels-photo-32420357.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
          alt="Fine Art Gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-4 font-light">
            Limited Edition Wildlife Photography
          </p>
          <h1 className="text-5xl lg:text-7xl text-white font-light mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
            Fine Art Prints
          </h1>
          <div className="w-16 h-px bg-amber-400 mb-6" />
          <p className="text-white/70 text-sm max-w-lg leading-relaxed">
            Museum-quality prints. Hand-signed and numbered.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="py-8 px-6 bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "border-gray-300 text-gray-500 hover:border-gray-900 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-16 px-6 lg:px-10 bg-white">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((print) => (
            <div
              key={print.id}
              className="group cursor-pointer"
              onClick={() => setSelectedPrint(print)}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-5 bg-gray-100">
                <img
                  src={print.image}
                  alt={print.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <span className="border border-white text-white text-xs tracking-[0.3em] uppercase px-8 py-3 flex items-center gap-2">
                      View Print <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
                  {print.edition}
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-amber-500 text-[10px] tracking-[0.3em] uppercase mb-1">{print.category}</p>
                  <h3 className="text-gray-900 text-xl font-medium" style={{ fontFamily: "Playfair Display, serif" }}>
                    {print.title}
                  </h3>
                  <p className="text-gray-400 text-xs tracking-wide mt-1">{print.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1">From</p>
                  <p className="text-gray-900 text-lg font-medium">£{print.basePrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {selectedPrint && <ArtworkModal print={selectedPrint} onClose={() => setSelectedPrint(null)} />}
    </div>
  );
}
