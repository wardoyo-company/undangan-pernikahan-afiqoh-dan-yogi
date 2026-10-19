import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import galleryPhotoOne from "@/assets/g-1.png";
import galleryPhotoTwo from "@/assets/g-2.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Reveal, SectionTitle } from "./Reveal";

const photos = [galleryPhotoOne, galleryPhotoTwo];

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const move = (direction: number) => {
    setSelected((current) => current === null ? null : (current + direction + photos.length) % photos.length);
  };

  return (
    <section id="galeri" className="pt-24">
      <Reveal><SectionTitle kicker="Momen Kami" title="Galeri" /></Reveal>
      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo, i) => (
            <Reveal key={photo} delay={i * 80} className="aspect-[9/16]">
              <Button type="button" variant="ghost" onClick={() => setSelected(i)} aria-label={`Lihat foto ${i + 1}`} className="block h-full w-full overflow-hidden rounded-lg p-0 hover:bg-transparent">
                <img src={photo} alt={`Foto prewedding ${i + 1}`} loading="lazy" width={1024} height={768} className="h-full w-full object-cover shadow-sm transition duration-700 motion-safe:hover:scale-[1.02]" />
              </Button>
            </Reveal>
          ))}
        </div>
        <DialogPortal>
          <DialogOverlay className="bg-foreground/90" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col gap-3 rounded-lg bg-background p-3 pt-12 shadow-xl outline-none"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") move(-1);
              if (event.key === "ArrowRight") move(1);
            }}
          >
            <DialogTitle className="sr-only">Galeri Afiqoh &amp; Yogi</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label="Tutup foto" title="Tutup foto" className="absolute right-2 top-2"><X /></Button>
            </DialogClose>
            {selected !== null ? <img
              src={photos[selected]} alt={`Foto prewedding ${selected + 1}`}
              className="min-h-0 w-full flex-1 object-contain max-h-[calc(100dvh-10rem)]"
              onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
              onTouchEnd={(event) => {
                const end = event.changedTouches[0]?.clientX;
                if (touchStart !== null && end !== undefined && Math.abs(end - touchStart) > 50) move(end < touchStart ? 1 : -1);
                setTouchStart(null);
              }}
            /> : null}
            <div className="flex shrink-0 items-center justify-center gap-5">
              <Button variant="ghost" size="icon" aria-label="Foto sebelumnya" title="Foto sebelumnya" onClick={() => move(-1)}><ChevronLeft /></Button>
              <p className="text-sm tabular-nums text-muted-foreground" aria-live="polite">{(selected ?? 0) + 1} / {photos.length}</p>
              <Button variant="ghost" size="icon" aria-label="Foto berikutnya" title="Foto berikutnya" onClick={() => move(1)}><ChevronRight /></Button>
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </section>
  );
}