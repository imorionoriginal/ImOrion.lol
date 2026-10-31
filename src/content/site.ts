import {
  Clapperboard,
  Gamepad2,
  GitBranch,
  Layers,
  Mail,
  MessageSquareQuote,
  MessagesSquare,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "ImOrion",
  url: "https://imorion.lol",
  roles: "Game Developer · VFX Artist · Video Editor · Bot Developer",
  joke: "Orion is just a guy using the best constellation for his name.",
  description:
    "Self-taught developer from Ankara making games, bots, apps, VFX and video edits, mostly for fun.",
};

export type NavItem = {
  href: string;
  label: string;
  tile: string;
  icon: LucideIcon;
};

export const NAV: NavItem[] = [
  { href: "/bio", label: "Bio", tile: "bio/links", icon: UserRound },
  { href: "/projects", label: "Projects", tile: "projects", icon: Layers },
  { href: "/reviews", label: "Reviews", tile: "reviews", icon: MessageSquareQuote },
];

export type SocialLink = {
  id: string;
  label: string;
  handle: string;
  href: string;
  icon: LucideIcon;
};

export const LINKS: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "imorionoriginal",
    href: "https://github.com/imorionoriginal",
    icon: GitBranch,
  },
  {
    id: "discord",
    label: "Discord server",
    handle: "discord.gg/FNPZk7WDqC",
    href: "https://discord.gg/FNPZk7WDqC",
    icon: MessagesSquare,
  },
  {
    id: "roblox",
    label: "Roblox",
    handle: "profile",
    href: "https://www.roblox.com/users/1656348904/profile",
    icon: Gamepad2,
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@imorionoriginal",
    href: "https://www.tiktok.com/@imorionoriginal",
    icon: Clapperboard,
  },
  {
    id: "email",
    label: "Email",
    handle: "DrowBlackAcc@gmail.com",
    href: "mailto:DrowBlackAcc@gmail.com",
    icon: Mail,
  },
];

export const DISCORD_USERNAME = "imorionoriginal";
