import Link from "next/link";
import Constellation from "@/components/Constellation";
import { NAV, SITE } from "@/content/site";

export default function Home() {
  return (
    <main className="hero relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4">
      <Constellation />

      <div className="relative flex flex-col items-center text-center">
        <h1 className="rise text-[clamp(3.75rem,11vw,6.5rem)] font-normal leading-none tracking-[-0.045em]">
          {SITE.name}
        </h1>

        <p
          className="rise mt-4 max-w-[300px] bg-black px-2 text-[15px] leading-relaxed text-fg-2 sm:max-w-none sm:text-[17px]"
          style={{ animationDelay: "0.08s" }}
        >
          {SITE.roles}
        </p>

        <nav aria-label="Main" className="fade mt-12 flex gap-3" style={{ animationDelay: "0.16s" }}>
          {NAV.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              data-tile={index}
              className="tile-link flex flex-col items-center gap-3"
            >
              <span data-belt className="tile">
                <item.icon size={26} strokeWidth={1.5} aria-hidden />
              </span>
              <span className="tile-label bg-black px-1 font-mono text-xs text-fg-3 transition-colors">
                {item.tile}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <p
        className="fade absolute inset-x-4 bottom-5 text-center font-mono text-[11px] text-fg-3"
        style={{ animationDelay: "0.6s" }}
      >
        {SITE.joke}
      </p>
    </main>
  );
}
