import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { printsData } from "../data/images";
import { ArrowRight, X } from "lucide-react";

const categories = ["All", "Big Cats", "Elephants", "Birds", "Marine"];

// Room mockup backgrounds - Professional interior photography
const roomMockups = {
  none: {
    image: null,
    wallPosition: { top: "50%", left: "50%" },
  },
  living: {
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0fba8b?auto=format&fit=crop&q=80&w=2000",
    wallPosition: { top: "42%", left: "55%" },
  },
  office: {
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e7c?auto=format&fit=crop&q=80&w=2000",
    wallPosition: { top: "38%", left: "52%" },
  },
  bedroom: {
    image: "https://images.unsplash.com/photo-1616594039964-40891a909d99?auto=format&fit=crop&q=80&w=2000",
    wallPosition: { top: "40%", left: "50%" },
  },
  gallery: {
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&q=80&w=2000",
    wallPosition: { top: "45%", left: "50%" },
  },
  modern: {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000",
    wallPosition: { top: "43%", left: "48%" },
  },
};

const frameOptions = [
  { 
    id: "unframed", 
    label: "Fine Art Print (Unframed)", 
    priceAdder: 0, 
    matWidth: 40,
    frameWidth: 0,
    shadow: "0 20px 40px rgba(0,0,0,0.15)",
    bgColor: "white"
  },
  { 
    id: "desk", 
    label: "Small Desk Frame", 
    priceAdder: 45, 
    matWidth: 30,
    frameWidth: 12,
    shadow: "0 25px 50px rgba(0,0,0,0.25)",
    frameColor: "#1a1a1a",
    bgColor: "white"
  },
  { 
    id: "medium", 
    label: "Medium Wall Frame", 
    priceAdder: 85, 
    matWidth: 50,
    frameWidth: 16,
    shadow: "0 30px 60px rgba(0,0,0,0.3)",
    frameColor: "#0a0a0a",
    bgColor: "white"
  },
  { 
    id: "large", 
    label: "Large Gallery Frame", 
    priceAdder: 150, 
    matWidth: 60,
    frameWidth: 20,
    shadow: "0 35px 70px rgba(0,0,0,0.35)",
    frameColor: "#1a1a1a",
    bgColor: "white"
  },
  { 
    id: "oak", 
    label: "Oak Wood Frame", 
    priceAdder: 120, 
    matWidth: 50,
    frameWidth: 18,
    shadow: "0 30px 60px rgba(0,0,0,0.25)",
    frameColor: "#8B6F47",
    bgColor: "white"
  },
  { 
    id: "white", 
    label: "White Modern Frame", 
    priceAdder: 95, 
    matWidth: 50,
    frameWidth: 16,
    shadow: "0 30px 60px rgba(0,0,0,0.2)",
    frameColor: "#f5f5f5",
    bgColor: "white"
  },
];

const roomOptions = [
  { id: "none", label: "Art Only" },
  { id: "living", label: "Living Room" },
  { id: "office", label: "Office" },
  { id: "bedroom", label: "Bedroom" },
  { id: "gallery", label: "Gallery Wall" },
  { id: "modern", label: "Modern Interior" },
];

