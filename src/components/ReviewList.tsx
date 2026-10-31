"use client";

import { useState } from "react";
import Image from "next/image";
import { Languages, Star } from "lucide-react";
import { REVIEWS } from "@/content/reviews";

const LANGUAGES = [
  { id: "en", label: "EN" },
  { id: "tr", label: "TR" },
] as const;

type Language = (typeof LANGUAGES)[number]["id"];

export default function ReviewList() {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <>
      <div className="flex items-center gap-2.5">
        <Languages size={14} strokeWidth={1.75} className="text-fg-3" aria-hidden />
        <div role="group" aria-label="Review language" className="flex rounded-md border border-line p-0.5">
          {LANGUAGES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLanguage(item.id)}
              aria-pressed={language === item.id}
              className={`rounded px-2.5 py-0.5 font-mono text-[11.5px] transition-colors ${
                language === item.id ? "bg-white/[0.1] text-fg" : "text-fg-3 hover:text-fg-2"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {REVIEWS.map((review) => (
          <section key={review.id} id={review.id} className="border-t border-line py-7">
            <div className="flex items-center gap-3">
              <Image
                src={review.avatar}
                alt=""
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-[15px] font-medium leading-tight">{review.name}</h2>
                {review.role && <p className="mt-1 text-[13px] leading-tight text-fg-3">{review.role}</p>}
              </div>
              <p
                className="flex shrink-0 items-center gap-1 font-mono text-[12.5px] text-fg-2"
                aria-label={`${review.rating} out of 5`}
              >
                <Star size={12} strokeWidth={0} fill="currentColor" className="text-star" aria-hidden />
                {review.rating}
              </p>
            </div>

            <blockquote lang={language} className="mt-4 text-[17px] leading-relaxed tracking-[-0.005em]">
              “{language === "tr" ? review.textTr : review.text}”
            </blockquote>
          </section>
        ))}
      </div>
    </>
  );
}
