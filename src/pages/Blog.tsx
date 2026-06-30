import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { blogPosts } from "../data/images";
import { ArrowRight, ArrowLeft, Clock, Tag } from "lucide-react";

const allCategories = ["All", "Field Notes", "Stories", "Adventures", "Conservation"];

function BlogPost({ postId }: { postId: string }) {
  const post = blogPosts.find((p) => p.id === postId);
  if (!post) return <div className="pt-40 text-center text-gray-500">Post not found</div>;

  const related = blogPosts.filter((p) => p.id !== postId).slice(0, 3);

  return (
    <div className="bg-white">
      <Navbar isLight={false} forceTransparent={false} />

      {/* Hero */}
      <div className="relative h-[65vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80" />
        <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-16">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-white/50 hover:text-white text-xs tracking-[0.2em] uppercase mb-6 transition-colors w-fit"
          >
            <ArrowLeft size={12} />
            All Stories
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-amber-500 text-black text-xs tracking-[0.2em] uppercase px-3 py-1 font-medium">
              {post.category}
            </span>
            <span className="text-white/50 text-xs tracking-wide flex items-center gap-1">
              <Clock size={11} />
              {post.readTime}
            </span>
          </div>
          <h1
            className="text-4xl lg:text-6xl text-white font-light leading-tight max-w-4xl"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {post.title}
          </h1>
          <p className="text-white/50 text-sm mt-4">{post.date}</p>
        </div>
      </div>

      {/* Article content */}
      <article className="py-16 px-6 lg:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Lead paragraph */}
          <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
            {post.excerpt}
          </p>

          <div className="w-16 h-px bg-amber-500 mb-8" />

          {/* Simulated article body */}
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>
              The early morning air in the forest carries a stillness that city dwellers rarely experience. It is in this silence that wildlife reveals itself — gradually, on its own terms, to those patient enough to wait. I have spent more hours than I can count in a hide, or flat on the ground, or perched in a tree, waiting for that alignment of subject, light and moment.
            </p>
            <p>
              This particular expedition began with a phone call from a local naturalist contact who had spotted fresh tracks. The signs were unmistakable — the gait, the depth of the impression, the claw marks. A large individual had passed through the night before, moving east towards the water source. We set up at first light, and waited.
            </p>
            <blockquote className="border-l-4 border-amber-400 pl-6 py-2 my-8">
              <p className="text-gray-700 text-xl font-light italic" style={{ fontFamily: "Playfair Display, serif" }}>
                "The camera is only as powerful as the patience behind it. You cannot rush a wild animal. You can only earn its indifference."
              </p>
            </blockquote>
            <p>
              Three hours passed. The forest changed around us — birds began their morning chorus, a troop of langurs worked their way through the canopy overhead, and the light shifted from cool blue to warm gold as the sun cleared the treeline. Still we waited.
            </p>
            <p>
              And then, without announcement, it appeared. Moving with the quiet confidence of an animal that knows it has no predator, it paused at the edge of the clearing. I had perhaps thirty seconds. In that time, everything I had learned across fifteen years of fieldwork — patience, stillness, breath control, technical instinct — came together in a handful of frames.
            </p>
            <p>
              This is why wildlife photography matters. Not for the image itself, but for the encounter. The image is simply proof that the encounter happened — and an invitation for others to care about a world they may never see directly.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-6">
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs tracking-wide px-4 py-2">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Author bio strip */}
      <div className="border-t border-gray-100 py-10 px-6 lg:px-20">
        <div className="max-w-3xl mx-auto flex items-center gap-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
            <span className="text-amber-600 font-bold text-lg">KC</span>
          </div>
          <div>
            <p className="text-gray-900 font-medium text-sm" style={{ fontFamily: "Playfair Display, serif" }}>Koushik Chatterjee</p>
            <p className="text-gray-400 text-xs tracking-wide mt-0.5">Wildlife Photographer · Conservation Advocate · 15+ years in the field</p>
          </div>
        </div>
      </div>

      {/* Related posts */}
      <section className="py-16 px-6 lg:px-10 bg-[#f8f7f4]">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-8 font-light">More Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link key={p.id} to={`/blog/${p.id}`} className="group">
                <div className="relative overflow-hidden aspect-video mb-4">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="text-gray-400 text-xs tracking-wide mb-1">{p.date}</p>
                <h4 className="text-gray-900 font-medium text-lg group-hover:text-amber-600 transition-colors" style={{ fontFamily: "Playfair Display, serif" }}>
                  {p.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Blog() {
  const { postId } = useParams();
  const [activeCategory, setActiveCategory] = useState("All");

  if (postId) return <BlogPost postId={postId} />;

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white">
      <Navbar isLight={false} forceTransparent={false} />

      {/* Hero */}
      <div className="pt-32 pb-16 px-6 text-center bg-[#f8f7f4]">
        <p className="text-amber-500 text-xs tracking-[0.5em] uppercase mb-4 font-light">Field Notes & Stories</p>
        <h1 className="text-5xl lg:text-7xl text-gray-900 font-light" style={{ fontFamily: "Playfair Display, serif" }}>
          The Blog
        </h1>
        <div className="w-16 h-px bg-amber-500 mx-auto mt-8" />
        <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto mt-8">
          Stories, reflections, field notes and conservation dispatches from a life spent among wild creatures.
        </p>
      </div>

      {/* Categories */}
      <div className="py-8 px-6 bg-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center gap-3">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 text-xs tracking-[0.2em] uppercase border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gray-900 border-gray-900 text-white"
                  : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog list */}
      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-screen-xl mx-auto">
          {/* Featured post */}
          <Link to={`/blog/${filtered[0]?.id}`} className="group block mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden h-80 lg:h-[500px]">
                <img
                  src={filtered[0]?.image}
                  alt={filtered[0]?.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-500 text-black text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="bg-[#f8f7f4] p-10 lg:p-16 flex flex-col justify-center">
                <span className="text-amber-500 text-[10px] tracking-[0.3em] uppercase mb-3">{filtered[0]?.category}</span>
                <h2 className="text-3xl lg:text-4xl text-gray-900 font-light leading-snug mb-6 group-hover:text-amber-600 transition-colors" style={{ fontFamily: "Playfair Display, serif" }}>
                  {filtered[0]?.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">{filtered[0]?.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs tracking-wide">{filtered[0]?.date} · {filtered[0]?.readTime}</span>
                  <span className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-700 group-hover:text-amber-500 transition-colors">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.slice(1).map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group">
                <div className="relative overflow-hidden aspect-video mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500/90 text-black text-[10px] tracking-[0.2em] uppercase px-3 py-1">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
                  <Clock size={11} />
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-gray-900 text-xl font-medium leading-snug mb-3 group-hover:text-amber-600 transition-colors duration-300" style={{ fontFamily: "Playfair Display, serif" }}>
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