function PrintModal({ print, onClose }: { print: typeof printsData[0]; onClose: () => void }) {
  const [selectedSize, setSelectedSize] = useState(print.sizes[1] || print.sizes[0]);
  const [selectedFrame, setSelectedFrame] = useState(frameOptions[2].id);
  const [selectedRoom, setSelectedRoom] = useState(roomOptions[1].id);

  const sizeMultipliers: Record<string, number> = {
    "12×8 inch": 1,
    "20×13 inch": 1.8,
    "30×20 inch": 2.8,
    "40×27 inch": 4.2,
  };
  
  const baseMultiplier = sizeMultipliers[selectedSize] || 1;
  const frameCost = frameOptions.find(f => f.id === selectedFrame)?.priceAdder || 0;
  const price = Math.round((print.basePrice * baseMultiplier) + frameCost);

  const selectedFrameData = frameOptions.find(f => f.id === selectedFrame);
  const selectedRoomData = roomMockups[selectedRoom as keyof typeof roomMockups];

  // Calculate dimensions based on size
  const getSizeDimensions = () => {
    const ratios: Record<string, { width: number; height: number }> = {
      "12×8 inch": { width: 300, height: 200 },
      "20×13 inch": { width: 400, height: 260 },
      "30×20 inch": { width: 500, height: 333 },
      "40×27 inch": { width: 600, height: 405 },
    };
    return ratios[selectedSize] || ratios["20×13 inch"];
  };

  const dimensions = getSizeDimensions();
  const matWidth = selectedFrameData?.matWidth || 0;
  const frameWidth = selectedFrameData?.frameWidth || 0;
  const totalWidth = dimensions.width + (matWidth * 2) + (frameWidth * 2);
  const totalHeight = dimensions.height + (matWidth * 2) + (frameWidth * 2);

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white max-w-7xl w-full max-h-[95vh] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT SIDE: MOCKUP DISPLAY */}
        <div className="relative bg-gray-100 h-[60vh] lg:h-full overflow-hidden">
          
          {/* Room Background Layer */}
          {selectedRoom !== "none" && selectedRoomData?.image ? (
            <div className="absolute inset-0">
              <img 
                src={selectedRoomData.image} 
                alt={`${selectedRoom} mockup`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300" />
          )}

          {/* Fixed Artwork Container - Centered and Static */}
          <div 
            className="absolute transition-all duration-500 ease-out"
            style={{
              top: selectedRoomData?.wallPosition.top || "50%",
              left: selectedRoomData?.wallPosition.left || "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Frame Container */}
            <div
              style={{
                width: totalWidth,
                height: totalHeight,
                backgroundColor: selectedFrameData?.frameColor || "white",
                boxShadow: selectedFrameData?.shadow || "0 20px 40px rgba(0,0,0,0.15)",
                position: "relative",
              }}
            >
              {/* Mat Board */}
              {matWidth > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: frameWidth,
                    left: frameWidth,
                    right: frameWidth,
                    bottom: frameWidth,
                    backgroundColor: selectedFrameData?.bgColor || "white",
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Artwork Image */}
                  <div
                    style={{
                      position: "absolute",
                      top: matWidth,
                      left: matWidth,
                      right: matWidth,
                      bottom: matWidth,
                      overflow: "hidden",
                    }}
                  >
                    <img 
                      src={print.image} 
                      alt={print.title} 
                      className="w-full h-full object-cover"
                      style={{
                        width: dimensions.width,
                        height: dimensions.height,
                      }}
                    />
                  </div>
                </div>
              )}
              
              {/* Unframed print */}
              {matWidth === 0 && (
                <div className="absolute inset-0 p-2 bg-white">
                  <img 
                    src={print.image} 
                    alt={print.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Hanging Shadow Effect */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1"
              style={{
                width: totalWidth * 0.6,
                height: "20px",
                background: "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)",
                filter: "blur(4px)",
              }}
            />
          </div>

          {/* Room Label */}
          {selectedRoom !== "none" && (
            <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md text-white text-xs px-4 py-2 rounded-sm tracking-wider uppercase">
              {roomOptions.find(r => r.id === selectedRoom)?.label}
            </div>
          )}

          {/* Size Label */}
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-gray-900 text-xs px-4 py-2 rounded-sm tracking-wider">
            {selectedSize}
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-2 rounded-sm hover:bg-white transition-colors lg:block hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* RIGHT SIDE: CONTROLS */}
        <div className="p-8 lg:p-12 flex flex-col bg-white overflow-y-auto max-h-[95vh] lg:max-h-full">
          <button 
            onClick={onClose} 
            className="self-end text-gray-400 hover:text-gray-900 mb-4 lg:hidden"
          >
            <X size={20} />
          </button>
          
          {/* Header */}
          <div className="mb-8">
            <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-2 font-semibold">
              {print.category}
            </p>
            <h2 className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
              {print.title}
            </h2>
            <p className="text-gray-400 text-xs tracking-widest mb-4">{print.location}</p>
            <div className="flex items-center gap-4">
              <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">{print.edition}</p>
              <div className="h-px w-8 bg-amber-500" />
            </div>
          </div>

          {/* 1. Select Size */}
          <div className="mb-8">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-900 font-bold mb-4">
              1. Select Size
            </p>
            <div className="grid grid-cols-2 gap-3">
              {print.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border py-4 px-4 text-sm tracking-wide transition-all duration-200 ${
                    selectedSize === size
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Select Frame */}
          <div className="mb-8">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-900 font-bold mb-4">
              2. Select Frame
            </p>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
              {frameOptions.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrame(frame.id)}
                  className={`w-full border py-4 px-5 text-sm tracking-wide transition-all duration-200 flex justify-between items-center ${
                    selectedFrame === frame.id
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  <span className="font-medium">{frame.label}</span>
                  {frame.priceAdder > 0 && (
                    <span className="text-gray-400 text-sm">+£{frame.priceAdder}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Preview in Room */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-900 font-bold mb-4">
              3. Preview in Room
            </p>
            <div className="grid grid-cols-3 gap-2">
              {roomOptions.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`py-3 px-3 text-xs tracking-wide border transition-all duration-200 ${
                    selectedRoom === room.id
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {room.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Action */}
          <div className="mt-auto pt-8 border-t border-gray-200">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total Price</p>
                <p className="text-gray-500 text-sm">Including VAT</p>
              </div>
              <span className="text-5xl font-light text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
                £{price}
              </span>
            </div>

            <button className="w-full bg-gray-900 text-white py-5 text-xs tracking-[0.3em] uppercase hover:bg-amber-500 transition-all duration-300 mb-4 font-medium">
              Enquire About This Print
            </button>
            
            <div className="flex items-center justify-center gap-6 text-gray-400 text-xs">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Certificate
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Worldwide
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                14-day Returns
              </span>
            </div>
          </div>
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
