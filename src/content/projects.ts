import type { StaticImageData } from "next/image";

import backup1 from "@/assets/backup1.png";
import backup2 from "@/assets/backup2.png";
import backup3 from "@/assets/backup3.png";
import Momentum1 from "@/assets/Momentum1.png";
import Momentum2 from "@/assets/Momentum2.png";
import Momentum3 from "@/assets/Momentum3.png";
import Redone1 from "@/assets/Redone1.png";
import Redone2 from "@/assets/Redone2.png";
import Redone3 from "@/assets/Redone3.png";
import RedlinerPoster from "@/assets/RedlinerPoster.jpg";
import VFX1 from "@/assets/VFX1.png";
import VFX2 from "@/assets/VFX2.png";
import VFX3 from "@/assets/VFX3.png";

export type Project = {
  slug: string;
  title: string;
  type: string;
  role: string;
  year: string;
  status?: string;
  song?: string;
  summary: string;
  body: string[];
  images: StaticImageData[];
  video?: string;
  poster?: StaticImageData;
  link?: { label: string; href: string };
};

export const PROJECTS: Project[] = [
  {
    slug: "momentum",
    title: "Momentum",
    type: "Roblox game",
    role: "Scripter",
    year: "2026",
    status: "Private for now",
    summary: "A parkour game with some cool movement mechanics.",
    body: [
      "We're making our own maps, scripts, mechanics, lighting and a lot more. This is gonna be peak.",
    ],
    images: [Momentum3, Momentum1, Momentum2],
    link: { label: "Discord server", href: "https://discord.gg/tpuxU4b8pV" },
  },
  {
    slug: "parkour-redone",
    title: "Parkour Redone",
    type: "Roblox game",
    role: "Main Scripter",
    year: "2025",
    status: "Private",
    summary: "A modded Parkour Reborn made by Fynndo.",
    body: [
      "New self-made districts, a self-made announcement system, a self-made movement fix and a lot more.",
      "It's private because it's a copy of the game. We're just making it for fun.",
    ],
    images: [Redone1, Redone2, Redone3],
    link: { label: "Discord server", href: "https://discord.gg/YzkKtBaDQ4" },
  },
  {
    slug: "vfx-showcase",
    title: "VFX Showcase",
    type: "VFX",
    role: "VFX Artist",
    year: "2025",
    summary: "Some VFX I made for fun.",
    body: ["I'll make more soon."],
    images: [VFX1, VFX2, VFX3],
    link: { label: "Discord server", href: "https://discord.gg/b9VK6UTD69" },
  },
  {
    slug: "discord-backup-bot",
    title: "Discord Backup Bot",
    type: "Discord bot",
    role: "Developer",
    year: "2025",
    status: "Paid, contact me to buy it",
    summary: "A Discord bot that backs up and restores servers.",
    body: [
      "Copy one server and paste it into any other: roles, perms, channels.",
      "Backups are stored on your own PC, so your data stays with you.",
    ],
    images: [backup1, backup2, backup3],
    link: { label: "Discord server", href: "https://discord.gg/b9VK6UTD69" },
  },
  {
    slug: "redliner-edit",
    title: "Redliner Edit",
    type: "Video edit",
    role: "Editor",
    year: "2026",
    song: "CRYST4L",
    summary: "Just an edit I really enjoyed making.",
    body: [],
    images: [],
    video: "/videos/Redliner Edit_02.mp4",
    poster: RedlinerPoster,
    link: {
      label: "TikTok",
      href: "https://www.tiktok.com/@imorionoriginal/video/7653832665166105872",
    },
  },
];

// Reading order for the prev/next links at the bottom of every page.
export const PAGES = [
  { href: "/bio", title: "Bio" },
  { href: "/projects", title: "Projects" },
  ...PROJECTS.map((project) => ({
    href: `/projects/${project.slug}`,
    title: project.title,
  })),
  { href: "/reviews", title: "Reviews" },
];
