import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { Eyebrow, SectionTitle } from "@/components/blocks";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/sobre")({ component: AboutPage });

function AboutPage() {
  const { t } = useI18n();
  return (
    <Shell>
      <section className="relative flex min-h-80 items-end bg-navy text-white">
        <img src="/media/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-16">
          <Eyebrow>{t.aboutEyebrow}</Eyebrow>
          <h1 className="mt-3 text-center font-display text-4xl font-medium md:text-5xl">{t.aboutPageTitle}</h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-lg leading-relaxed text-navy-2">{t.aboutPageBody}</p>
        <p className="mt-6 leading-relaxed text-muted">{t.aboutBody}</p>
      </section>
      <section className="bg-soft py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {t.values.map((v) => (
            <article key={v.t} className="bg-paper px-5 py-6">
              <h2 className="font-display text-xl font-semibold">{v.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2">
        <img src="/media/dunas.jpg" alt="" className="frame-photo w-full object-cover" />
        <div>
          <SectionTitle>{t.contactTitle}</SectionTitle>
          <p className="mt-4 text-center text-muted md:text-left">{t.address}</p>
          <p className="mt-2 text-center text-sm text-navy md:text-left">
            {t.hours}
            <br />
            {t.cnpj}
          </p>
        </div>
      </section>
    </Shell>
  );
}
