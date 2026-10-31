import type { StaticImageData } from "next/image";

import cover1 from "@/assets/music/From The Islands.jpg";
import cover2 from "@/assets/music/GATA ONLY.jpg";
import cover3 from "@/assets/music/anybody can find love.jpg";
import cover4 from "@/assets/music/BeethovenVirus.png";

export type Track = {
  title: string;
  src: string;
  cover: StaticImageData;
  volumeMultiplier?: number;
};

export const TRACKS: Track[] = [
  {
    title: "From The Islands",
    src: "/music/From The Islands.mp3",
    cover: cover1,
  },
  {
    title: "GATA ONLY REMIX",
    src: "/music/GATA ONLY REMIX.mp3",
    cover: cover2,
  },
  {
    title: "anybody can find love (except you.)",
    src: "/music/anybody can find love (except you.).mp3",
    cover: cover3,
  },
  {
    title: "Beethoven Virus INSANE PIANO VERSION",
    src: "/music/Beethoven Virus INSANE PIANO VERSION - Pianoly Official (192k).mp3",
    cover: cover4,
    volumeMultiplier: 2,
  },
];
