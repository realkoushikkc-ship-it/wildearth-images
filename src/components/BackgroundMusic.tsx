import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface BackgroundMusicProps {
  initialVolume?: number;
}

export default function BackgroundMusic({ initialVolume = 0.2 }: BackgroundMusicProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Create rich ambient synth drone
  const startAmbient = useCallback(() => {
    if (audioContextRef.current) return;

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = ctx;

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.value = isMuted ? 0 : volume * 0.3;
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Ambient chord: D minor 9 add 11 - very cinematic, open, nature-like
    // Frequencies: D2(73.42), A2(110), D3(146.83), F3(174.61), A3(220), E4(329.63)
    const freqs = [73.42, 110, 146.83, 174.61, 220, 329.63];
    const types: OscillatorType[] = ["sine", "sine", "triangle", "sine", "sine", "triangle"];
    const gains = [0.25, 0.2, 0.15, 0.12, 0.1, 0.08];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = types[i];
      // Slight detune for warmth
      osc.detune.value = (Math.random() - 0.5) * 10;
      osc.frequency.value = freq;

      const oscGain = ctx.createGain();
      oscGain.gain.value = gains[i];

      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      oscillatorsRef.current.push(osc);
    });

    // Subtle LFO for movement (breathing effect)
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.1; // Very slow
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain);
    lfoGain.connect(masterGain.gain);
    lfo.start();
    lfoRef.current = lfo;
    lfoGainRef.current = lfoGain;

    setIsPlaying(true);
  }, [isMuted, volume]);

  const stopAmbient = useCallback(() => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    oscillatorsRef.current = [];

    if (lfoRef.current) {
      try {
        lfoRef.current.stop();
        lfoRef.current.disconnect();
      } catch {}
      lfoRef.current = null;
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {}
      audioContextRef.current = null;
    }
    gainNodeRef.current = null;
    lfoGainRef.current = null;
    setIsPlaying(false);
  }, []);

  // Auto-start on first interaction
  const tryAutoPlay = useCallback(() => {
    if (hasInteracted) return;
    setHasInteracted(true);
    startAmbient();
  }, [hasInteracted, startAmbient]);

  useEffect(() => {
    const events = ["click", "scroll", "touchstart", "keydown"];
    const handler = () => tryAutoPlay();
    events.forEach((e) => document.addEventListener(e, handler, { once: true }));
    return () => events.forEach((e) => document.removeEventListener(e, handler));
  }, [tryAutoPlay]);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : volume * 0.3;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (isPlaying) {
      stopAmbient();
    } else {
      startAmbient();
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newMuted ? 0 : volume * 0.3;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

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
