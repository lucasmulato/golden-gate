import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { faqs } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/faq")({ component: FaqPage });

function FaqPage() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(0);
  return (
    <Shell>
      <section className="bg-navy px-4 py-16 text-center text-white">
        <p className="font-display text-xs tracking-[0.28em] text-peach uppercase">{t.faqEyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-medium">{t.faqTitle}</h1>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12">
        {faqs[lang].map((item, i) => {
          const on = open === i;
          return (
            <div key={item.q} className="border-b border-line">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-display text-lg font-semibold"
                aria-expanded={on}
                onClick={() => setOpen(on ? -1 : i)}
              >
                {item.q}
                <span className="text-peach">{on ? "–" : "+"}</span>
              </button>
              {on && <p className="pb-5 text-sm leading-relaxed text-muted">{item.a}</p>}
            </div>
          );
        })}
      </section>
    </Shell>
  );
}
