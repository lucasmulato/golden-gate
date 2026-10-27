import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { team } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/equipe")({ component: TeamPage });

function TeamPage() {
  const { t, lang } = useI18n();
  return (
    <Shell>
      <section className="bg-navy px-4 py-16 text-center text-white">
        <p className="font-display text-xs tracking-[0.28em] text-peach uppercase">{t.teamEyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-medium">{t.teamTitle}</h1>
        <p className="mx-auto mt-4 max-w-xl text-mist">{t.teamLead}</p>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-3">
        {team.map((person) => {
          const c = person.copy[lang];
          return (
            <article key={person.id} className="border border-line px-6 py-8">
              <div className="grid h-16 w-16 place-items-center bg-navy font-display text-lg font-semibold text-peach">
                {person.initials}
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold">{c.name}</h2>
              <p className="text-sm text-peach">{c.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.bio}</p>
              <p className="mt-4 text-xs tracking-widest text-navy-2">{person.langs.join(" · ")}</p>
            </article>
          );
        })}
      </section>
      <p className="pb-16 text-center">
        <Link to="/contato" className="bg-peach px-6 py-3 font-display text-sm font-semibold text-navy">
          {t.heroCta2}
        </Link>
      </p>
    </Shell>
  );
}
