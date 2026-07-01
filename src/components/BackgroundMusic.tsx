import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX, Music, Play } from "lucide-react";

interface BackgroundMusicProps {
  src: string;
  initialVolume?: number;
}

export default function BackgroundMusic({ src, initialVolume = 0.3 }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [showPrompt, setShowPrompt] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Initialize audio once on mount
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";

    audio.addEventListener("canplaythrough", () => {
      console.log("Audio loaded and ready to play");
    });

    audio.addEventListener("error", (e) => {
      console.error("Audio error:", e);
      setHasError(true);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src]);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Try to play on first user click anywhere on the page
  const tryPlay = useCallback(async () => {
    if (!audioRef.current || isPlaying) return;

    try {
      audioRef.current.volume = isMuted ? 0 : volume;
      await audioRef.current.play();
      setIsPlaying(true);
      setShowPrompt(false);
      console.log("Music started playing");
    } catch (err) {
      console.log("Autoplay blocked, waiting for explicit click on button");
    }
  }, [isPlaying, isMuted, volume]);

  // Listen for ANY click on the page to try autoplay
  useEffect(() => {
    const handleClick = () => {
      if (!isPlaying && audioRef.current) {
        tryPlay();
      }
    };

    document.addEventListener("click", handleClick, { once: true });
    return () => document.removeEventListener("click", handleClick);
  }, [tryPlay, isPlaying]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        audioRef.current.volume = isMuted ? 0 : volume;
        await audioRef.current.play();
        setIsPlaying(true);
        setShowPrompt(false);
      } catch (err) {
        console.error("Failed to play:", err);
        setHasError(true);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (audioRef.current) {
        audioRef.current.volume = newMuted ? 0 : volume;
      }
      return newMuted;
    });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = newVolume;
    }
  };

  // Hide prompt after 8 seconds
  useEffect(() => {
    if (showPrompt && !isPlaying) {
      const timer = setTimeout(() => setShowPrompt(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showPrompt, isPlaying]);

  if (hasError) {
    return (
      <div className="fixed bottom-6 right-6 z-[60]">
        <div className="bg-red-500 text-white text-xs px-3 py-2 rounded-full shadow-lg">
          Audio Error
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Click anywhere prompt */}
      {showPrompt && !isPlaying && (
        <div 
          className="fixed inset-0 z-[55] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-500"
          onClick={() => {
            tryPlay();
            setShowPrompt(false);
          }}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl px-8 py-6 shadow-2xl text-center max-w-sm mx-4 animate-fadeInUp">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music size={28} className="text-amber-600" />
            </div>
            <h3 className="text-gray-900 font-medium text-lg mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
              Ambient Experience
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Click anywhere to begin your immersive wildlife journey with ambient sound.
            </p>
            <button className="bg-amber-500 text-white px-6 py-2 rounded-full text-sm tracking-wide hover:bg-amber-600 transition-colors">
              Click to Start
            </button>
          </div>
        </div>
      )}

      {/* Floating Player */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full px-4 py-2.5 shadow-lg border border-gray-200/50">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isPlaying
                ? "bg-amber-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-600"
            }`}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <div className="flex gap-0.5">
                <div className="w-0.5 h-3 bg-white animate-pulse" />
                <div className="w-0.5 h-3 bg-white animate-pulse" style={{ animationDelay: "0.2s" }} />
                <div className="w-0.5 h-3 bg-white animate-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
            ) : (
              <Play size={14} fill="currentColor" />
            )}
          </button>

          {/* Mute */}
          <button
            onClick={toggleMute}
            className={`text-gray-500 hover:text-amber-500 transition-colors ${isMuted ? "text-gray-300" : ""}`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Volume Slider */}
          <div className="w-16">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: "#f59e0b" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
