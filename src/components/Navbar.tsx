import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  /** true = image is LIGHT (use DARK text), false = image is DARK (use WHITE text) */
  isLight?: boolean;
}

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Prints", path: "/prints" },
  { label: "Awards", path: "/awards" },
  { label: "Exhibitions", path: "/exhibitions" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar({ isLight = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled;

  // When transparent: adapt to image brightness
  // When scrolled or non-home: always dark text on white background
  const textColor = isTransparent
    ? isLight
      ? "text-gray-900"
      : "text-white"
    : "text-gray-900";

  const logoColor = isTransparent
    ? isLight
      ? "text-gray-900"
      : "text-white"
    : "text-gray-900";

  const borderColor = isTransparent
    ? isLight
      ? "border-gray-900/20"
      : "border-white/20"
    : "border-gray-200";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md shadow-sm"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
          <div
            className={`flex items-center justify-between h-20 border-b ${borderColor} transition-colors duration-500`}
          >
            {/* Logo */}
            <Link to="/" className="flex flex-col leading-none group">
              <span
                className={`text-xs tracking-[0.35em] uppercase font-light transition-colors duration-500 ${logoColor} opacity-70`}
              >
                WildEarth Images
              </span>
              <span
                className={`text-xl font-semibold tracking-wide transition-colors duration-500 ${logoColor}`}
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Koushik Chatterjee
              </span>
              <span
                className={`text-[10px] tracking-[0.25em] uppercase font-light transition-colors duration-500 ${logoColor} opacity-50`}
              >
                Wildlife · Travel · Conservation
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 relative group ${textColor} ${
                      isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${textColor}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <Link to="/" className="flex flex-col items-center leading-none mb-8">
            <span className="text-xs tracking-[0.35em] uppercase font-light text-white/60">
              WildEarth Images
            </span>
            <span
              className="text-3xl font-semibold tracking-wide text-white"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Koushik Chatterjee
            </span>
          </Link>
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white text-2xl font-light tracking-[0.2em] uppercase hover:text-amber-400 transition-colors duration-300"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
