import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Musik latar mulai diputar setelah tamu membuka undangan. */
export function MusicToggle({ start }: { start: boolean }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const play = async () => {
    const audio = audioRef.current ?? new Audio(`${import.meta.env.BASE_URL}Wedding.mp3`);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0.65;

    try {
      await audio.play();
      setPlaying(!audio.paused);
    } catch (error) {
      console.error("Tidak dapat memutar musik undangan:", error);
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (start) void play();
    return stop;
  }, [start]);

  if (!start) return null;

  return (
    <Button
      type="button"
      aria-label={playing ? "Hentikan musik" : "Putar musik"}
      title={playing ? "Hentikan musik" : "Putar musik"}
      onClick={() => (playing ? stop() : void play())}
      className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-card/90 text-primary shadow-lg backdrop-blur transition hover:bg-card"
    >
      {playing ? (
        <Pause className="h-5 w-5" />
      ) : (
        <Music className="h-5 w-5 animate-[spin_6s_linear_infinite]" />
      )}
    </Button>
  );
}
