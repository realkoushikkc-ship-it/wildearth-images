import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Prints from "./pages/Prints";
import Awards from "./pages/Awards";
import Exhibitions from "./pages/Exhibitions";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:categoryId" element={<Gallery />} />
        <Route path="/prints" element={<Prints />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </HashRouter>
  );
}
