import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Eyebrow, SpecBar, VisitForm } from "@/components/blocks";
import { Shell } from "@/components/shell";
import { getProperty } from "@/lib/catalog";
import { formatPrice, useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/imoveis/$id")({ component: PropertyPage });

function PropertyPage() {
  const { id } = Route.useParams();
  const { t, lang } = useI18n();
  const property = getProperty(id);
  const [shot, setShot] = useState(0);

  if (!property) {
    return (
      <Shell>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <p className="font-display text-2xl">{t.notFound}</p>
          <Link to="/imoveis" className="mt-6 inline-block bg-peach px-5 py-3 font-display text-sm font-semibold text-navy">
            {t.back}
          </Link>
        </div>
      </Shell>
    );
  }

  const c = property.copy[lang];
  const photo = property.gallery[shot] ?? property.image;
  const floor =
    property.floor == null ? (property.kind === "land" ? t.lot : t.ground) : String(property.floor);

  return (
    <Shell>
      <section className="hero-frame relative flex items-end bg-navy text-white">
        <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-16">
          <p className="font-display text-sm tracking-[0.28em] text-peach uppercase">{t.kind[property.kind]}</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-medium md:text-6xl">{c.name}</h1>
          <p className="mt-4 flex items-center gap-2 text-white/90">
            <MapPin className="h-4 w-4 text-peach" />
            {c.place} · Paracuru
          </p>
          <p className="mt-4 font-display text-2xl">{formatPrice(property.price, lang)}</p>
        </div>
      </section>
      <SpecBar
        items={[
          { value: String(property.year), label: t.specYear },
          { value: floor, label: t.specFloor },
          { value: String(property.area), label: t.specArea },
          { value: property.beds > 0 ? String(property.beds) : "—", label: t.specBeds },
        ]}
      />
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Eyebrow>{t.description}</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-medium">{c.blurb}</h2>
        <p className="mt-6 leading-relaxed text-muted">{c.description}</p>
        <p className="mt-4 text-sm text-navy-2">
          {property.beach} m {t.beach}
        </p>
      </section>
      <section className="bg-soft py-14">
        <div className="mx-auto max-w-5xl px-4">
          <Eyebrow>{t.highlights}</Eyebrow>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {c.features.map((f) => (
              <li key={f} className="flex gap-3 bg-paper px-4 py-3 text-sm">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-peach" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-4 gap-2">
          {property.gallery.map((src, i) => (
            <button key={src + i} type="button" onClick={() => setShot(i)} className={i === shot ? "ring-2 ring-peach" : ""}>
              <img src={src} alt="" className="frame-photo w-full object-cover" />
            </button>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <Eyebrow>{t.visitEyebrow}</Eyebrow>
        <h2 className="mt-3 text-center font-display text-3xl font-medium">{t.visitTitle}</h2>
        <p className="mt-4 text-center text-muted">{t.visitBody}</p>
        <div className="mt-8">
          <VisitForm preset={property.id} />
        </div>
        <p className="mt-8 text-center">
          <Link to="/imoveis" className="text-sm font-semibold text-peach-deep">
            {t.back}
          </Link>
        </p>
      </section>
    </Shell>
  );
}
