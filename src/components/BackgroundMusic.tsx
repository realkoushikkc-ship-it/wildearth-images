import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface BackgroundMusicProps {
  src: string;
  initialVolume?: number;
}

export default function BackgroundMusic({ src, initialVolume = 0.25 }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleUserInteraction = useCallback(() => {
    if (!userInteracted && audioRef.current) {
      setUserInteracted(true);
      setShowTooltip(false);
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [userInteracted]);

  useEffect(() => {
    const events = ["click", "touchstart", "keydown"];
    const handler = () => handleUserInteraction();
    events.forEach((e) => window.addEventListener(e, handler, { once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, handler));
  }, [handleUserInteraction]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setUserInteracted(true);
        setShowTooltip(false);
      }).catch(() => {});
    }
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) setIsMuted(false);
  };

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3">
        {showTooltip && !userInteracted && (
          <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap animate-fadeInUp">
            Click to play ambient music
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </div>
        )}
        <div className="group flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-gray-200/50 transition-all duration-300 hover:shadow-xl">
            <button
              onClick={togglePlay}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isPlaying ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-600"
              }`}
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              <Music size={14} className={isPlaying ? "animate-pulse" : ""} />
            </button>
            <button
              onClick={toggleMute}
              className={`text-gray-500 hover:text-amber-500 transition-colors duration-200 ${isMuted ? "text-gray-300" : ""}`}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <div className="w-0 overflow-hidden group-hover:w-20 transition-all duration-300">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
        </div>
      </div>
      {isPlaying && (
        <div className="fixed top-0 left-0 right-0 h-px z-[60]">
          <div className="h-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent animate-pulse" />
        </div>
      )}
    </>
  );
}
