import type { ReactNode } from "react";
import { Hash, type LucideIcon } from "lucide-react";

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mb-4 mt-14 text-xl font-semibold tracking-[-0.02em] first:mt-0">
      <a href={`#${id}`} className="group inline-flex items-center gap-2">
        {children}
        <Hash
          size={15}
          strokeWidth={1.75}
          className="text-fg-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        />
      </a>
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-[15px] leading-[1.75] text-fg-2 last:mb-0">{children}</p>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-fg">{children}</strong>;
}

export function Callout({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-6 flex gap-3 rounded-lg border border-line bg-panel px-4 py-3.5">
      <Icon size={16} strokeWidth={1.75} className="mt-[3px] shrink-0 text-star" aria-hidden />
      <div className="min-w-0 text-[14px] leading-relaxed text-fg-2">
        <p className="font-medium text-fg">{title}</p>
        <div className="mt-0.5">{children}</div>
      </div>
    </aside>
  );
}

export function Props({ children }: { children: ReactNode }) {
  return <dl className="divide-y divide-line border-y border-line">{children}</dl>;
}

export function Prop({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 py-2.5 sm:grid-cols-[168px_minmax(0,1fr)]">
      <dt className="pt-px font-mono text-[12.5px] leading-6 text-fg-3">{label}</dt>
      <dd className="text-[14px] leading-6 text-fg">{children}</dd>
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-panel px-2 py-px font-mono text-[12.5px] leading-[22px] text-fg">
      {children}
    </span>
  );
}

export function Chips({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-1.5">{children}</div>;
}
