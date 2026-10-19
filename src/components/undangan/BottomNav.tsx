import { useEffect, useState } from "react";
import { BookOpen, CalendarDays, Gift, Heart, Images, MapPin, MessageCircle, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

const sections = [
  { id: "mempelai", label: "Mempelai", icon: Users },
  { id: "tanggal", label: "Tanggal", icon: CalendarDays },
  { id: "acara", label: "Acara", icon: MapPin },
  { id: "cerita", label: "Our Story", icon: BookOpen },
  { id: "galeri", label: "Galeri", icon: Images },
  { id: "hadiah", label: "Hadiah", icon: Gift },
  { id: "rsvp", label: "RSVP", icon: MessageCircle },
  { id: "penutup", label: "Penutup", icon: Heart },
];

export function BottomNav() {
  const [active, setActive] = useState("mempelai");

  useEffect(() => {
    const update = () => {
      const marker = window.innerHeight * 0.35;
      let current = sections[0]?.id ?? "mempelai";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= marker) current = section.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "penutup";
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    document.getElementById(`nav-${active}`)?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  return (
    <nav aria-label="Navigasi bagian undangan" className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center overflow-x-auto overscroll-x-contain px-2 py-2">
        {sections.map(({ id, label, icon: Icon }) => (
          <Button key={id} id={`nav-${id}`} variant="ghost" aria-label={`Ke bagian ${label}`} aria-current={active === id ? "location" : undefined} title={label}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" })}
            className={`h-14 w-16 shrink-0 flex-col gap-1 rounded-lg hover:bg-secondary hover:text-primary ${active === id ? "bg-secondary text-primary" : "text-muted-foreground"}`}>
            <Icon aria-hidden="true" /><span className="text-[10px]">{label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}