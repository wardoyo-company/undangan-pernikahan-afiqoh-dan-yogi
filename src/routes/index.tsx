import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus, Check, Copy, MapPin, MailOpen } from "lucide-react";

import coverBg from "@/assets/cover-bg-green.jpg";
import floral from "@/assets/floral-corner-green.png";
import groomImg from "@/assets/groom.jpeg";
import brideImg from "@/assets/bride.jpeg";
import { Gallery } from "@/components/undangan/Gallery";
import { Countdown } from "@/components/undangan/Countdown";
import { FloralDecor } from "@/components/undangan/FloralDecor";
import { Snowfall } from "@/components/undangan/Snowfall";
import { MusicToggle } from "@/components/undangan/MusicToggle";
import { Ornament, Reveal, SectionTitle } from "@/components/undangan/Reveal";
import { WishesSection } from "@/components/undangan/WishesSection";
import { BottomNav } from "@/components/undangan/BottomNav";
import { Button } from "@/components/ui/button";
import { buildIcsHref, wedding } from "@/lib/wedding";

const title = `Undangan Pernikahan ${wedding.bride.nick} & ${wedding.groom.nick}`;
const description = `Dengan memohon rahmat Allah, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di pernikahan kami pada ${wedding.dateLabel}.`;

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { kpd?: string } =>
    typeof search['kpd'] === "string" ? { kpd: search['kpd'] as string } : {},
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Undangan,
});

function Undangan() {
  const { kpd } = Route.useSearch();
  const guestName = (kpd ?? "").trim() || "Tamu Undangan";
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background paper-texture">
      <img
        src={coverBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1536}
        className="pointer-events-none fixed inset-0 h-full w-full object-cover opacity-40"
      />
      <Cover guestName={guestName} opened={opened} onOpen={() => setOpened(true)} />
      {opened ? <Snowfall /> : null}
      <MusicToggle start={opened} />
      {opened ? <BottomNav /> : null}

      <main className="relative z-10 mx-auto max-w-3xl px-5 pb-[calc(7rem+env(safe-area-inset-bottom))]" inert={!opened}>
        <FloralDecor corner="top-right" />
        <div className="relative">
          <Quote />
          <Couple />
        </div>
        <div className="relative">
          <FloralDecor corner="top-left" size="w-[40vw] max-w-[180px]" lower />
          <CountdownSection />
          <Events />
        </div>
        <div className="relative">
          <Story />
          <FloralDecor corner="bottom-right" />
        </div>
        <Gallery />
        <div className="relative">
          <FloralDecor corner="top-left" size="w-[40vw] max-w-[180px]" />
          <GiftSection />
        </div>

        <section id="rsvp" className="relative pt-20">
          <Reveal>
            <SectionTitle kicker="RSVP" title="Ucapan & Konfirmasi" />
            <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
              Mohon konfirmasi kehadiran Anda dan kirimkan doa terbaik untuk kami.
            </p>
          </Reveal>
          <WishesSection guestName={guestName} />
          <FloralDecor corner="bottom-left" />
        </section>

        <section id="penutup">
        <Reveal className="pt-24 text-center">
          <Ornament />
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
            berkenan hadir untuk memberikan doa restu.
          </p>
          <p className="mt-6 font-display text-4xl text-primary">
            {wedding.bride.nick} &amp; {wedding.groom.nick}
          </p>
        </Reveal>
        </section>
      </main>
    </div>
  );
}

