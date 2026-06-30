import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { awardsData } from "../data/images";

const resultColors: Record<string, string> = {
  Winner: "bg-amber-400 text-black",
  "Gold Medal": "bg-amber-400 text-black",
  "1st Place": "bg-amber-400 text-black",
  "Runner-Up": "bg-gray-200 text-gray-700",
  Finalist: "bg-gray-100 text-gray-600",
  "Highly Commended": "bg-green-50 text-green-700",
  Commended: "bg-blue-50 text-blue-700",
  "Top 10": "bg-purple-50 text-purple-700",
};

export default function Awards() {
  return (
    <div className="bg-white">
      <Navbar isLight={false} forceTransparent={false} />

      {/* Hero */}
      <div className="relative h-[45vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/33754715/pexels-photo-33754715.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1600"
          alt="Awards"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-4 font-light">Recognition</p>
          <h1 className="text-5xl lg:text-7xl text-white font-light" style={{ fontFamily: "Playfair Display, serif" }}>
            Awards & Honours
          </h1>
          <div className="w-16 h-px bg-amber-400 mt-8" />
        </div>
      </div>

      {/* Summary stats */}
      <div className="bg-[#0f0f0f] py-12 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "36", label: "Total Awards" },
            { value: "12", label: "First Place / Gold" },
            { value: "8", label: "Major Competitions" },
            { value: "2021–2024", label: "Award Years" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-amber-400 text-3xl lg:text-4xl font-bold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                {stat.value}
              </p>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        <p className="text-gray-500 text-base leading-relaxed">
          International recognition in wildlife photography is not the goal — it is the by-product of work done with honesty and patience. Each award represents a moment in the wild that resonated with judges who share a passion for the natural world.
        </p>
      </section>

      {/* Awards by Year */}
      <section className="pb-24 px-6 lg:px-20">
        <div className="max-w-screen-xl mx-auto space-y-20">
          {awardsData.map((yearData) => (
            <div key={yearData.year}>
              {/* Year heading */}
              <div className="flex items-center gap-6 mb-10">
                <h2
                  className="text-6xl lg:text-8xl font-light text-gray-100"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {yearData.year}
                </h2>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Awards table */}
              <div className="space-y-4">
                {yearData.awards.map((award, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-center py-6 border-b border-gray-100 group hover:bg-[#fafafa] px-4 -mx-4 transition-colors duration-300"
                  >
                    {/* Result badge */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs tracking-[0.15em] uppercase px-4 py-2 font-medium ${
                          resultColors[award.result] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {award.result}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="md:col-span-2">
                      <h3 className="text-gray-900 text-lg font-medium leading-snug" style={{ fontFamily: "Playfair Display, serif" }}>
                        {award.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">{award.category}</p>
                    </div>

                    {/* Organisation */}
                    <div className="text-right">
                      <p className="text-gray-500 text-sm">{award.organization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WPotY spotlight */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/19281386/pexels-photo-19281386.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1920"
          alt="Award winning image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4 font-light">Spotlight</p>
          <h2 className="text-4xl lg:text-5xl text-white font-light leading-tight mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
            Wildlife Photographer of the Year
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Recognised four consecutive times by the Natural History Museum's Wildlife Photographer of the Year competition — the world's most prestigious wildlife photography award. From finalist to runner-up, each entry represents months of preparation, travel and fieldwork.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
