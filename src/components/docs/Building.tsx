import { Rocket } from "lucide-react";
import { Callout, Strong } from "@/components/docs/ui";
import { BUILDING } from "@/content/site";

export default function Building({ title }: { title: string }) {
  if (!BUILDING.length) return null;

  return (
    <Callout icon={Rocket} title={title}>
      <ul className="flex flex-col gap-0.5">
        {BUILDING.map((item) => (
          <li key={item.name}>
            <Strong>{item.name}</Strong>
            {item.note && ` · ${item.note}`}
          </li>
        ))}
      </ul>
    </Callout>
  );
}
