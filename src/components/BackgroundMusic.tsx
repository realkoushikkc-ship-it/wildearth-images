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
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Initialize audio
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = initialVolume;
    audio.preload = "auto";

    audio.addEventListener("error", () => {
      setHasError(true);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src, initialVolume]);

  // Auto-play on first user interaction
  const tryAutoPlay = useCallback(() => {
    if (hasInteracted || !audioRef.current || hasError) return;

    setHasInteracted(true);
    audioRef.current.volume = isMuted ? 0 : volume;

    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [hasInteracted, hasError, isMuted, volume]);

  useEffect(() => {
    const events = ["click", "scroll", "touchstart", "keydown"];
    const handler = () => tryAutoPlay();

    events.forEach((e) => document.addEventListener(e, handler, { once: true }));
    return () => events.forEach((e) => document.removeEventListener(e, handler));
  }, [tryAutoPlay]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.volume = newMuted ? 0 : volume;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  if (hasError) {
    return (
      <div className="fixed bottom-6 right-6 z-[60]">
        <div className="bg-red-500/90 text-white text-[10px] px-3 py-2 rounded-full shadow-lg">
          Audio unavailable
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-gray-200/50">
        <button
          onClick={togglePlay}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isPlaying
              ? "bg-amber-500 text-white"
              : "bg-gray-100 text-gray-500 hover:bg-amber-100 hover:text-amber-600"
          }`}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <div className="flex gap-[2px]">
              <div className="w-[2px] h-2.5 bg-white animate-pulse" />
              <div className="w-[2px] h-2.5 bg-white animate-pulse" style={{ animationDelay: "0.15s" }} />
              <div className="w-[2px] h-2.5 bg-white animate-pulse" style={{ animationDelay: "0.3s" }} />
            </div>
          ) : (
            <Music size={13} />
          )}
        </button>

        <button
          onClick={toggleMute}
          className={`text-gray-400 hover:text-amber-500 transition-colors ${isMuted ? "text-gray-300" : ""}`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-amber-500"
        />
      </div>
    </div>
  );
}
