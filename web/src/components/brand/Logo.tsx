import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  tone?: "default" | "light";
  withWordmark?: boolean;
  to?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = { sm: 28, md: 34, lg: 42 };

/**
 * Minimal compass icon logo — clean SVG, no external assets.
 * The icon color adapts to light/dark backgrounds via the tone prop.
 */
function CompassIcon({ size, light }: { size: number; light: boolean }) {
  const color = light ? "#ffffff" : "currentColor";
  const accent = light ? "#fbbf24" : "#b88a1e";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-500 group-hover:rotate-12"
    >
      {/* Outer ring */}
      <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="2.5" opacity="0.4" />
      <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="1.5" opacity="0.2" />

      {/* Cardinal tick marks */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const isCardinal = angle % 90 === 0;
        const radians = (angle - 90) * (Math.PI / 180);
        const inner = isCardinal ? 11 : 12.5;
        const outer = 16.5;
        const x1 = 20 + inner * Math.cos(radians);
        const y1 = 20 + inner * Math.sin(radians);
        const x2 = 20 + outer * Math.cos(radians);
        const y2 = 20 + outer * Math.sin(radians);
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={isCardinal ? 1.8 : 0.8}
            strokeLinecap="round"
            opacity={isCardinal ? 0.7 : 0.35}
          />
        );
      })}

      {/* Compass needle — north half (filled, pointing up) */}
      <path
        d="M20 4 L24 20 L20 18 L16 20 Z"
        fill={accent}
        stroke={accent}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Compass needle — south half (outlined, pointing down) */}
      <path
        d="M20 22 L24 20 L20 36 L16 20 Z"
        fill={color}
        stroke={color}
        strokeWidth="0.8"
        strokeLinejoin="round"
        opacity="0.5"
      />

      {/* Center dot */}
      <circle cx="20" cy="20" r="2" fill={color} />
    </svg>
  );
}

export function Logo({
  className,
  tone = "default",
  withWordmark = true,
  to = "/",
  size = "md",
}: LogoProps) {
  const isLight = tone === "light";
  const px = SIZE_MAP[size];

  return (
    <Link
      to={to}
      className={cn("group inline-flex items-center gap-2.5 shrink-0", className)}
      aria-label="Voyage AI home"
    >
      <CompassIcon size={px} light={isLight} />
      {withWordmark && (
        <span
          className={cn(
            "font-display text-lg font-semibold tracking-tight",
            isLight ? "text-white" : "text-foreground",
          )}
        >
          Voyage<span className="text-accent"> AI</span>
        </span>
      )}
    </Link>
  );
}
