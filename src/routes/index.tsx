import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Eyebrow, PropertyCard, SectionTitle, SpecBar, VisitForm } from "@/components/blocks";
import { Shell } from "@/components/shell";
import { properties, quotes } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t, lang } = useI18n();
  const featured = properties.filter((p) => p.featured);

  return (
    <Shell>
      <section className="hero-frame relative flex items-center justify-center overflow-hidden bg-navy text-white">
        <img src="/media/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/45" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center">
          <p className="font-display text-sm font-medium tracking-[0.32em] uppercase">{t.heroKicker}</p>
          <h1 className="hero-title mt-2 font-display font-medium">{t.heroTitle}</h1>
          <p className="mx-auto mt-5 max-w-xl font-display text-lg font-normal text-white/90 md:text-2xl">{t.heroSub}</p>
          <p className="mt-10 inline-flex items-start justify-center gap-2 text-sm text-white/90">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-peach" />
            <span>{t.heroAddress}</span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/imoveis" className="bg-peach px-7 py-3 font-display text-sm font-semibold text-navy">
              {t.heroCta}
            </Link>
            <Link to="/contato" className="border border-white/70 px-7 py-3 font-display text-sm font-semibold text-white">
              {t.heroCta2}
            </Link>
          </div>
        </div>
      </section>

      <SpecBar items={t.stats.map((s) => ({ value: s.value, label: s.label }))} />

      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <Eyebrow>{t.aboutEyebrow}</Eyebrow>
        <SectionTitle>{t.aboutTitle}</SectionTitle>
        <p className="mt-6 text-base leading-relaxed text-muted">{t.aboutBody}</p>
      </section>

      <section className="bg-soft py-16">
        <div className="mx-auto max-w-5xl px-4">
          <Eyebrow>{t.featuresEyebrow}</Eyebrow>
          <SectionTitle>{t.featuresTitle}</SectionTitle>
          <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((item) => (
              <li key={item} className="flex gap-3 border-b border-line py-2 text-sm text-navy">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-peach" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative">
        <img src="/media/fachada.jpg" alt="" className="band-photo w-full object-cover" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Eyebrow>{t.portfolioEyebrow}</Eyebrow>
        <SectionTitle>{t.portfolioTitle}</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">{t.portfolioLead}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link to="/imoveis" className="font-display text-sm font-semibold tracking-wide text-peach-deep uppercase">
            {t.seeAll}
          </Link>
        </p>
      </section>

      <section className="bg-navy py-16 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="font-display text-xs font-semibold tracking-[0.28em] text-peach uppercase">{t.agentEyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-medium">{t.agentTitle}</h2>
            <p className="mt-4 leading-relaxed text-mist">{t.agentBody}</p>
            <p className="mt-6 font-display text-lg font-semibold">{t.agentName}</p>
            <p className="text-sm text-peach">{t.agentRole}</p>
            <Link to="/equipe" className="mt-6 inline-block border border-white/40 px-5 py-2.5 text-sm font-semibold">
              {t.nav.team}
            </Link>
          </div>
          <img src="/media/suite.jpg" alt="" className="frame-photo w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20">
        <Eyebrow>{t.visitEyebrow}</Eyebrow>
        <SectionTitle>{t.visitTitle}</SectionTitle>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted">{t.visitBody}</p>
        <div className="mt-8">
          <VisitForm />
        </div>
      </section>

      <section className="border-t border-line bg-soft py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Eyebrow>{t.quotesEyebrow}</Eyebrow>
          <SectionTitle>{t.quotesTitle}</SectionTitle>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {quotes[lang].map((q) => (
              <blockquote key={q.name} className="bg-paper px-5 py-6">
                <p className="text-sm leading-relaxed text-navy">“{q.quote}”</p>
                <footer className="mt-4 text-sm text-muted">
                  {q.name}
                  <span className="text-peach"> · {q.place}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
