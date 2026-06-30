import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { printsData } from "../data/images";
import { ArrowRight, X } from "lucide-react";

const categories = ["All", "Big Cats", "Elephants", "Birds", "Marine"];

function PrintModal({ print, onClose }: { print: typeof printsData[0]; onClose: () => void }) {
  const [selectedSize, setSelectedSize] = useState(print.sizes[1] || print.sizes[0]);

  const sizeMultipliers: Record<string, number> = {
    "12×8 inch": 1,
    "20×13 inch": 1.8,
    "30×20 inch": 2.8,
    "40×27 inch": 4.2,
  };
  const price = Math.round(print.basePrice * (sizeMultipliers[selectedSize] || 1));

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={print.image} alt={print.title} className="w-full h-80 md:h-full object-cover" />
        </div>
        <div className="p-8 lg:p-10 flex flex-col">
          <button onClick={onClose} className="self-end text-gray-400 hover:text-gray-900 mb-6">
            <X size={20} />
          </button>
          <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-2">{print.category}</p>
          <h2 className="text-3xl font-light text-gray-900 mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
            {print.title}
          </h2>
          <p className="text-gray-400 text-xs tracking-widest mb-6">{print.location}</p>
          <p className="text-gray-500 text-xs tracking-[0.2em] uppercase mb-1">{print.edition}</p>
          <div className="w-12 h-px bg-amber-500 mb-8" />

          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Select Size</p>
          <div className="grid grid-cols-2 gap-2 mb-8">
            {print.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border py-3 px-4 text-xs tracking-wide transition-all duration-200 ${
                  selectedSize === size
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-8">
            <span className="text-gray-400 text-xs uppercase tracking-widest">Price</span>
            <span className="text-3xl font-light text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
              £{price}
            </span>
          </div>

          <button className="w-full bg-gray-900 text-white py-4 text-xs tracking-[0.3em] uppercase hover:bg-amber-500 transition-all duration-300 mb-4">
            Enquire About This Print
          </button>
          <p className="text-center text-gray-400 text-xs leading-relaxed">
            All prints include certificate of authenticity · Worldwide shipping · 14-day returns
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Prints() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPrint, setSelectedPrint] = useState<typeof printsData[0] | null>(null);

  const filtered = activeCategory === "All"
    ? printsData
    : printsData.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white">
      <Navbar isLight={false} forceTransparent={false} />

      {/* Hero */}
      <div className="relative h-[55vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/32420357/pexels-photo-32420357.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
          alt="Fine Art Prints"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-4 font-light">Limited Edition</p>
          <h1 className="text-5xl lg:text-7xl text-white font-light" style={{ fontFamily: "Playfair Display, serif" }}>
            Fine Art Prints
          </h1>
          <div className="w-16 h-px bg-amber-400 mt-8" />
          <p className="text-white/50 text-sm mt-6 max-w-md">
            Hahnemühle archival prints. Signed & numbered. Delivered worldwide.
          </p>
        </div>
      </div>

      {/* Print process / quality info band */}
      <div className="bg-[#0f0f0f] py-10 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: "🖨️", title: "Giclée Printing", desc: "Fine art pigment inks on museum-grade paper" },
            { icon: "✍️", title: "Hand Signed", desc: "Every print signed and numbered by the photographer" },
            { icon: "📜", title: "Certificate", desc: "Certificate of authenticity included with every print" },
            { icon: "🌍", title: "Worldwide Shipping", desc: "Fully insured delivery to any country" },
          ].map((item) => (
            <div key={item.title}>
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="text-white text-xs tracking-[0.2em] uppercase mb-2 font-medium">{item.title}</p>
              <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="py-10 px-6 bg-[#f8f7f4]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 text-xs tracking-[0.2em] uppercase border transition-all duration-300 ${
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

      {/* Prints Grid */}
      <div className="py-12 px-6 lg:px-10 bg-[#f8f7f4]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((print) => (
            <div
              key={print.id}
              className="group cursor-pointer"
              onClick={() => setSelectedPrint(print)}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3] mb-5">
                <img
                  src={print.image}
                  alt={print.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <span className="border border-white text-white text-xs tracking-[0.3em] uppercase px-8 py-3 flex items-center gap-2">
                      View Print <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
                {/* Edition badge */}
                <div className="absolute top-4 right-4 bg-black/70 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
                  {print.edition}
                </div>
              </div>

              {/* Info */}
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

      {/* Custom print enquiry */}
      <section className="py-20 px-6 bg-gray-900 text-white text-center">
        <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4 font-light">Bespoke Service</p>
        <h2 className="text-4xl font-light mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
          Looking for Something Specific?
        </h2>
        <p className="text-white/50 text-sm leading-relaxed max-w-xl mx-auto mb-10">
          I offer bespoke print commissions, custom sizes for commercial spaces, and exclusive licensing for editorial and advertising use. Get in touch to discuss your requirements.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-3 border border-amber-400 text-amber-400 px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-amber-400 hover:text-black transition-all duration-300"
        >
          Enquire Now
        </a>
      </section>

      {selectedPrint && (
        <PrintModal print={selectedPrint} onClose={() => setSelectedPrint(null)} />
      )}

      <Footer />
    </div>
  );
}
