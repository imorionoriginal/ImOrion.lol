"use client";

import { useEffect, useRef } from "react";
import { usePlayer } from "@/lib/player";
import type { VideoEmbed } from "@/lib/video";

export default function VideoFrame({ embed, title }: { embed: VideoEmbed; title: string }) {
  const { pause } = usePlayer();
  const frameRef = useRef<HTMLIFrameElement>(null);

  // Clicks inside the frame never reach this page, but they do pull focus into it.
  useEffect(() => {
    const onBlur = () => {
      if (document.activeElement === frameRef.current) pause();
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [pause]);

  return (
    <div
      className={`overflow-hidden rounded-lg border border-line bg-panel ${
        embed.portrait ? "mx-auto aspect-[9/16] w-full max-w-[340px]" : "aspect-video"
      }`}
    >
      <iframe
        ref={frameRef}
        src={embed.src}
        title={title}
        loading="lazy"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="size-full"
      />
    </div>
  );
}
