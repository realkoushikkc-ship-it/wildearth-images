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
    src="https://i.postimg.cc/T3ww9C6d/FB-IMG-1782990894550.jpg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
    alt="Koushik Chatterjee"
    className="w-full h-full object-cover object-[center_65%]"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
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
                "Every time I press the shutter, I am not merely capturing an image — I am creating a potential ambassador for a species, a habitat, a moment in time that may not exist much longer."
              </blockquote>
              <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mt-6 font-medium">— Koushik Chatterjee</p>

              <div className="mt-12 space-y-6">
                {[
                  { label: "Based in", value: "Bengaluru, India" },
                  { label: "Active since", value: "1996" },
                  { label: "Speciality", value: "Wildlife & Conservation & Travel" },
                  { label: "Camera", value: "Nikon Z9 / D850 / D7500" },
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

            <h3 className="text-2xl text-gray-900 font-medium pt-6" style={{ fontFamily: "Playfair Display, serif" }}>
              The Journey
            </h3>
            <p>
              My romance with light began in my grandfather's film studio, where I was spellbound by the darkroom's quiet alchemy — the amber glow of safelights, the ritual of chemical baths, and the strange sorcery of pinhole cameras turning passing light into permanent memory.
            </p>
            <p>
              My father, sensing this early fixation, placed a <strong>Pentax analog camera</strong> in my hands. Film imposed a stern discipline: every frame demanded intent, each mistake was irretrievable. Years later, during college, he gave me a <strong>Fujifilm prosumer camera</strong> — a leap that recalibrated my eye for focus, light, and narrative composition. I spent those formative years in Kolkata's photography circles, absorbing the distinct dialects of street, documentary, abstract, and architectural work.
            </p>
            <p>
              Then came the inflection points. <strong>Rocco Saya</strong>, a friend I met through Orkut, gifted me my first DSLR — a <strong>Canon Rebel T2i</strong>. It was more than equipment; it was a recalibration of creative intent. Soon after, I met <strong>Raymond Gehman</strong>, a veteran <em>National Geographic</em> photographer, who taught me the <em>Nat Geo</em> way of seeing: how to frame with cinematic scope, to anticipate the decisive moment before it arrives, and to think in layers — subject, context, light, and story — all at once. The rest is history.
            </p>

            <h3 className="text-2xl text-gray-900 font-medium pt-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Why Wildlife?
            </h3>
            <p>
              I chose wildlife photography not as a career path, but as a calling. I have loved nature deeply since childhood, and the forests of India were my first classroom. For over a decade, I immersed myself in Indian forests — studying animal behavior, decoding seasonal rhythms, and understanding the invisible threads that connect every living thing. I learned that a tiger's movement is dictated by monsoon patterns, that bird migrations signal shifting ecosystems, that every species is a chapter in a larger story.
            </p>
            <p>
              Only after a decade of listening to the Indian wilderness did I step beyond its borders — first to Africa, then to Southeast Asia, the Americas, and beyond. Today, my work has taken me to <strong>3 countries</strong>, where I have photographed over <strong>850 species</strong>. My images have been recognized by the <strong>35Awards</strong>, the <strong>TopPhotoAward</strong>, and other prestigious platforms.
            </p>

            <h3 className="text-2xl text-gray-900 font-medium pt-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Philosophy & Approach
            </h3>
            <p>
              I believe wildlife photography carries a profound responsibility. Every time I press the shutter, I am not merely capturing an image — I am creating a potential ambassador for a species, a habitat, a moment in time that may not exist much longer. This belief drives me to maintain the highest ethical standards in the field: <strong>no bait, no lure, no disturbance.</strong> Patience, respect and humility are my most important tools.
            </p>
            <p>
              I spend extensive time in each location, often returning across multiple seasons to truly understand animal behaviour, light patterns and habitat. This investment of time — sometimes weeks or months — is what separates a snapshot from a genuine portrait of wild nature.
            </p>

            <h3 className="text-2xl text-gray-900 font-medium pt-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Conservation Commitment
            </h3>
            <p>
              Photography without purpose is merely decoration. A portion of every print sale, licensing fee and commissioned project is donated directly to frontline conservation organisations.
            </p>
            <p>
              I am closely associated with the <strong>Giraffe Conservation Foundation</strong> — the only NGO solely dedicated to the conservation and management of giraffe in the wild; the <strong>Mara Predator Conservation Programme</strong> — dedicated to lions, cheetahs, and wild dogs in Kenya's Greater Mara Ecosystem; and the <strong>Ol Pejeta Conservancy</strong> — a model of community-first conservation in Kenya, home to the last two northern white rhinos on Earth.
            </p>
            <p>
              I also work closely with local guides, anti-poaching units and community rangers in the regions I photograph, believing that sustainable conservation must engage and empower local communities to be truly effective.
            </p>

            <h3 className="text-2xl text-gray-900 font-medium pt-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Publications & Media
            </h3>
            <p>
              My photographs have been published in <strong>Smithsonian Magazine</strong>, <strong>Vogue</strong>, <strong>Outlook India</strong>, <strong>The Drift</strong>, <strong>Born Free Foundation</strong>, and numerous books and conservation reports. I am a regular speaker at photography festivals and conservation conferences, sharing both technical knowledge and the deeper story behind the frame.
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
        <img src="https://images.pexels.com/photos/19281386/pexels-photo-19281386.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600" alt="Wildlife portrait" className="w-full h-full object-cover" />
        <img src="https://images.pexels.com/photos/37202118/pexels-photo-37202118.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600" alt="Forest landscape" className="w-full h-full object-cover" />
        <img src="https://images.pexels.com/photos/35023115/pexels-photo-35023115.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600" alt="Nature detail" className="w-full h-full object-cover" />
      </div>

      {/* Skills / Gear */}
      <section className="py-20 px-6 lg:px-20 bg-[#f8f7f4]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Equipment",
                items: [
                  "Nikon Z9",
                  "Nikon D850",
                  "Nikon D7500",
                  "Nikon Z 20mm f/1.8 S",
                  "Nikon Z 85mm f/1.8 S",
                  "Nikon AF-S 16-35mm f/4G ED VR",
                  "Nikon AF-S 24-70mm f/2.8E ED VR",
                  "Nikon AF-S 70-200mm f/2.8E FL ED VR",
                  "Nikon AF-S 200-500mm f/5.6E ED VR",
                  "Nikon Z 400mm f/4.5 VR S",
                  "Manfrotto 055 Carbon Fiber 4-Section Tripod",
                  "Wimberley WH-200 Gimbal Head",
                ],
              },
              {
                title: "Specialisms",
                items: [
                  "Mammal behaviour",
                  "Avian flight photography",
                  "Night & low-light wildlife",
                  "Conservation documentary",
                  "Fine art printing",
                  "Expedition photography",
                ],
              },
              {
                title: "Field Experience",
                items: [
                  "East Africa",
                  "Indian Subcontinent",
                  "Indian & Pacific Ocean",
                ],
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
