import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, MapPin, Camera, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <Navbar isLight={false} forceTransparent={false} />

      {/* Hero */}
      <div className="relative h-[45vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/28918615/pexels-photo-28918615.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1600"
          alt="Contact"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-4 font-light">Get in Touch</p>
          <h1 className="text-5xl lg:text-7xl text-white font-light" style={{ fontFamily: "Playfair Display, serif" }}>
            Contact
          </h1>
          <div className="w-16 h-px bg-amber-400 mt-8" />
        </div>
      </div>

      {/* Main content */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left info */}
          <div className="lg:col-span-2">
            <p className="text-amber-500 text-xs tracking-[0.4em] uppercase mb-4 font-light">WildEarth Images</p>
            <h2 className="text-3xl text-gray-900 font-light mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              Let's Start a Conversation
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-12">
              Whether you're interested in purchasing a fine art print, licensing an image for editorial or commercial use, hosting an exhibition, or simply want to say hello — I'd love to hear from you.
            </p>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Mail size={16} className="text-amber-500" />
                  <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-light">Email</p>
                </div>
                <p className="text-gray-700 text-sm pl-7">koushik@wildearthimages.com</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={16} className="text-amber-500" />
                  <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-light">Location</p>
                </div>
                <p className="text-gray-700 text-sm pl-7">Kolkata, West Bengal, India<br />Available globally for assignments</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Camera size={16} className="text-amber-500" />
                  <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-light">Enquiries</p>
                </div>
                <p className="text-gray-700 text-sm pl-7">
                  Prints · Licensing · Exhibitions<br />
                  Commissions · Media & Press
                </p>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-100">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-5 font-light">Follow Along</p>
              <div className="flex gap-4">
                {["Instagram", "Facebook", "YouTube", "Twitter"].map((soc) => (
                  <a
                    key={soc}
                    href="#"
                    className="border border-gray-200 text-gray-400 text-xs px-4 py-2.5 hover:border-amber-400 hover:text-amber-500 transition-all duration-300 tracking-wide"
                  >
                    {soc}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <Send size={24} className="text-amber-500" />
                </div>
                <h3 className="text-3xl text-gray-900 font-light mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
                  Message Sent
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  Thank you for reaching out. I'll get back to you within 48 hours. In the meantime, feel free to explore the gallery.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-amber-400 transition-colors placeholder:text-gray-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-amber-400 transition-colors placeholder:text-gray-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">I'm contacting about</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-amber-400 transition-colors bg-white"
                  >
                    <option value="general">General Enquiry</option>
                    <option value="prints">Fine Art Print Purchase</option>
                    <option value="licensing">Image Licensing</option>
                    <option value="exhibition">Exhibition Hosting</option>
                    <option value="commission">Assignment / Commission</option>
                    <option value="press">Media & Press</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">Message *</label>
                  <textarea
                    required
                    rows={7}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-amber-400 transition-colors resize-none placeholder:text-gray-300"
                    placeholder="Tell me about your enquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-4 text-xs tracking-[0.3em] uppercase hover:bg-amber-500 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  Send Message
                  <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Service enquiry boxes */}
      <section className="py-16 px-6 bg-[#f8f7f4]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🖼️",
                title: "Fine Art Prints",
                desc: "Limited edition, signed and numbered Giclée prints on archival paper. Available in multiple sizes for home and commercial spaces.",
                cta: "View Print Store",
                link: "/prints",
              },
              {
                icon: "📷",
                title: "Image Licensing",
                desc: "Comprehensive library of wildlife images available for editorial, advertising, conservation and educational licensing worldwide.",
                cta: "Discuss Licensing",
                link: "/contact",
              },
              {
                icon: "🏛️",
                title: "Exhibition Hire",
                desc: "Full touring exhibition packages available for museums, galleries, nature centres and corporate environments globally.",
                cta: "Book Exhibition",
                link: "/contact",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 border border-gray-100 hover:border-amber-200 transition-colors duration-300 group">
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="text-xl text-gray-900 font-medium mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                <a
                  href={item.link}
                  className="text-xs tracking-[0.2em] uppercase text-amber-600 border-b border-amber-300 pb-1 hover:text-amber-700 transition-colors"
                >
                  {item.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
