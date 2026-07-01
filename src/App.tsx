import { useState } from "react";
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
import Navbar from "./components/Navbar";
import BackgroundMusic from "./components/BackgroundMusic";

export default function App() {
  const [isNavLight, setIsNavLight] = useState(false);

  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar isLight={isNavLight} />
      <BackgroundMusic 
        src="https://cdn.pixabay.com/download/audio/2022/03/24/audio_5e2f3d6d02.mp3?filename=relaxing-mountains-rivers-streams-birds-song-nature-sounds-8050.mp3" 
        initialVolume={0.25} 
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              onSlideChange={(_, isLight) => setIsNavLight(isLight)} 
            />
          } 
        />
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
