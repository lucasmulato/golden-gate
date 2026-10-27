import { Link } from "@tanstack/react-router";
import { Bath, BedDouble, MapPin, Maximize } from "lucide-react";
import { useEffect, useState } from "react";
import { properties, type Property } from "@/lib/catalog";
import { formatPrice, useI18n } from "@/lib/i18n";

export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-center font-display text-xs font-semibold tracking-[0.28em] text-peach uppercase">{children}</p>
  );
}

export function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-3xl leading-tight font-medium text-navy md:text-4xl">
      {children}
    </h2>
  );
}

export function PropertyCard({ property }: { property: Property }) {
  const { t, lang } = useI18n();
  const c = property.copy[lang];
  return (
    <Link to="/imoveis/$id" params={{ id: property.id }} className="group block bg-paper">
      <div className="relative frame-photo overflow-hidden bg-soft">
        <img src={property.image} alt={c.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
        <span className="absolute top-3 left-3 bg-peach px-2 py-1 font-display text-[11px] font-semibold tracking-wide text-navy uppercase">
          {t.available}
        </span>
      </div>
      <div className="border border-t-0 border-line px-4 py-4">
        <p className="text-xs tracking-wide text-muted uppercase">{t.kind[property.kind]}</p>
        <h3 className="mt-1 font-display text-lg font-semibold">{c.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5 text-peach" />
          {c.place}
        </p>
        <p className="mt-3 font-display text-xl font-semibold">{formatPrice(property.price, lang)}</p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-navy-2">
          {property.beds > 0 && (
            <span className="inline-flex items-center gap-1">
              <BedDouble className="h-4 w-4 text-peach" />
              {property.beds} {t.beds}
            </span>
          )}
          {property.baths > 0 && (
            <span className="inline-flex items-center gap-1">
              <Bath className="h-4 w-4 text-peach" />
              {property.baths} {t.baths}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Maximize className="h-4 w-4 text-peach" />
            {property.area} {t.area}
          </span>
        </p>
      </div>
    </Link>
  );
}

export function VisitForm({ preset }: { preset?: string }) {
  const { t, lang } = useI18n();
  const [ready, setReady] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [property, setProperty] = useState(preset ?? "");

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (preset) setProperty(preset);
  }, [preset]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    if (!name) {
      setError(t.form.needName);
      return;
    }
    if (!email && !phone) {
      setError(t.form.needContact);
      return;
    }
    const prev = JSON.parse(window.localStorage.getItem("gg-leads") || "[]") as unknown[];
    prev.push({
      name,
      email,
      phone,
      date: String(data.get("date") || ""),
      message: String(data.get("message") || ""),
      property,
      lang,
      at: new Date().toISOString(),
    });
    window.localStorage.setItem("gg-leads", JSON.stringify(prev));
    setError("");
    setSent(true);
  }

  if (!ready) {
    return <div className="min-h-80 bg-soft" />;
  }

  if (sent) {
    return (
      <div className="bg-soft px-6 py-10 text-center">
        <p className="font-display text-2xl text-navy">{t.form.sentTitle}</p>
        <p className="mx-auto mt-3 max-w-md text-muted">{t.form.sentBody}</p>
      </div>
    );
  }

  const field = "w-full border border-line bg-white px-3 py-3 text-sm outline-none focus:border-peach";

  return (
    <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
      <label className="block text-sm">
        <span className="mb-1 block text-muted">{t.form.name}</span>
        <input name="name" className={field} autoComplete="name" />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-muted">{t.form.email}</span>
        <input name="email" type="email" className={field} autoComplete="email" />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-muted">{t.form.phone}</span>
        <input name="phone" className={field} autoComplete="tel" />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-muted">{t.form.date}</span>
        <input name="date" type="date" className={field} />
      </label>
      <label className="block text-sm md:col-span-2">
        <span className="mb-1 block text-muted">{t.form.property}</span>
        <select
          name="property"
          value={property}
          onChange={(e) => setProperty(e.target.value)}
          className={field}
        >
          <option value="">{t.form.any}</option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.copy[lang].name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm md:col-span-2">
        <span className="mb-1 block text-muted">{t.form.message}</span>
        <textarea name="message" rows={4} className={field} />
      </label>
      {error && <p className="text-sm text-peach-deep md:col-span-2">{error}</p>}
      <div className="md:col-span-2">
        <button type="submit" className="bg-peach px-8 py-3 font-display text-sm font-semibold text-navy hover:bg-peach-deep">
          {t.form.send}
        </button>
      </div>
    </form>
  );
}

export function SpecBar({ items }: { items: { value: string; label: string }[] }) {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="px-4 py-8 text-center">
            <p className="font-display text-3xl font-medium text-peach md:text-4xl">{item.value}</p>
            <p className="mt-1 font-display text-xs tracking-[0.16em] uppercase">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
