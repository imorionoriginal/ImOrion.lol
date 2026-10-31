import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Toc, { type TocItem } from "@/components/docs/Toc";
import { PAGES } from "@/content/projects";
import { SITE } from "@/content/site";

type Crumb = { href: string; label: string };

export default function DocPage({
  href,
  crumbs,
  title,
  lede,
  toc,
  children,
}: {
  href: string;
  crumbs: Crumb[];
  title: string;
  lede?: ReactNode;
  toc?: TocItem[];
  children: ReactNode;
}) {
  const position = PAGES.findIndex((page) => page.href === href);
  const prev = PAGES[position - 1];
  const next = PAGES[position + 1];

  return (
    <div className="page-in mx-auto flex max-w-[1020px] gap-14 px-5 pb-28 pt-[100px] sm:px-8 lg:px-12 lg:pb-14 lg:pt-14">
      <article className="min-w-0 flex-1">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-fg-3">
          <Link href="/" className="transition-colors hover:text-fg">
            {SITE.name}
          </Link>
          {crumbs.map((crumb) => (
            <Fragment key={crumb.href}>
              <span aria-hidden>/</span>
              <Link href={crumb.href} className="transition-colors hover:text-fg">
                {crumb.label}
              </Link>
            </Fragment>
          ))}
        </nav>

        <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.035em]">{title}</h1>
        {lede && <p className="mt-4 text-[17px] leading-relaxed text-fg-2">{lede}</p>}

        <div className="mt-10">{children}</div>

        <nav aria-label="Pagination" className="mt-16 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              href={prev.href}
              className="group rounded-lg border border-line px-4 py-3 transition-colors hover:border-line-strong hover:bg-panel"
            >
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-fg-3">
                <ArrowLeft size={12} aria-hidden /> Previous
              </span>
              <span className="mt-1 block text-[14px] font-medium">{prev.title}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link
              href={next.href}
              className="group rounded-lg border border-line px-4 py-3 text-right transition-colors hover:border-line-strong hover:bg-panel"
            >
              <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] text-fg-3">
                Next <ArrowRight size={12} aria-hidden />
              </span>
              <span className="mt-1 block text-[14px] font-medium">{next.title}</span>
            </Link>
          )}
        </nav>

        <footer className="mt-12 flex flex-wrap justify-between gap-2 border-t border-line pt-5 font-mono text-[11px] text-fg-3">
          <span>© 2026 ImOrionOriginal</span>
          <span>Made for fun in Ankara</span>
        </footer>
      </article>

      {toc && <Toc items={toc} />}
    </div>
  );
}
