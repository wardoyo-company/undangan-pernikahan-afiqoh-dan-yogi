import floral from "@/assets/floral-corner-green.png";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const placement: Record<Corner, string> = {
  "top-left": "-left-7 top-0",
  "top-right": "-right-5 top-0 scale-x-[-1]",
  "bottom-left": "bottom-0 -left-7 rotate-180 scale-x-[-1]",
  "bottom-right": "bottom-0 -right-5 rotate-180",
};

const lowerPlacement: Partial<Record<Corner, string>> = {
  "top-left": "-left-7 top-3",
  "top-right": "-right-5 top-3 scale-x-[-1]",
};

export function FloralDecor({
  corner,
  className = "",
  size = "w-32",
  opacity = "opacity-45",
  lower = false,
}: {
  corner: Corner;
  className?: string;
  size?: string;
  opacity?: string;
  lower?: boolean;
}) {
  const topCorner = corner === "top-left" || corner === "top-right";
  const imagePlacement = lower ? (lowerPlacement[corner] ?? placement[corner]) : placement[corner];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative my-0 ${
        lower && topCorner ? "h-28" : topCorner ? "h-24" : "h-32"
      } ${className}`}
    >
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className={`pointer-events-none absolute z-0 max-h-32 max-w-32 object-contain ${imagePlacement} ${size} ${opacity}`}
      />
    </div>
  );
}
