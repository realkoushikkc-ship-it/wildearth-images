import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { galleryCategories } from "../data/images";

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: { url: string; title: string; location: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
      >
        <X size={28} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 lg:left-8 text-white/60 hover:text-white transition-colors z-10"
      >
        <ChevronLeft size={40} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 lg:right-8 text-white/60 hover:text-white transition-colors z-10"
      >
        <ChevronRight size={40} />
      </button>

      <div className="max-w-6xl max-h-[90vh] px-16 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].title}
          className="max-h-[80vh] max-w-full object-contain"
        />
        <div className="mt-4 text-center">
          <p className="text-white text-lg font-light" style={{ fontFamily: "Playfair Display, serif" }}>
            {images[currentIndex].title}
          </p>
          <p className="text-white/40 text-xs tracking-[0.3em] uppercase mt-1">{images[currentIndex].location}</p>
          <p className="text-white/30 text-xs mt-2">{currentIndex + 1} / {images.length}</p>
        </div>
      </div>
    </div>
  );
}

// ---- Gallery Category View (Yves Adams style masonry/grid) ----
function CategoryView({ categoryId }: { categoryId: string }) {
  const category = galleryCategories.find((c) => c.id === categoryId);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!category) return <div className="pt-40 text-center text-gray-500">Category not found</div>;

  return (
    <div>
      <Navbar isLight={true} forceTransparent={false} />

      {/* Hero */}
      <div className="relative h-[55vh] overflow-hidden pt-20">
        <img src={category.coverImage} alt={category.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <Link
            to="/gallery"
            className="flex items-center gap-2 text-white/50 hover:text-white text-xs tracking-[0.2em] uppercase mb-6 transition-colors"
          >
            <ArrowLeft size={12} />
            All Galleries
          </Link>
          <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-3 font-light">{category.count} Images</p>
          <h1
            className="text-5xl lg:text-6xl text-white font-light"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {category.title}
          </h1>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white py-10 px-6">
        <p className="max-w-2xl mx-auto text-gray-500 text-base leading-relaxed text-center">{category.description}</p>
      </div>

      {/* Masonry Grid — Yves Adams style */}
      <div className="bg-[#0f0f0f] px-4 py-4">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-1 space-y-1">
          {category.images.map((img, i) => (
            <div
              key={i}
              className="break-inside-avoid cursor-pointer relative overflow-hidden group"
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-medium text-sm" style={{ fontFamily: "Playfair Display, serif" }}>{img.title}</p>
                <p className="text-white/50 text-xs tracking-wider mt-0.5">{img.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={category.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i! - 1 + category.images.length) % category.images.length)}
          onNext={() => setLightboxIndex((i) => (i! + 1) % category.images.length)}
        />
      )}

      <Footer />
    </div>
  );
}

// ---- Main Gallery Index (Yves Adams portfolio page style) ----
export default function Gallery() {
  const { categoryId } = useParams();

  if (categoryId) {
    return <CategoryView categoryId={categoryId} />;
  }

  return (
    <div className="bg-[#0f0f0f]">
      <Navbar isLight={true} forceTransparent={false} />

      {/* Page Header */}
      <div className="pt-36 pb-20 px-6 text-center">
        <p className="text-amber-400 text-[10px] tracking-[0.6em] uppercase font-light mb-6">WildEarth Images</p>
        <h1
          className="text-6xl lg:text-8xl text-white font-light leading-none"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Portfolio
        </h1>
        <div className="w-20 h-px bg-amber-400 mx-auto mt-10 mb-10" />
        <p className="text-white/40 text-sm leading-relaxed max-w-lg mx-auto italic" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          A curated selection of wildlife photography spanning six continents — from the golden savannahs of Africa to the silent depths of the ocean.
        </p>
      </div>

      {/* Gallery Grid — Yves Adams large format category grid */}
      <div className="px-4 pb-4">
        {/* First row: 2 large */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mb-1">
          {galleryCategories.slice(0, 2).map((cat) => (
            <Link key={cat.id} to={`/gallery/${cat.id}`} className="group relative overflow-hidden h-[60vh] block">
              <img
                src={cat.coverImage}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {cat.count} photographs
                </p>
                <h2
                  className="text-white text-4xl lg:text-5xl font-light"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {cat.title}
                </h2>
                <div className="w-0 group-hover:w-16 h-px bg-amber-400 mt-6 transition-all duration-500" />
                <p className="text-white/0 group-hover:text-white/70 text-xs tracking-[0.3em] uppercase mt-4 transition-all duration-500">
                  Explore →
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Second row: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {galleryCategories.slice(2).map((cat) => (
            <Link key={cat.id} to={`/gallery/${cat.id}`} className="group relative overflow-hidden h-[45vh] block">
              <img
                src={cat.coverImage}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/15 transition-colors duration-700" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-2 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {cat.count} photographs
                </p>
                <h2
                  className="text-white text-3xl font-light"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {cat.title}
                </h2>
                <div className="w-0 group-hover:w-12 h-px bg-amber-400 mt-4 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12" />
      <Footer />
    </div>
  );
}
