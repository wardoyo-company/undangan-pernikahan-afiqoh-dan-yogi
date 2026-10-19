import { useEffect, useState } from "react";

import { wedding } from "@/lib/wedding";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    hari: Math.floor(ms / 86400000),
    jam: Math.floor((ms / 3600000) % 24),
    menit: Math.floor((ms / 60000) % 60),
    detik: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const target = new Date(wedding.dateISO).getTime();
  const [time, setTime] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });

  useEffect(() => {
    setTime(diff(target));
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="mx-auto grid max-w-md grid-cols-4 gap-3">
      {Object.entries(time).map(([label, value]) => (
        <div
          key={label}
          className="rounded-xl border border-border/70 bg-card/70 px-2 py-4 text-center shadow-sm backdrop-blur"
        >
          <div className="font-display text-2xl text-primary sm:text-3xl">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
