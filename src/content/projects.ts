import { slugify } from "@/lib/slug";
import { parseVideoLink, type VideoEmbed } from "@/lib/video";
import data from "./projects.json";

// projects.json is written by the /admin panel. Keep these fields in sync with public/admin/config.yml.
type ProjectEntry = {
  title: string;
  type: string;
  role: string;
  year: string | number;
  summary: string;
  about?: string;
  images?: string[];
  videoLink?: string;
  videoFile?: string;
  poster?: string;
  song?: string;
  status?: string;
  linkLabel?: string;
  linkUrl?: string;
};

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
  images: string[];
  videoLink?: string;
  videoFile?: string;
  embed?: VideoEmbed;
  poster?: string;
  thumbnail?: string;
  link?: { label: string; href: string };
};

export const PROJECTS: Project[] = (data as ProjectEntry[]).map((entry, index) => {
  const images = entry.images ?? [];
  const embed = parseVideoLink(entry.videoLink);
  return {
    slug: slugify(entry.title) || `project-${index + 1}`,
    title: entry.title,
    type: entry.type,
    role: entry.role,
    year: String(entry.year),
    status: entry.status || undefined,
    song: entry.song || undefined,
    summary: entry.summary,
    body: (entry.about ?? "").split(/\n\s*\n/).map((text) => text.trim()).filter(Boolean),
    images,
    videoLink: entry.videoLink || undefined,
    videoFile: entry.videoFile || undefined,
    embed,
    poster: entry.poster || undefined,
    thumbnail: entry.poster || images[0] || embed?.thumbnail,
    link: entry.linkUrl
      ? { label: entry.linkLabel || "Open link", href: entry.linkUrl }
      : undefined,
  };
});

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