function Cover({
  guestName,
  opened,
  onOpen,
}: {
  guestName: string;
  opened: boolean;
  onOpen: () => void;
}) {
  return (
    <div
      inert={opened}
      className={`fixed inset-0 z-40 overflow-hidden transition-all duration-1000 ${
        opened ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <img
        src={coverBg}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1536}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <img
        src={floral}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -right-8 -top-10 w-[40vw] max-w-[220px] scale-x-[-1] opacity-95"
      />
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -bottom-10 -left-8 w-[40vw] max-w-[220px] rotate-180 scale-x-[-1] opacity-95"
      />

      <div className="relative flex h-full flex-col items-center justify-center px-7 text-center text-cover-ink">
        <p className="font-sans text-[0.72rem] uppercase tracking-[0.35em] text-cover-ink-soft">
          The Wedding Of
        </p>

        <h1 className="mt-4 font-script text-[2.6rem] leading-[1.15] text-cover-ink sm:text-[4.25rem]">
          {wedding.bride.nick}
          <span className="mx-2 text-[0.75em]">&amp;</span>
          {wedding.groom.nick}
        </h1>

        <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-cover-ink-soft">
          Tanpa Mengurangi Rasa Hormat, Kami Mengundang Bapak/Ibu/Saudara/i untuk Hadir di Acara
          Kami.
        </p>

        <div className="mt-12">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-cover-ink-soft">Kepada :</p>
          <p className="mt-2 font-script text-[clamp(1.6rem,7vw,2.25rem)] leading-tight text-cover-ink">
            {guestName}
          </p>
        </div>

        <Button
          type="button"
          onClick={onOpen}
          className="mt-7 h-auto gap-2 rounded-lg bg-cover-ink px-6 py-3 text-sm font-medium tracking-wide text-background shadow-lg transition active:scale-[0.98] sm:hover:scale-[1.03] hover:bg-cover-ink/90"
        >
          <MailOpen className="h-4 w-4" />
          Buka Undangan
        </Button>
      </div>
    </div>
  );
}

function Quote() {
  return (
    <section id="ayat">
    <Reveal className="pt-8 text-center">
      <Ornament />
      <p lang="ar" dir="rtl" className="font-arabic mx-auto mt-8 max-w-xl text-2xl leading-[2.2] text-primary sm:text-3xl">
        {wedding.quote.arabic}
      </p>
      <p className="mx-auto mt-6 max-w-xl font-display text-xl italic leading-relaxed text-foreground/90 sm:text-2xl">
        &ldquo;{wedding.quote.text}&rdquo;
      </p>
      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {wedding.quote.source}
      </p>
    </Reveal>
    </section>
  );
}

function Person({
  img,
  full,
  parents,
  delay,
}: {
  img: string;
  full: string;
  parents: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="text-center">
      <div className="rounded-2xl border border-border/50 bg-card/60 p-5 shadow-sm backdrop-blur-sm">
        <div className="relative mx-auto h-48 w-48 text-accent">
          <div className="absolute inset-[14px] overflow-hidden rounded-full border-4 border-card shadow-lg">
            <img
              src={img}
              alt={full}
              loading="lazy"
              width={800}
              height={1008}
              className="h-full w-full object-cover"
            />
          </div>
          <svg
            aria-hidden="true"
            viewBox="0 0 192 192"
            fill="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <circle cx="96" cy="96" r="92" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="96" cy="96" r="85" stroke="currentColor" strokeOpacity=".45" />
            <path
              d="M96 3 101 8 96 13 91 8 96 3ZM96 179 101 184 96 189 91 184 96 179ZM3 96 8 91 13 96 8 101 3 96ZM179 96 184 91 189 96 184 101 179 96Z"
              fill="currentColor"
            />
            <g
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.2"
            >
              <path d="M96 21V10M96 16C89 15 88 11 87 8c6 0 9 2 9 7M96 16c7-1 8-5 9-8-6 0-9 2-9 7" />
              <path
                d="M96 21V10M96 16C89 15 88 11 87 8c6 0 9 2 9 7M96 16c7-1 8-5 9-8-6 0-9 2-9 7"
                transform="rotate(90 96 96)"
              />
              <path
                d="M96 21V10M96 16C89 15 88 11 87 8c6 0 9 2 9 7M96 16c7-1 8-5 9-8-6 0-9 2-9 7"
                transform="rotate(180 96 96)"
              />
              <path
                d="M96 21V10M96 16C89 15 88 11 87 8c6 0 9 2 9 7M96 16c7-1 8-5 9-8-6 0-9 2-9 7"
                transform="rotate(270 96 96)"
              />
            </g>
          </svg>
        </div>
        <div className="mt-5">
          <h3 className="font-display text-3xl text-primary">{full}</h3>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {parents}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function Couple() {
  return (
    <section id="mempelai" className="pt-24">
      <Reveal>
        <p lang="ar" dir="rtl" className="font-arabic text-center text-3xl leading-loose text-primary">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p className="mx-auto mb-8 mt-4 max-w-lg text-center text-sm leading-relaxed text-muted-foreground">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:
        </p>
        <SectionTitle title="Kedua Mempelai" />
      </Reveal>
      <div className="mt-12 grid gap-14 sm:grid-cols-2">
        <Person
          img={brideImg}
          full={wedding.bride.full}
          parents={wedding.bride.parents}
          delay={0}
        />
        <Person
          img={groomImg}
          full={wedding.groom.full}
          parents={wedding.groom.parents}
          delay={150}
        />
      </div>
    </section>
  );
}

function CountdownSection() {
  return (
    <section id="tanggal" className="pt-8">
      <Reveal>
        <SectionTitle kicker="Menuju Hari Bahagia" title="Hitung Mundur" />
        <div className="mt-8">
          <Countdown />
        </div>
        <div className="mt-8 text-center">
          <a
            href={buildIcsHref()}
            download="undangan-pernikahan.ics"
            className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-card px-6 py-3 text-sm text-primary transition hover:bg-accent/10"
          >
            <CalendarPlus className="h-4 w-4" />
            Simpan Tanggal
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Events() {
  return (
    <section id="acara" className="pt-24">
      <Reveal>
        <SectionTitle kicker="Save The Date" title="Waktu & Tempat" />
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {wedding.events.map((event, i) => (
          <Reveal key={event.name} delay={i * 120}>
            <div className="h-full rounded-2xl border border-border/70 bg-card/70 p-6 text-center shadow-sm backdrop-blur">
              <h3 className="font-display text-2xl text-primary">{event.name}</h3>
              <Ornament className="mt-3" />
              <p className="mt-4 text-sm text-foreground">{event.date}</p>
              <p className="text-sm text-muted-foreground">{event.time}</p>
              <p className="mt-4 font-display text-xl text-foreground">{event.venue}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{event.address}</p>
              <a
                href={event.maps}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition hover:opacity-90"
              >
                <MapPin className="h-4 w-4" /> Lihat Lokasi
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="cerita" className="pt-24">
      <Reveal>
        <SectionTitle kicker="Perjalanan Kami" title="Our Story" />
      </Reveal>
      <div className="relative mt-12 pl-8 sm:pl-0">
        <span className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-accent/40 sm:left-1/2" />
        {wedding.story.map((item, i) => (
          <Reveal key={item.title} delay={i * 120} className="relative pb-12 last:pb-0">
            <span className="absolute -left-8 top-2 h-4 w-4 rounded-full border-2 border-accent bg-background sm:left-1/2 sm:-translate-x-1/2" />
            <div
              className={`sm:w-1/2 ${i % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:ml-auto sm:pl-10"}`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-accent">{item.year}</p>
              <h3 className="mt-2 font-display text-2xl text-primary">
                {i + 1}. {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function GiftSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section id="hadiah" className="pt-8">
      <Reveal>
        <SectionTitle kicker="Tanda Kasih" title="Amplop Digital" />
        <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-muted-foreground">
          Doa restu Anda sudah lebih dari cukup. Namun bila ingin memberi tanda kasih, dapat melalui
          cara berikut.
        </p>
      </Reveal>
      <div className="mt-10 space-y-4">
        {wedding.gifts.map((gift, i) => (
          <Reveal key={gift.number} delay={i * 120}>
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {gift.bank}
                </p>
                <p className="mt-1 font-display text-2xl tracking-wide text-foreground">
                  {gift.number}
                </p>
                <p className="text-sm text-muted-foreground">a.n. {gift.holder}</p>
              </div>
              <button
                type="button"
                onClick={() => copy(gift.number)}
                className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-4 py-2 text-sm text-primary transition hover:bg-accent/10"
              >
                {copied === gift.number ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied === gift.number ? "Tersalin" : "Salin"}
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
