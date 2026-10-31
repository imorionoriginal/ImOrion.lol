"use client";

import { useEffect, useRef, useState } from "react";
import { STAR_PATH } from "@/components/Logo";

type Point = { x: number; y: number };
type Geometry = { width: number; height: number; belt: Point[] };

// Orion's outer stars as fractions of the screen. The belt is not listed here:
// its three stars are the three buttons, measured from the page.
const STARS = [
  { name: "Betelgeuse", x: 0.22, y: 0.16, size: 15, color: "var(--betelgeuse)", labelBelow: false },
  { name: "Bellatrix", x: 0.76, y: 0.2, size: 10, color: "#ffffff", labelBelow: false },
  { name: "Saiph", x: 0.32, y: 0.87, size: 10, color: "#ffffff", labelBelow: true },
  { name: "Rigel", x: 0.8, y: 0.81, size: 15, color: "var(--rigel)", labelBelow: true },
];

// A fixed seed keeps the server and client render identical.
const DUST = (() => {
  let seed = 1453;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  return Array.from({ length: 64 }, (_, id) => ({
    id,
    x: +(random() * 100).toFixed(2),
    y: +(random() * 100).toFixed(2),
    radius: +(0.4 + random() * 0.6).toFixed(2),
    opacity: +(0.12 + random() * 0.4).toFixed(2),
    twinkle: random() > 0.84,
    delay: +(random() * 5).toFixed(2),
  }));
})();

export default function Constellation() {
  const ref = useRef<SVGSVGElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  useEffect(() => {
    const root = ref.current?.parentElement;
    if (!root) return;

    const measure = () => {
      const box = root.getBoundingClientRect();
      const belt = Array.from(root.querySelectorAll("[data-belt]")).map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left - box.left + rect.width / 2,
          y: rect.top - box.top + rect.height / 2,
        };
      });
      setGeometry({ width: box.width, height: box.height, belt });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const place = (star: (typeof STARS)[number]) =>
    geometry ? { x: star.x * geometry.width, y: star.y * geometry.height } : null;

  const [betelgeuse, bellatrix, saiph, rigel] = STARS.map(place);
  const belt = geometry?.belt;

  const lines =
    betelgeuse && bellatrix && saiph && rigel && belt?.length === 3
      ? [
          { from: betelgeuse, to: belt[0], group: 0 },
          { from: saiph, to: belt[0], group: 0 },
          { from: betelgeuse, to: bellatrix, group: 1 },
          { from: saiph, to: rigel, group: 1 },
          { from: bellatrix, to: belt[2], group: 2 },
          { from: rigel, to: belt[2], group: 2 },
          { from: belt[0], to: belt[2], group: 1 },
        ]
      : [];

  return (
    <svg ref={ref} className="pointer-events-none absolute inset-0 size-full" aria-hidden>
      <defs>
        {STARS.map((star) => (
          <radialGradient key={star.name} id={`glow-${star.name}`}>
            <stop offset="0%" stopColor={star.color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={star.color} stopOpacity={0} />
          </radialGradient>
        ))}
      </defs>

      {DUST.map((dust) => (
        <circle
          key={dust.id}
          cx={`${dust.x}%`}
          cy={`${dust.y}%`}
          r={dust.radius}
          fill="#ffffff"
          opacity={dust.opacity}
          className={dust.twinkle ? "sky-twinkle" : undefined}
          style={dust.twinkle ? { animationDelay: `${dust.delay}s` } : undefined}
        />
      ))}

      {lines.map((line, index) => (
        <line
          key={index}
          x1={line.from.x}
          y1={line.from.y}
          x2={line.to.x}
          y2={line.to.y}
          pathLength={1}
          data-line={line.group}
          className="sky-line"
        />
      ))}

      {STARS.map((star, index) => {
        const point = place(star);
        if (!point) return null;
        return (
          <g key={star.name} className="fade" style={{ animationDelay: `${0.5 + index * 0.15}s` }}>
            <circle cx={point.x} cy={point.y} r={star.size * 3} fill={`url(#glow-${star.name})`} />
            <path
              d={STAR_PATH}
              transform={`translate(${point.x} ${point.y}) scale(${star.size / 100})`}
              fill={star.color}
            />
            <text
              x={point.x}
              y={point.y + (star.labelBelow ? star.size + 16 : -star.size - 8)}
              textAnchor="middle"
              className="sky-label"
            >
              {star.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
