import { Link } from "react-router-dom";
import { Mail, MapPin, Camera } from "lucide-react";
import { brandCollaborators } from "../data/images";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Brand Collaborations Band */}
      <div className="border-t border-white/10 py-10 px-6">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-center text-xs tracking-[0.35em] uppercase text-white/40 mb-8">Brand Collaborations & Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {brandCollaborators.map((brand) => (
              <div key={brand.name} className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <span className="text-3xl">{brand.logo}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-light">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Main Footer */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex flex-col mb-6">
              <span className="text-xs tracking-[0.35em] uppercase text-white/40 font-light">WildEarth Images</span>
              <span className="text-2xl font-semibold text-white mt-1" style={{ fontFamily: "Playfair Display, serif" }}>
                Koushik Chatterjee
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-white/40 font-light mt-1">Wildlife · Travel · Conservation</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Award-winning wildlife photographer based in India, documenting the beauty and fragility of the natural world across six continents.
            </p>
            <div className="flex items-center gap-4">
              {["IG", "FB", "YT", "TW"].map((soc) => (
                <a key={soc} href="#" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 hover:text-amber-400 hover:border-amber-400 transition-all duration-300 text-xs font-bold">
                  {soc}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6 font-light">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: "About Me", path: "/about" },
                { label: "Gallery", path: "/gallery" },
                { label: "Fine Art Prints", path: "/prints" },
                { label: "Awards", path: "/awards" },
                { label: "Exhibitions", path: "/exhibitions" },
                { label: "Blog", path: "/blog" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-300 tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6 font-light">In Numbers</h4>
            <div className="space-y-5">
              {[
                { value: "15+", label: "Years of Experience" },
                { value: "850+", label: "Species Photographed" },
                { value: "47", label: "Countries Visited" },
                { value: "36", label: "International Awards" },
                { value: "120+", label: "Exhibitions Worldwide" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <span className="text-amber-400 font-bold text-lg w-16">{stat.value}</span>
                  <span className="text-white/40 text-xs tracking-wide">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6 font-light">Get in Touch</h4>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <Mail size={14} className="text-amber-400 shrink-0" />
                <span>koushik@wildearthimages.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <MapPin size={14} className="text-amber-400 shrink-0" />
                <span>Kolkata, India / Global</span>
              </div>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <Camera size={14} className="text-amber-400 shrink-0" />
                <span>Print & Licensing Enquiries</span>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-3 font-light">Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 flex-1 outline-none focus:border-amber-400/50 transition-colors placeholder:text-white/20"
                />
                <button className="bg-amber-500 hover:bg-amber-400 text-black text-xs px-4 py-2.5 transition-colors duration-300 font-medium tracking-wide">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 px-6 py-6">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wide">
            © {new Date().getFullYear()} WildEarth Images by Koushik Chatterjee. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            All photographs © Koushik Chatterjee — Reproduction prohibited without written consent.
          </p>
        </div>
      </div>
    </footer>
  );
}
