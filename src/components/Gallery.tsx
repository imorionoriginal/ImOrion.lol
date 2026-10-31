"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const dialogButtonClass =
  "flex size-10 items-center justify-center rounded-lg text-fg-2 transition-colors hover:bg-white/10 hover:text-fg";

// next/image needs numbers here, but size-auto lets each file render at its real size.
const INTRINSIC = { width: 1600, height: 900 };

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active !== null && !dialog.open) dialog.showModal();
    if (active === null && dialog.open) dialog.close();
  }, [active]);

  const step = useCallback(
    (amount: number) => {
      setActive((value) =>
        value === null ? value : (value + amount + images.length) % images.length,
      );
    },
    [images.length],
  );

  return (
    <>
      <div className="grid gap-2 sm:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Open ${title} screenshot ${index + 1}`}
            className={`flex cursor-zoom-in items-center justify-center overflow-hidden rounded-lg border border-line bg-panel p-1 transition-colors hover:border-line-strong ${
              index === 0 ? "aspect-video sm:col-span-2" : "aspect-[8/5]"
            }`}
          >
            <Image
              src={image}
              alt=""
              {...INTRINSIC}
              className="size-auto max-h-full max-w-full rounded-[5px] object-contain"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={`${title} screenshots`}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActive(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="fixed inset-0 m-0 size-full max-h-none max-w-none bg-black/95 text-fg"
      >
        <div
          className="flex size-full items-center justify-center p-4 sm:p-16"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActive(null);
          }}
        >
          {active !== null && (
            <Image
              src={images[active]}
              alt={`${title} screenshot ${active + 1}`}
              {...INTRINSIC}
              className="size-auto max-h-full max-w-full rounded-lg object-contain"
            />
          )}
        </div>

        <button
          type="button"
          onClick={() => setActive(null)}
          aria-label="Close"
          className={`${dialogButtonClass} absolute right-3 top-3`}
        >
          <X size={18} strokeWidth={1.75} aria-hidden />
        </button>
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-line bg-panel/90 p-1">
            <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" className={dialogButtonClass}>
              <ChevronLeft size={18} strokeWidth={1.75} aria-hidden />
            </button>
            <span className="w-10 text-center font-mono text-xs tabular-nums text-fg-3">
              {(active ?? 0) + 1}/{images.length}
            </span>
            <button type="button" onClick={() => step(1)} aria-label="Next screenshot" className={dialogButtonClass}>
              <ChevronRight size={18} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
