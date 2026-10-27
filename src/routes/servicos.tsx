import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { useI18n } from "@/lib/i18n";
import { services } from "@/lib/catalog";

export const Route = createFileRoute("/servicos")({ component: ServicesPage });

function ServicesPage() {
  const { t, lang } = useI18n();
  return (
    <Shell>
      <section className="bg-navy px-4 py-16 text-center text-white">
        <p className="font-display text-xs tracking-[0.28em] text-peach uppercase">{t.servicesEyebrow}</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-medium">{t.servicesTitle}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-mist">{t.servicesLead}</p>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-2">
        {services[lang].map((s, i) => (
          <article key={s.title} className="border border-line px-6 py-7">
            <p className="font-display text-sm text-peach">0{i + 1}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">{s.title}</h2>
            <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
          </article>
        ))}
      </section>
      <img src="/media/cozinha.jpg" alt="" className="h-80 w-full object-cover" />
    </Shell>
  );
}
