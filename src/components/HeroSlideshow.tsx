import { useState, useEffect, useCallback } from "react";
import { heroSlides } from "../data/images";

interface HeroSlideshowProps {
  /** Called when slide changes - passes current image URL and brightness */
  onSlideChange?: (imageUrl: string, isLight: boolean) => void;
}

export default function HeroSlideshow({ onSlideChange }: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const notifyChange = useCallback(
    (index: number) => {
      const slide = heroSlides[index];
      const isLight = slide.brightness === "light";
      onSlideChange?.(slide.url, isLight);
    },
    [onSlideChange]
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (transitioning || index === current) return;
      setTransitioning(true);
      setPrev(current);
      setCurrent(index);
      notifyChange(index);
      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, 1200);
    },
    [current, transitioning, notifyChange]
  );

  useEffect(() => {
    // Set initial slide info
    notifyChange(0);

    const interval = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % heroSlides.length;
        setPrev(c);
        setTransitioning(true);
        notifyChange(next);
        setTimeout(() => {
          setPrev(null);
          setTransitioning(false);
        }, 1200);
        return next;
      });
    }, 5500);

    return () => clearInterval(interval);
  }, [notifyChange]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.url}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 2 : i === prev ? 1 : 0,
          }}
        >
          <img
            src={slide.url}
            alt={slide.title}
            className={`w-full h-full object-cover ${i === current ? "ken-burns" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* Gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-24 px-10 lg:px-20">
        <div className="max-w-screen-xl mx-auto w-full">
          {/* Slide info */}
          <div key={current} className="animate-fadeInUp">
            <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-3 font-light">
              {heroSlides[current].location}
            </p>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-none mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {heroSlides[current].title}
            </h1>
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-3">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`transition-all duration-500 ${
                    i === current
                      ? "w-8 h-0.5 bg-amber-400"
                      : "w-2 h-0.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Tagline */}
            <div className="hidden md:flex flex-col items-end">
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-light">
                Wildlife Photography · Travel · Conservation
              </span>
              <span className="text-white/20 text-xs tracking-widest mt-1">
                {current + 1} / {heroSlides.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/40 animate-pulse" />
        <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
      </div>
    </div>
  );
}
