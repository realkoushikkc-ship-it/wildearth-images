import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { exhibitionsData } from "../data/images";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

export default function Exhibitions() {
  const upcoming = exhibitionsData.filter((e) => e.status === "upcoming");
  const past = exhibitionsData.filter((e) => e.status === "past");

  return (
    <div className="bg-white">
      <Navbar isLight={false} forceTransparent={false} />

      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/37420424/pexels-photo-37420424.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600"
          alt="Exhibitions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-4 font-light">Where to See the Work</p>
          <h1 className="text-5xl lg:text-7xl text-white font-light" style={{ fontFamily: "Playfair Display, serif" }}>
            Exhibitions
          </h1>
          <div className="w-16 h-px bg-amber-400 mt-8" />
        </div>
      </div>

      {/* Intro */}
      <section className="py-14 px-6 max-w-2xl mx-auto text-center">
        <p className="text-gray-500 text-base leading-relaxed">
          From major natural history institutions to intimate gallery spaces, WildEarth Images has been exhibited across four continents. Below you'll find upcoming and past exhibitions.
        </p>
      </section>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="pb-16 px-6 lg:px-20">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <span className="bg-amber-400 text-black text-xs tracking-[0.2em] uppercase px-4 py-2 font-medium">Upcoming</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="space-y-8">
              {upcoming.map((ex, i) => (
                <div key={i} className="grid grid-cols-1 lg:grid-cols-5 gap-8 border border-amber-200 bg-amber-50/50 p-8 lg:p-10">
                  <div className="lg:col-span-2">
                    <div className="relative overflow-hidden aspect-video">
                      <img src={ex.image} alt={ex.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-amber-400 text-black text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-medium">
                          {ex.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-3 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar size={14} className="text-amber-500" />
                      <span className="text-amber-600 text-xs tracking-[0.2em] uppercase font-medium">{ex.dates}</span>
                    </div>
                    <h2 className="text-3xl font-light text-gray-900 mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
                      {ex.title}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <MapPin size={13} className="text-amber-500" />
                      <span>{ex.venue} · {ex.location}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{ex.description}</p>
                    <a href="#" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-amber-600 border-b border-amber-400 pb-1 hover:text-amber-700 transition-colors w-fit group">
                      Plan Your Visit <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Exhibitions */}
      <section className="pb-24 px-6 lg:px-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs tracking-[0.2em] uppercase text-gray-400 border border-gray-200 px-4 py-2">Past</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {past.map((ex, i) => (
              <div key={i} className="group">
                <div className="relative overflow-hidden aspect-video mb-5">
                  <img
                    src={ex.image}
                    alt={ex.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/80 text-gray-700 text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                      {ex.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs tracking-wide mb-2">
                  <Calendar size={11} />
                  <span>{ex.dates}</span>
                </div>
                <h3 className="text-gray-900 text-2xl font-light mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                  {ex.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <MapPin size={12} />
                  <span>{ex.venue} · {ex.location}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{ex.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue enquiry */}
      <section className="bg-[#0f0f0f] py-20 px-6 text-center">
        <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4 font-light">Host an Exhibition</p>
        <h2 className="text-4xl text-white font-light mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
          Bring WildEarth to Your Venue
        </h2>
        <p className="text-white/50 text-sm leading-relaxed max-w-xl mx-auto mb-10">
          WildEarth Images is available for exhibition hire at museums, galleries, conservation centres and corporate spaces worldwide. Each exhibition is fully curated and can be tailored to your venue and audience.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-3 border border-white/30 text-white px-10 py-4 text-xs tracking-[0.2em] uppercase hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
        >
          Get in Touch
        </a>
      </section>

      <Footer />
    </div>
  );
}
