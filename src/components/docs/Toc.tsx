"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

export default function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const update = () => {
      const page = document.documentElement;
      if (window.innerHeight + window.scrollY >= page.scrollHeight - 4) {
        setActive(items[items.length - 1].id);
        return;
      }
      let current = items[0].id;
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActive(current);
    };

    // Pages opened on a #section start scrolled, so check once before any scroll event.
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-14 hidden w-[176px] shrink-0 self-start xl:block">
      <p className="mb-3 font-mono text-[11px] text-fg-3">On this page</p>
      <ul className="border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={`-ml-px block border-l py-1 pl-3 text-[13px] leading-snug transition-colors ${
                active === item.id
                  ? "border-fg text-fg"
                  : "border-transparent text-fg-3 hover:text-fg-2"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
