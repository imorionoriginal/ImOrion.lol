"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Search as SearchIcon } from "lucide-react";
import { NAV } from "@/content/site";

const TABS = [{ href: "/", label: "Home", icon: House }, ...NAV];

export default function MobileBar({ onSearch }: { onSearch: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* The music player sits on top of this bar. */}
      <div className="fixed inset-x-0 top-0 z-40 h-[80px] border-b border-line bg-black/85 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          onClick={onSearch}
          aria-label="Search"
          className="absolute right-3 top-3 flex size-[56px] items-center justify-center rounded-xl border border-line-strong bg-panel text-fg-2 transition-colors hover:text-fg max-[339px]:w-[40px]"
        >
          <SearchIcon size={18} strokeWidth={1.75} aria-hidden />
        </button>
      </div>

      <nav
        aria-label="Pages"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-black/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      >
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`flex h-14 flex-col items-center justify-center gap-1 text-[11px] transition-colors ${
                active ? "text-fg" : "text-fg-3"
              }`}
            >
              <tab.icon size={18} strokeWidth={1.75} aria-hidden />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
