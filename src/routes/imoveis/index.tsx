import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Eyebrow, PropertyCard } from "@/components/blocks";
import { Shell } from "@/components/shell";
import { properties, type Kind } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/imoveis/")({ component: ListPage });

const kinds: Array<Kind | "all"> = ["all", "apartment", "house", "penthouse", "studio", "land"];

function ListPage() {
  const { t } = useI18n();
  const [kind, setKind] = useState<Kind | "all">("all");
  const [sort, setSort] = useState<"featured" | "priceAsc" | "priceDesc" | "area">("featured");

  const list = useMemo(() => {
    const base = properties.filter((p) => kind === "all" || p.kind === kind);
    const copy = [...base];
    if (sort === "priceAsc") copy.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") copy.sort((a, b) => b.price - a.price);
    if (sort === "area") copy.sort((a, b) => b.area - a.area);
    if (sort === "featured") copy.sort((a, b) => Number(b.featured) - Number(a.featured));
    return copy;
  }, [kind, sort]);

  return (
    <Shell>
      <section className="bg-navy px-4 py-16 text-center text-white">
        <Eyebrow>{t.portfolioEyebrow}</Eyebrow>
        <h1 className="mt-3 font-display text-4xl font-medium md:text-5xl">{t.portfolioTitle}</h1>
        <p className="mx-auto mt-4 max-w-xl text-mist">{t.filterLead}</p>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {kinds.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={`px-3 py-2 font-display text-xs font-semibold tracking-wide uppercase ${
                  kind === k ? "bg-navy text-white" : "bg-soft text-navy"
                }`}
              >
                {t.kind[k]}
              </button>
            ))}
          </div>
          <label className="text-sm text-muted">
            {t.sortLabel}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="ml-2 border border-line bg-paper px-2 py-2 text-navy"
            >
              <option value="featured">{t.sort.featured}</option>
              <option value="priceAsc">{t.sort.priceAsc}</option>
              <option value="priceDesc">{t.sort.priceDesc}</option>
              <option value="area">{t.sort.area}</option>
            </select>
          </label>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        {list.length === 0 && <p className="mt-10 text-center text-muted">{t.searchEmpty}</p>}
      </section>
    </Shell>
  );
}
