const FLAKES = Array.from({ length: 40 }, (_, i) => {
  const r = (n: number) => ((Math.sin((i + 1) * n) + 1) / 2);
  return {
    left: r(12.9898) * 100,
    size: 3 + r(78.233) * 6,
    duration: 9 + r(43.7585) * 12,
    delay: -r(93.9898) * 20,
    opacity: 0.35 + r(28.633) * 0.5,
    drift: (r(19.19) - 0.5) * 80,
    sway: 6 + r(7.77) * 18,
  };
});

export function Snowfall() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {FLAKES.map((f, i) => (
        <span
          key={i}
          className="absolute top-0 block rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            animation: `snow-fall ${f.duration}s linear ${f.delay}s infinite, snow-sway ${(f.duration / 3).toFixed(2)}s ease-in-out ${f.delay}s infinite`,
            ["--snow-opacity" as string]: f.opacity,
            ["--snow-drift" as string]: `${f.drift}px`,
            ["--snow-sway" as string]: `${f.sway}px`,
          }}
        />
      ))}
    </div>
  );
}
