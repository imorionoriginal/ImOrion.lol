import type { Metadata } from "next";
import Link from "next/link";
import {
  AppWindow,
  ArrowUpRight,
  Bot,
  Clapperboard,
  Gamepad2,
  Globe,
  MessageCircle,
  Rocket,
  Sparkles,
} from "lucide-react";
import AnkaraClock from "@/components/AnkaraClock";
import CopyButton from "@/components/CopyButton";
import DocPage from "@/components/docs/DocPage";
import { Callout, Chip, Chips, H2, P, Prop, Props, Strong } from "@/components/docs/ui";
import { DISCORD_USERNAME, LINKS, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Bio",
  description: SITE.description,
};

const TOC = [
  { id: "who", label: "Who is Orion?" },
  { id: "facts", label: "Quick facts" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "What I can do" },
  { id: "apps", label: "Apps I use" },
  { id: "links", label: "Links" },
];

const MAIN_LANGUAGES = ["Luau", "Rust"];
const OTHER_LANGUAGES = ["C++", "Java", "Assembly (NASM)", "C#", "Python", "JavaScript", "PHP", "HTML/CSS"];

const WORK = [
  { icon: Gamepad2, title: "Games", text: "Mostly Roblox, written in Luau.", href: "/projects/momentum" },
  { icon: Globe, title: "Websites", text: "You're looking at one." },
  { icon: Bot, title: "Bots", text: "Discord bots, mostly.", href: "/projects/discord-backup-bot" },
  { icon: AppWindow, title: "Apps", text: "Tools I end up wanting for myself." },
  { icon: Clapperboard, title: "Video edits", text: "The ones I enjoy making.", href: "/projects/redliner-edit" },
  { icon: Sparkles, title: "VFX design", text: "For fun, more coming soon.", href: "/projects/vfx-showcase" },
];

const APPS = [
  { group: "Development", apps: ["Git/GitHub", "Antigravity IDE", "VS Code"] },
  {
    group: "Workflow",
    apps: ["Obsidian", "The Infinite Table (my app)", "Bloom (Windows dock)", "Noxed (window manager)"],
  },
  { group: "SysAdmin", apps: ["MobaXterm (server connection)"] },
];

const cellClass = "flex items-start gap-3 bg-black p-4";

export default function BioPage() {
  return (
    <DocPage
      href="/bio"
      crumbs={[{ href: "/bio", label: "Bio" }]}
      title="Who is Orion?"
      lede={SITE.joke}
      toc={TOC}
    >
      <section id="who">
        <P>
          Jokes aside, I&apos;m a <Strong>self-taught developer</Strong> who loves building things that
          actually work. I enjoy creating. In other words, I do it for fun.
        </P>
        <P>No fancy corporate buzzwords...</P>
        <Callout icon={Rocket} title="Right now">
          Developing <Strong>Noxed</Strong>, my upcoming window manager app, and the game{" "}
          <Strong>Flex Your Limiteds</Strong>.
        </Callout>
      </section>

      <H2 id="facts">Quick facts</H2>
      <Props>
        <Prop label="Location">Ankara, Türkiye</Prop>
        <Prop label="Timezone">
          UTC+3 <span className="text-fg-3">· it&apos;s <AnkaraClock /> here</span>
        </Prop>
        <Prop label="Learned from">Myself, mostly by breaking things</Prop>
        <Prop label="Languages">~11 software languages</Prop>
      </Props>

      <H2 id="skills">Skills</H2>
      <Props>
        <Prop label="Main">
          <Chips>
            {MAIN_LANGUAGES.map((language) => (
              <Chip key={language}>{language}</Chip>
            ))}
          </Chips>
          <p className="mt-2 text-[13px] text-fg-3">Still learning Rust.</p>
        </Prop>
        <Prop label="Experienced with">
          <Chips>
            {OTHER_LANGUAGES.map((language) => (
              <Chip key={language}>{language}</Chip>
            ))}
          </Chips>
        </Prop>
      </Props>

      <H2 id="work">What I can do</H2>
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {WORK.map((item) => {
          const content = (
            <>
              <item.icon size={16} strokeWidth={1.75} className="mt-[3px] shrink-0 text-fg-2" aria-hidden />
              <span>
                <span className="block text-[14px] font-medium text-fg">{item.title}</span>
                <span className="block text-[13px] leading-relaxed text-fg-3">{item.text}</span>
              </span>
            </>
          );
          return item.href ? (
            <Link key={item.title} href={item.href} className={`${cellClass} transition-colors hover:bg-panel`}>
              {content}
            </Link>
          ) : (
            <div key={item.title} className={cellClass}>
              {content}
            </div>
          );
        })}
      </div>

      <H2 id="apps">Apps I use</H2>
      <Props>
        {APPS.map((row) => (
          <Prop key={row.group} label={row.group}>
            <Chips>
              {row.apps.map((app) => (
                <Chip key={app}>{app}</Chip>
              ))}
            </Chips>
          </Prop>
        ))}
      </Props>

      <H2 id="links">Links</H2>
      <P>Got something fun to build, or just want to say hi? Discord is the best way to reach me.</P>
      <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line">
        <li className="flex items-center">
          <span className="flex shrink-0 items-center gap-3 pl-3 text-[14px]">
            <MessageCircle size={15} strokeWidth={1.75} className="text-fg-2" aria-hidden />
            Discord
          </span>
          <div className="min-w-0 flex-1">
            <CopyButton value={DISCORD_USERNAME} label="Copy my Discord username" />
          </div>
        </li>
        {LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              target={link.id === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 text-[14px] transition-colors hover:bg-panel"
            >
              <link.icon size={15} strokeWidth={1.75} className="shrink-0 text-fg-2" aria-hidden />
              <span className="shrink-0">{link.label}</span>
              <span className="min-w-0 flex-1 truncate text-right font-mono text-[12.5px] text-fg-2">
                {link.handle}
              </span>
              <ArrowUpRight size={14} strokeWidth={1.75} className="shrink-0 text-fg-3" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </DocPage>
  );
}
