"use client";

import { useRef } from "react";
import { usePlayer } from "@/lib/player";

export default function ProjectVideo({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  const { pause, resume } = usePlayer();
  const pausedMusic = useRef(false);

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-panel">
      {/* The file is 65 MB, so nothing downloads until someone presses play. */}
      <video
        src={src}
        poster={poster}
        title={title}
        controls
        playsInline
        preload="none"
        className="block aspect-video w-full"
        onPlay={() => {
          pausedMusic.current = pause();
        }}
        onPause={() => {
          if (pausedMusic.current) resume();
          pausedMusic.current = false;
        }}
      />
    </div>
  );
}
