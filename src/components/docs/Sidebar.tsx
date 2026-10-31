"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import AnkaraClock from "@/components/AnkaraClock";
import Logo from "@/components/Logo";
import { PROJECTS } from "@/content/projects";
import { LINKS, NAV, SITE } from "@/content/site";

const stripSlash = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

function Active() {
  return (
    <motion.span
      layoutId="sidebar-active"
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      className="absolute inset-0 rounded-md bg-white/[0.08]"
    />
  );
}

export default function Sidebar({ onSearch }: { onSearch: () => void }) {
  const pathname = stripSlash(usePathname());
  const [modifier, setModifier] = useState("Ctrl");

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the platform is only known on the client
      setModifier("⌘");
    }
  }, []);

  return (
    <aside className="fade fixed inset-y-0 left-0 z-30 hidden w-[284px] flex-col border-r border-line bg-black lg:flex">
      {/* The music player floats in this space. */}
      <div className="h-[84px] shrink-0" />

      <div className="flex flex-col gap-2 px-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[15px] font-semibold tracking-[-0.01em]"
        >
          <Logo size={14} />
          {SITE.name}
        </Link>
        <button
          type="button"
          onClick={onSearch}
          className="flex h-9 items-center gap-2 rounded-md border border-line bg-panel px-2.5 text-[13px] text-fg-3 transition-colors hover:border-line-strong hover:text-fg-2"
        >
          <SearchIcon size={14} strokeWidth={1.75} aria-hidden />
          Search
          <kbd className="ml-auto font-mono text-[10.5px]">{modifier} K</kbd>
        </button>
      </div>

      <nav aria-label="Pages" className="mt-4 min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        <ul className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex h-9 items-center gap-2.5 rounded-md px-2 text-[14px] transition-colors ${
                    active ? "text-fg" : "text-fg-2 hover:text-fg"
                  }`}
                >
                  {active && <Active />}
                  <item.icon size={15} strokeWidth={1.75} className="relative" aria-hidden />
                  <span className="relative">{item.label}</span>
                </Link>

                {item.href === "/projects" && (
                  <ul className="my-0.5 ml-[15px] flex flex-col gap-0.5 border-l border-line pl-2">
                    {PROJECTS.map((project) => {
                      const href = `/projects/${project.slug}`;
                      const current = pathname === href;
                      return (
                        <li key={project.slug}>
                          <Link
                            href={href}
                            aria-current={current ? "page" : undefined}
                            className={`relative flex h-8 items-center rounded-md px-2.5 text-[13.5px] transition-colors ${
                              current ? "text-fg" : "text-fg-3 hover:text-fg"
                            }`}
                          >
                            {current && <Active />}
                            <span className="relative truncate">{project.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center justify-between border-t border-line px-3 py-2.5">
        <div className="flex items-center">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.id === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className="flex size-8 items-center justify-center rounded-md text-fg-3 transition-colors hover:bg-white/[0.08] hover:text-fg"
            >
              <link.icon size={15} strokeWidth={1.75} aria-hidden />
            </a>
          ))}
        </div>
        <span className="pr-1 font-mono text-[11px] text-fg-3" title="Time in Ankara, UTC+3">
          <AnkaraClock />
        </span>
      </div>
    </aside>
  );
}
