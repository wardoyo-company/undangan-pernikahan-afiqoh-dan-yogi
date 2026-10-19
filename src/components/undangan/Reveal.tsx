import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-1000 ease-out",
        shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[2px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-accent", className)}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent" />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2c1.2 4 3.5 6.3 7.5 7.5-4 1.2-6.3 3.5-7.5 7.5-1.2-4-3.5-6.3-7.5-7.5C8.5 8.3 10.8 6 12 2Z"
          fill="currentColor"
          opacity="0.8"
        />
        <circle cx="12" cy="20" r="1.6" fill="currentColor" opacity="0.6" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent" />
    </div>
  );
}

export function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="text-center">
      {kicker ? (
        <p className="text-[0.7rem] uppercase tracking-[0.35em] text-muted-foreground">{kicker}</p>
      ) : null}
      <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">{title}</h2>
      <Ornament className="mt-4" />
    </div>
  );
}
