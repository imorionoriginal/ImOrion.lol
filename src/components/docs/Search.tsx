"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CornerDownLeft,
  FileText,
  Hash,
  Search as SearchIcon,
  type LucideIcon,
} from "lucide-react";
import { PROJECTS } from "@/content/projects";
import { REVIEWS } from "@/content/reviews";
import { LINKS, NAV } from "@/content/site";

type Item = {
  label: string;
  group: string;
  href: string;
  icon: LucideIcon;
  keywords?: string;
};

const ITEMS: Item[] = [
  ...NAV.map((item) => ({ label: item.label, group: "Page", href: item.href, icon: item.icon })),
  {
    label: "Who is Orion?",
    group: "Bio",
    href: "/bio#who",
    icon: Hash,
    keywords: "about self-taught noxed flex your limiteds",
  },
  { label: "Quick facts", group: "Bio", href: "/bio#facts", icon: Hash, keywords: "location ankara turkiye timezone utc" },
  {
    label: "Skills",
    group: "Bio",
    href: "/bio#skills",
    icon: Hash,
    keywords: "languages luau rust c++ java assembly nasm c# python javascript php html css",
  },
  {
    label: "What I can do",
    group: "Bio",
    href: "/bio#work",
    icon: Hash,
    keywords: "game website bot app video edit vfx",
  },
  {
    label: "Apps I use",
    group: "Bio",
    href: "/bio#apps",
    icon: Hash,
    keywords: "git vscode antigravity obsidian infinite table bloom noxed mobaxterm",
  },
  { label: "Links", group: "Bio", href: "/bio#links", icon: Hash, keywords: "contact discord email" },
  ...PROJECTS.map((project) => ({
    label: project.title,
    group: "Project",
    href: `/projects/${project.slug}`,
    icon: FileText,
    keywords: `${project.type} ${project.role}`,
  })),
  ...REVIEWS.map((review) => ({
    label: review.name,
    group: "Review",
    href: `/reviews#${review.id}`,
    icon: Hash,
    keywords: review.role,
  })),
  ...LINKS.map((link) => ({
    label: link.label,
    group: "Link",
    href: link.href,
    icon: link.icon,
    keywords: link.handle,
  })),
];

const isExternal = (href: string) => !href.startsWith("/");

export default function Search({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("en");
    if (!needle) return ITEMS;
    return ITEMS.filter((item) =>
      `${item.label} ${item.group} ${item.keywords ?? ""}`.toLocaleLowerCase("en").includes(needle),
    );
  }, [query]);

  const reset = () => {
    setQuery("");
    setSelected(0);
  };

  const go = (item: Item) => {
    onClose();
    reset();
    if (isExternal(item.href)) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  };

  const move = (step: number) => {
    if (!results.length) return;
    const nextIndex = (selected + step + results.length) % results.length;
    setSelected(nextIndex);
    listRef.current?.children[nextIndex]?.scrollIntoView({ block: "nearest" });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Enter" && results[selected]) {
      event.preventDefault();
      go(results[selected]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search"
      onClose={() => {
        onClose();
        reset();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="mx-auto mt-[12vh] w-[calc(100vw-24px)] max-w-[540px] overflow-hidden rounded-xl border border-line-strong bg-panel text-fg shadow-[0_32px_96px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center gap-2.5 border-b border-line px-4">
        <SearchIcon size={15} strokeWidth={1.75} className="shrink-0 text-fg-3" aria-hidden />
        <input
          autoFocus
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search the site"
          aria-label="Search the site"
          className="h-12 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-fg-3"
        />
        <kbd className="rounded border border-line-strong px-1.5 font-mono text-[10.5px] leading-5 text-fg-3">
          esc
        </kbd>
      </div>

      <ul ref={listRef} className="max-h-[min(380px,55vh)] overflow-y-auto p-1.5">
        {results.map((item, index) => (
          <li key={item.href}>
            <button
              type="button"
              onClick={() => go(item)}
              onMouseMove={() => setSelected(index)}
              className={`flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left ${
                index === selected ? "bg-white/[0.08]" : ""
              }`}
            >
              <item.icon size={15} strokeWidth={1.75} className="shrink-0 text-fg-3" aria-hidden />
              <span className="min-w-0 flex-1 truncate text-[14px]">{item.label}</span>
              <span className="font-mono text-[11px] text-fg-3">{item.group}</span>
              {index === selected &&
                (isExternal(item.href) ? (
                  <ArrowUpRight size={13} className="shrink-0 text-fg-3" aria-hidden />
                ) : (
                  <CornerDownLeft size={13} className="shrink-0 text-fg-3" aria-hidden />
                ))}
            </button>
          </li>
        ))}
        {!results.length && (
          <li className="px-3 py-8 text-center text-[14px] text-fg-3">Nothing in this part of the sky.</li>
        )}
      </ul>
    </dialog>
  );
}
