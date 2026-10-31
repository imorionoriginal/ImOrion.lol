"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { TRACKS } from "@/content/tracks";
import { usePlayer } from "@/lib/player";

function clock(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span className="eq" data-playing={playing} aria-hidden>
      <i />
      <i />
      <i />
    </span>
  );
}

const controlClass =
  "flex size-7 shrink-0 items-center justify-center rounded-md text-fg-2 transition-colors hover:bg-white/10 hover:text-fg";

export default function MusicPlayer() {
  const player = usePlayer();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const track = TRACKS[player.index];
  const progress = player.duration ? (player.time / player.duration) * 100 : 0;
  const VolumeIcon = player.volume === 0 ? VolumeX : player.volume < 0.5 ? Volume1 : Volume2;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      data-player
      className="fixed left-3 top-3 z-50 w-[260px] overflow-hidden rounded-xl border border-line-strong bg-panel/90 shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-opacity duration-500"
      style={{ opacity: player.ready ? 1 : 0 }}
    >
      <div className="flex items-center gap-2.5 p-2">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-panel-2">
          <Image src={track.cover} alt="" fill sizes="40px" className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium leading-tight text-fg" title={track.title}>
            {track.title}
          </p>
          <p className="mt-1 font-mono text-[10.5px] leading-none text-fg-3 tabular-nums">
            {clock(player.time)} / {clock(player.duration)}
          </p>
        </div>

        <div className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={player.toggle}
            aria-label={player.playing ? "Pause" : "Play"}
            className={`${controlClass} text-fg`}
          >
            {player.playing ? (
              <Pause size={15} fill="currentColor" strokeWidth={0} />
            ) : (
              <Play size={15} fill="currentColor" strokeWidth={0} />
            )}
          </button>
          <button type="button" onClick={player.next} aria-label="Next song" className={controlClass}>
            <SkipForward size={15} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Hide song list" : "Show song list"}
            aria-expanded={open}
            className={controlClass}
          >
            <ChevronDown
              size={15}
              strokeWidth={1.75}
              className="transition-transform duration-200"
              style={{ transform: open ? "rotate(180deg)" : undefined }}
            />
          </button>
        </div>
      </div>

      <div className="-mt-1.5 px-2 pb-0.5">
        <input
          type="range"
          className="slider"
          aria-label="Seek"
          min={0}
          max={player.duration || 0}
          step={0.1}
          value={player.time}
          onChange={(event) => player.seek(Number(event.target.value))}
          style={{ "--p": `${progress}%` } as React.CSSProperties}
        />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line"
          >
            <div className="flex items-center gap-2 px-2.5 py-1.5">
              <button
                type="button"
                onClick={player.prev}
                aria-label="Previous song"
                className={`${controlClass} -ml-1`}
              >
                <SkipBack size={15} strokeWidth={1.75} />
              </button>
              <VolumeIcon size={14} strokeWidth={1.75} className="ml-auto shrink-0 text-fg-3" aria-hidden />
              <input
                type="range"
                className="slider max-w-[120px]"
                aria-label="Volume"
                min={0}
                max={1}
                step={0.01}
                value={player.volume}
                onChange={(event) => player.setVolume(Number(event.target.value))}
                style={{ "--p": `${player.volume * 100}%` } as React.CSSProperties}
              />
            </div>

            <ul className="border-t border-line p-1">
              {TRACKS.map((item, index) => {
                const current = index === player.index;
                return (
                  <li key={item.src}>
                    <button
                      type="button"
                      onClick={() => (current ? player.toggle() : player.select(index))}
                      aria-current={current ? "true" : undefined}
                      className="flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors hover:bg-white/[0.06]"
                    >
                      <span className="relative size-7 shrink-0 overflow-hidden rounded">
                        <Image src={item.cover} alt="" fill sizes="28px" className="object-cover" />
                      </span>
                      <span
                        className={`min-w-0 flex-1 truncate text-[12.5px] ${current ? "text-fg" : "text-fg-2"}`}
                      >
                        {item.title}
                      </span>
                      {current && (
                        <span className="pr-1 text-fg">
                          <Equalizer playing={player.playing} />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
