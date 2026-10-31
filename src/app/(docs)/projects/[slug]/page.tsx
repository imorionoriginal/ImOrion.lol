import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Gallery from "@/components/Gallery";
import ProjectVideo from "@/components/ProjectVideo";
import DocPage from "@/components/docs/DocPage";
import { H2, P, Prop, Props } from "@/components/docs/ui";
import { PROJECTS } from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) notFound();

  const href = `/projects/${project.slug}`;
  const toc = [
    { id: "media", label: project.video ? "Video" : "Screenshots" },
    ...(project.body.length ? [{ id: "about", label: "About" }] : []),
    { id: "details", label: "Details" },
  ];

  return (
    <DocPage
      href={href}
      crumbs={[
        { href: "/projects", label: "Projects" },
        { href, label: project.title },
      ]}
      title={project.title}
      lede={project.summary}
      toc={toc}
    >
      <section id="media">
        {project.video ? (
          <ProjectVideo src={project.video} poster={project.poster?.src} title={project.title} />
        ) : (
          <Gallery images={project.images} title={project.title} />
        )}
      </section>

      {project.body.length > 0 && (
        <>
          <H2 id="about">About</H2>
          {project.body.map((paragraph) => (
            <P key={paragraph}>{paragraph}</P>
          ))}
        </>
      )}

      <H2 id="details">Details</H2>
      <Props>
        <Prop label="Type">{project.type}</Prop>
        <Prop label="My role">{project.role}</Prop>
        <Prop label="Year">{project.year}</Prop>
        {project.song && <Prop label="Song">{project.song}</Prop>}
        {project.status && <Prop label="Status">{project.status}</Prop>}
        {project.link && (
          <Prop label="Link">
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg"
            >
              {project.link.label}
              <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden />
            </a>
          </Prop>
        )}
      </Props>
    </DocPage>
  );
}
