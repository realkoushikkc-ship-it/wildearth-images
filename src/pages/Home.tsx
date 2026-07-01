import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroSlideshow from "../components/HeroSlideshow";
import Footer from "../components/Footer";
import { galleryCategories, blogPosts } from "../data/images";

interface HomeProps {
  onSlideChange?: (imageUrl: string, isLight: boolean) => void;
}

export default function Home({ onSlideChange }: HomeProps) {
  const [navLight, setNavLight] = useState(true);

  const handleBrightnessChange = (isLight: boolean) => {
    setNavLight(isLight);
    onSlideChange?.("", isLight);
  };

  return (
    <div className="bg-white">
      {/* HERO SLIDESHOW */}
      <HeroSlideshow onBrightnessChange={handleBrightnessChange} />

      {/* FEATURED IN / INTRO STRIP */}
<section className="bg-[#0f0f0f] py-7 px-6 border-b border-white/5">
  <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-center gap-8 lg:gap-16">
    <span className="text-white/60 text-xs tracking-[0.5em] uppercase font-light shrink-0">As Seen In</span>
    {["Air India", "Etihad Airways", "35Awards", "Outlook India"].map((item) => (
      <span key={item} className="text-white/80 text-sm tracking-[0.3em] uppercase font-light hover:text-white transition-colors duration-300 cursor-default">
        {item}
      </span>
    ))}
  </div>
</section>

      {/* SECTION 1: INTRO — Simon Wantling style full-width editorial */}
      <section className="py-24 px-6 lg:px-20 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase font-medium mb-4">Wildlife · Travel · Conservation</p>
            <h2
              className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Capturing the Wild,{" "}
              <em>One Frame at a Time</em>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              "I am Koushik Chatterjee — a wildlife photographer and visual storyteller driven by a deep love for the natural world. Through my lens, I seek to reveal the extraordinary beauty of our planet's wildlife, bringing people closer to nature while raising urgent awareness for the species and habitats that need our protection"
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              From the silent forests of India to the vast plains of Africa, each image is the result of patient waiting, ethical practice, and a deep respect for the wild world. With over fifteen years in the field and work recognised by 35Awards and TopPhotoAward, my photographs have appeared in Smithsonian Magazine, Vogue, and Outlook India.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-gray-900 border-b border-gray-900 pb-1 hover:text-amber-500 hover:border-amber-500 transition-all duration-300 group"
            >
              Learn more about me
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://i.postimg.cc/Ls8mzSqD/1000277000.jpg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=900"
              alt="Koushik Chatterjee photographing wildlife"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-amber-500 p-6 hidden lg:block">
              <p className="text-black font-bold text-3xl leading-none">15+</p>
              <p className="text-black/70 text-xs tracking-widest uppercase mt-1">Years in Field</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: GALLERY CATEGORIES — Andy Rouse 3-col grid style */}
      <section className="py-20 bg-[#f8f7f4]">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-500 text-xs tracking-[0.4em] uppercase font-medium mb-2">Explore</p>
              <h2
                className="text-3xl lg:text-4xl font-light text-gray-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Featured Galleries
              </h2>
            </div>
            <Link
              to="/gallery"
              className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-amber-500 transition-colors duration-300 group"
            >
              View all
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryCategories.map((cat) => (
              <Link key={cat.id} to={`/gallery/${cat.id}`} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[3/4] mb-4">
                  <img
                    src={cat.coverImage}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white/60 text-[10px] tracking-[0.3em] uppercase mb-1">{cat.count} images</p>
                    <h3 className="text-white text-lg font-medium" style={{ fontFamily: "Playfair Display, serif" }}>
                      {cat.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2b: QUOTE INTERLUDE */}
      <section className="py-20 px-6 text-center bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-amber-400 text-5xl mb-6 opacity-30" style={{ fontFamily: "Georgia, serif" }}>"</div>
          <blockquote
            className="text-2xl lg:text-3xl text-gray-700 font-light leading-relaxed italic"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Photography is not about capturing a moment — it is about bearing witness. The shutter is a promise: I was here, this was real, this mattered.
          </blockquote>
          <div className="w-12 h-px bg-amber-400 mx-auto mt-8 mb-4" />
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400">Koushik Chatterjee</p>
        </div>
      </section>

      {/* SECTION 3: FULL-WIDTH FEATURE IMAGE — Simon Wantling editorial style */}
      <section className="relative h-[80vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/11760800/pexels-photo-11760800.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920"
          alt="African elephant at waterhole"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10" />
        <div className="absolute inset-0 flex items-center px-10 lg:px-20">
          <div className="max-w-xl">
            <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4 font-light">Featured Image</p>
            <h2
              className="text-4xl lg:text-6xl text-white font-light leading-tight mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              The Last Giants
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-sm">
              African elephants — once numbering in the millions — now number barely 400,000. Every image is a testament to what we still have, and what we stand to lose.
            </p>
            <Link
              to="/gallery/elephants"
              className="inline-flex items-center gap-3 text-white border border-white/40 px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 group"
            >
              View Gallery
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: STATS BAND */}
      <section className="bg-[#0f0f0f] py-16 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {[
            { value: "15+", label: "Years Experience" },
            { value: "850+", label: "Species Photographed" },
            { value: "47", label: "Countries" },
            { value: "36", label: "Awards Won" },
            { value: "120+", label: "Exhibitions" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-amber-400 text-3xl lg:text-4xl font-bold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                {stat.value}
              </p>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: PRINTS PROMO — Full editorial block */}
      <section className="py-24 px-6 lg:px-20 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/32420357/pexels-photo-32420357.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600"
              alt="Lion print"
              className="w-full h-64 object-cover"
            />
            <img
              src="https://images.pexels.com/photos/10350645/pexels-photo-10350645.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600"
              alt="Turtle print"
              className="w-full h-64 object-cover mt-8"
            />
            <img
              src="https://images.pexels.com/photos/37202118/pexels-photo-37202118.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600"
              alt="Leopard print"
              className="w-full h-64 object-cover -mt-4"
            />
            <img
              src="https://images.pexels.com/photos/35023115/pexels-photo-35023115.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600"
              alt="Macaws print"
              className="w-full h-64 object-cover mt-4"
            />
          </div>
          <div>
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase font-medium mb-4">Fine Art</p>
            <h2
              className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Bring the Wild Home
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              Each print is a window into the wild. Produced on archival-quality Hahnemühle fine art paper using the finest pigment inks, every limited edition print is signed, numbered and comes with a certificate of authenticity.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Hahnemühle archival fine art paper",
                "Giclée pigment printing — 100+ year fade resistance",
                "Signed & numbered limited editions",
                "Available in multiple sizes",
                "Worldwide shipping with full insurance",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                  <span className="w-1 h-1 bg-amber-500 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/prints"
              className="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-amber-500 transition-all duration-300 group"
            >
              Shop Prints
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: LATEST BLOG — Simon Wantling style */}
      <section className="py-20 bg-[#f8f7f4]">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-500 text-xs tracking-[0.4em] uppercase font-medium mb-2">Stories</p>
              <h2
                className="text-3xl lg:text-4xl font-light text-gray-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                From the Field
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-amber-500 transition-colors duration-300 group"
            >
              All stories
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group">
                <div className="relative overflow-hidden aspect-video mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-black text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs tracking-wide mb-2">{post.date} · {post.readTime}</p>
                <h3
                  className="text-gray-900 text-xl font-medium leading-snug mb-3 group-hover:text-amber-600 transition-colors duration-300"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6b: ANDY ROUSE STYLE 3-COL FEATURE CARDS */}
      <section className="py-20 px-6 lg:px-16 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase font-medium mb-3">Discover More</p>
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
              What I Do
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.pexels.com/photos/37202118/pexels-photo-37202118.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
                title: "Fine Art Prints",
                desc: "Bring the wilderness into your home with limited edition, hand-signed Giclée prints on archival Hahnemühle paper. Each print comes with a certificate of authenticity.",
                cta: "Shop Prints",
                link: "/prints",
              },
              {
                image: "https://images.pexels.com/photos/29345317/pexels-photo-29345317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
                title: "Image Licensing",
                desc: "My archive of over 50,000 wildlife images is available for editorial, commercial, advertising and conservation licensing. High-resolution files with full metadata.",
                cta: "Enquire Now",
                link: "/contact",
              },
              {
                image: "https://images.pexels.com/photos/20335157/pexels-photo-20335157.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
                title: "Conservation Work",
                desc: "Photography as advocacy. A portion of every sale supports frontline conservation organisations protecting the species I document across Africa, Asia and beyond.",
                cta: "My Story",
                link: "/about",
              },
            ].map((card) => (
              <div key={card.title} className="flex flex-col items-center text-center group">
                <div className="relative overflow-hidden w-full aspect-[4/3] mb-6">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl text-gray-900 font-medium mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">{card.desc}</p>
                <Link
                  to={card.link}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-800 border border-gray-300 px-8 py-3 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                >
                  {card.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CONSERVATION CTA */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/20335157/pexels-photo-20335157.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1920"
          alt="Conservation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <p className="text-amber-400 text-xs tracking-[0.4em] uppercase font-light mb-4">Conservation</p>
          <h2
            className="text-4xl lg:text-5xl text-white font-light leading-tight mb-8"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Photography as a Force for Change
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            A portion of every print sale and licensing fee is donated directly to frontline conservation organisations working to protect the species I photograph. Images don't just tell stories — they save lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-3 border border-amber-400 text-amber-400 px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-amber-400 hover:text-black transition-all duration-300"
            >
              My Conservation Work
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-amber-400 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
