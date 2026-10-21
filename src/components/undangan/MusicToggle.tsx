import { useCallback, useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

type MusicTrack = "A" | "B" | "C";

/** Musik latar mulai diputar setelah tamu membuka undangan. */
export function MusicToggle({ start, track }: { start: boolean; track: MusicTrack }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<{ track: MusicTrack; audio: HTMLAudioElement } | null>(null);

  const stop = useCallback(() => {
    audioRef.current?.audio.pause();
    setPlaying(false);
  }, []);

  const play = useCallback(async () => {
    let current = audioRef.current;
    if (!current || current.track !== track) {
      current?.audio.pause();
      current = {
        track,
        audio: new Audio(`${import.meta.env.BASE_URL}${track}.mp3`),
      };
      audioRef.current = current;
    }
    const { audio } = current;
    audio.loop = true;
    audio.volume = 0.65;

    try {
      await audio.play();
      if (audioRef.current === current) setPlaying(!audio.paused);
    } catch (error) {
      console.error(`Tidak dapat memutar lagu ${track}:`, error);
      if (audioRef.current === current) setPlaying(false);
    }
  }, [track]);

  useEffect(() => {
    if (start) void play();
    return () => {
      audioRef.current?.audio.pause();
      audioRef.current = null;
      setPlaying(false);
    };
  }, [play, start]);

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
