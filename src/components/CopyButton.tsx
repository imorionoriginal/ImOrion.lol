"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(value).then(() => setCopied(true), () => {});
      }}
      aria-label={label}
      className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-panel"
    >
      <span className="min-w-0 flex-1 truncate text-right font-mono text-[12.5px] text-fg-2">
        {copied ? "Copied" : `@${value}`}
      </span>
      <Icon size={14} strokeWidth={1.75} className="shrink-0 text-fg-3" aria-hidden />
    </button>
  );
}
