// The Orion logo as a vector, so it stays sharp at any size.
export const STAR_PATH =
  "M0 -100 Q18 -18 100 0 Q18 18 0 100 Q-18 18 -100 0 Q-18 -18 0 -100 Z";

export default function Logo({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-100 -100 200 200"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d={STAR_PATH} />
    </svg>
  );
}
