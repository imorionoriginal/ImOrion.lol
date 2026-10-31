import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clapperboard } from "lucide-react";
import Building from "@/components/docs/Building";
import DocPage from "@/components/docs/DocPage";
import { PROJECTS } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Games, bots, VFX and edits ImOrion has built or helped build.",
};

export default function ProjectsPage() {
  return (
    <DocPage
      href="/projects"
      crumbs={[{ href: "/projects", label: "Projects" }]}
      title="Projects"
      lede="Things I've built or helped build, mostly because they seemed fun to make."
    >
      <Building title="In the works" />

      <ul className="divide-y divide-line border-y border-line">
        {PROJECTS.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="group -mx-3 flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-panel"
            >
              <span className="relative flex aspect-[8/5] w-[92px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-panel-2 sm:w-[112px]">
                {project.thumbnail ? (
                  <Image src={project.thumbnail} alt="" fill sizes="112px" className="object-cover" />
                ) : (
                  <Clapperboard size={18} strokeWidth={1.5} className="text-fg-3" aria-hidden />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium">{project.title}</span>
                <span className="block text-[13.5px] leading-snug text-fg-2">{project.summary}</span>
                <span className="mt-1 block font-mono text-[11.5px] text-fg-3">
                  {project.type} · {project.role} · {project.year}
                </span>
              </span>

              <ArrowRight
                size={15}
                strokeWidth={1.75}
                className="hidden shrink-0 text-fg-3 transition-transform group-hover:translate-x-0.5 group-hover:text-fg sm:block"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </DocPage>
  );
}
