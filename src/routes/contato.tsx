import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { VisitForm } from "@/components/blocks";
import { Shell } from "@/components/shell";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contato")({ component: ContactPage });

function ContactPage() {
  const { t } = useI18n();
  const hash = useRouterState({ select: (s) => s.location.hash }).replace("#", "");
  return (
    <Shell>
      <section className="bg-navy px-4 py-16 text-center text-white">
        <p className="font-display text-xs tracking-[0.28em] text-peach uppercase">{t.contactEyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-medium">{t.contactTitle}</h1>
        <p className="mx-auto mt-4 max-w-xl text-mist">{t.contactLead}</p>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-display text-lg font-semibold">GOLDEN GATE</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{t.address}</p>
          <p className="mt-3 text-sm text-navy">{t.hours}</p>
          <p className="mt-1 text-sm text-navy">{t.cnpj}</p>
          <img src="/media/mare.jpg" alt="" className="frame-photo mt-6 w-full object-cover" />
        </div>
        <VisitForm preset={hash} />
      </section>
    </Shell>
  );
}
