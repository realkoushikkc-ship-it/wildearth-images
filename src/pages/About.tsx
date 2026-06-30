import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-white">
      <Navbar isLight={false} forceTransparent={false} />

      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/37420424/pexels-photo-37420424.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
          alt="Koushik Chatterjee"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-20">
          <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-3 font-light">About</p>
          <h1
            className="text-5xl lg:text-7xl text-white font-light leading-none"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Koushik Chatterjee
          </h1>
        </div>
      </div>

      {/* Bio Section */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Pull quote */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="w-16 h-px bg-amber-500 mb-8" />
              <blockquote
                className="text-2xl lg:text-3xl text-gray-800 font-light leading-relaxed italic"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                "Every frame I make is a love letter to the natural world, and a plea to protect it."
              </blockquote>
              <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mt-6 font-medium">— Koushik Chatterjee</p>

              <div className="mt-12 space-y-6">
                {[
                  { label: "Based in", value: "Kolkata, India" },
                  { label: "Active since", value: "2009" },
                  { label: "Speciality", value: "Wildlife & Marine" },
                  { label: "Camera", value: "Canon EOS R5 / R3" },
                ].map((item) => (
                  <div key={item.label} className="border-b border-gray-100 pb-4">
                    <p className="text-gray-400 text-xs tracking-[0.2em] uppercase mb-1">{item.label}</p>
                    <p className="text-gray-800 text-sm font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main text */}
          <div className="lg:col-span-2 space-y-6 text-gray-600 text-base leading-relaxed">
            <p>
              I am Koushik Chatterjee — a wildlife photographer, visual storyteller and conservation advocate based in Kolkata, India. For over fifteen years, I have travelled to the farthest corners of the earth in pursuit of authentic, intimate moments with the natural world.
            </p>
            <p>
              My passion for wildlife began in the forests of West Bengal, where childhood visits to Sundarbans ignited a lifelong fascination with tigers and the mangrove ecosystem. Armed with a borrowed camera and an overwhelming curiosity, I began photographing birds, reptiles and mammals in the forests of India before expanding my travels across Africa, Southeast Asia, the Americas and beyond.
            </p>
            <p>
              Today, my work has taken me to 47 countries, where I have photographed over 850 species. My images have been recognised in some of the world's most prestigious wildlife photography competitions, including the Wildlife Photographer of the Year (Natural History Museum, London), the BigPicture Natural World Photography Competition, the International Photography Awards, and many others.
            </p>

            <h3 className="text-2xl text-gray-900 font-medium pt-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Philosophy & Approach
            </h3>
            <p>
              I believe wildlife photography carries a profound responsibility. Every time I press the shutter, I am not merely capturing an image — I am creating a potential ambassador for a species, a habitat, a moment in time that may not exist much longer. This belief drives me to maintain the highest ethical standards in the field: no bait, no lure, no disturbance. Patience, respect and humility are my most important tools.
            </p>
            <p>
              I spend extensive time in each location, often returning across multiple seasons to truly understand animal behaviour, light patterns and habitat. This investment of time — sometimes weeks or months — is what separates a snapshot from a genuine portrait of wild nature.
            </p>

            <h3 className="text-2xl text-gray-900 font-medium pt-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Conservation Commitment
            </h3>
            <p>
              Photography without purpose is decoration. A portion of every print sale, licensing fee and commissioned project is donated directly to frontline conservation organisations including the WWF India Tiger Programme, the African Wildlife Foundation, and several community-based conservation initiatives across Sub-Saharan Africa.
            </p>
            <p>
              I also work closely with local guides, anti-poaching units and community rangers in the regions I photograph, believing that sustainable conservation must engage and empower local communities to be truly effective.
            </p>

            <h3 className="text-2xl text-gray-900 font-medium pt-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Publications & Media
            </h3>
            <p>
              My photographs have been published in National Geographic, BBC Wildlife Magazine, Outdoor Photographer, Nature TTL, GEO Germany, and numerous books and conservation reports. I am a regular speaker at photography festivals and conservation conferences, sharing both technical knowledge and the deeper story behind the frame.
            </p>

            <div className="pt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-amber-500 transition-all duration-300 group"
              >
                Work With Me
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Row — full bleed */}
      <div className="grid grid-cols-3 h-64 lg:h-80">
        <img src="https://images.pexels.com/photos/19281386/pexels-photo-19281386.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600" alt="" className="w-full h-full object-cover" />
        <img src="https://images.pexels.com/photos/37202118/pexels-photo-37202118.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600" alt="" className="w-full h-full object-cover" />
        <img src="https://images.pexels.com/photos/35023115/pexels-photo-35023115.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600" alt="" className="w-full h-full object-cover" />
      </div>

      {/* Skills / Gear */}
      <section className="py-20 px-6 lg:px-20 bg-[#f8f7f4]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Equipment",
                items: ["Canon EOS R5 Mark II", "Canon EOS R3", "Canon RF 600mm f/4L", "Canon RF 100-500mm", "Canon RF 16-35mm f/2.8L", "Gitzo GT5543LS Tripod", "Manfrotto fluid heads"],
              },
              {
                title: "Specialisms",
                items: ["Mammal behaviour", "Avian flight photography", "Underwater photography", "Night & low-light wildlife", "Conservation documentary", "Fine art printing", "Expedition photography"],
              },
              {
                title: "Field Experience",
                items: ["East & Southern Africa", "Indian Subcontinent", "Southeast Asia", "Amazon Rainforest", "Arctic & Sub-Arctic", "Indian & Pacific Ocean", "European wilderness"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6 font-light">{col.title}</h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                      <span className="w-1 h-1 bg-amber-500 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
