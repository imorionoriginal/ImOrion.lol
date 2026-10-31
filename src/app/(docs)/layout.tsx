import type { ReactNode } from "react";
import Chrome from "@/components/docs/Chrome";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Chrome />
      <main className="lg:pl-[284px]">{children}</main>
    </>
  );
}
