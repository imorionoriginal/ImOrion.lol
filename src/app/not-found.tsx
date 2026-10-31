import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 text-center">
      <Logo size={22} />
      <h1 className="mt-6 text-3xl font-semibold tracking-[-0.03em]">Nothing in this part of the sky.</h1>
      <p className="mt-3 text-[15px] text-fg-2">This page doesn&apos;t exist, or it moved.</p>
      <Link
        href="/"
        className="mt-8 flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2 text-[14px] transition-colors hover:bg-panel"
      >
        <ArrowLeft size={14} strokeWidth={1.75} aria-hidden />
        Back home
      </Link>
    </main>
  );
}
