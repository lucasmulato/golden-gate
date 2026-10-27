import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { properties } from "@/lib/catalog";
import { formatPrice, useI18n, type Lang } from "@/lib/i18n";
import { ChatWidget } from "@/components/chat";

const flags: { id: Lang; label: string }[] = [
  { id: "pt", label: "Português" },
  { id: "en", label: "English" },
  { id: "es", label: "Español" },
];

function Flag({ id }: { id: Lang }) {
  if (id === "pt") {
    return (
      <svg viewBox="0 0 28 20" className="h-4 w-6" aria-hidden>
        <rect width="28" height="20" fill="#009b3a" />
        <polygon points="14,2 26,10 14,18 2,10" fill="#fedf00" />
        <circle cx="14" cy="10" r="3.4" fill="#002776" />
      </svg>
    );
  }
  if (id === "en") {
    return (
      <svg viewBox="0 0 28 20" className="h-4 w-6" aria-hidden>
        <rect width="28" height="20" fill="#012169" />
        <path d="M0 0 L28 20 M28 0 L0 20" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0 L28 20 M28 0 L0 20" stroke="#c8102e" strokeWidth="1.4" />
        <path d="M14 0 V20 M0 10 H28" stroke="#fff" strokeWidth="5" />
        <path d="M14 0 V20 M0 10 H28" stroke="#c8102e" strokeWidth="2.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 28 20" className="h-4 w-6" aria-hidden>
      <rect width="28" height="20" fill="#c60b1e" />
      <rect y="5.2" width="28" height="9.6" fill="#ffc400" />
    </svg>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 36 36" className="h-8 w-8 text-peach" aria-hidden>
      <path d="M5 28 V16 L18 6 L31 16 V28" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13 28 V18 H23 V28" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 28 H28" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const { t, lang, setLang } = useI18n();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [path, lang]);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/sobre", label: t.nav.about },
    { to: "/imoveis", label: t.nav.properties },
    { to: "/servicos", label: t.nav.services },
    { to: "/galeria", label: t.nav.gallery },
    { to: "/equipe", label: t.nav.team },
    { to: "/contato", label: t.nav.contact },
  ] as const;

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return properties;
    return properties.filter((p) => {
      const c = p.copy[lang];
      return (
        c.name.toLowerCase().includes(query) ||
        c.place.toLowerCase().includes(query) ||
        t.kind[p.kind].toLowerCase().includes(query)
      );
    });
  }, [q, lang, t]);

  return (
    <div className="min-h-screen bg-paper text-navy">
      <header className="sticky top-0 z-40 bg-navy text-white shadow-[0_6px_6px_rgba(0,0,0,0.1)]">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3.5">
          <Link to="/" className="flex items-center gap-2.5">
            <Mark />
            <span className="font-display text-sm font-bold tracking-[0.18em]">GOLDEN GATE</span>
          </Link>
          <nav className="ml-auto hidden items-center gap-5 lg:flex">
            {links.map((l) => {
              const active = l.to === "/" ? path === "/" : path.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`font-display text-sm font-semibold ${active ? "text-peach" : "text-white hover:text-peach"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-1 lg:ml-4" role="group" aria-label={t.langLabel}>
            {flags.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-label={f.label}
                aria-pressed={lang === f.id}
                onClick={() => setLang(f.id)}
                className={`grid h-10 w-10 place-items-center rounded-sm ${lang === f.id ? "bg-white/15 ring-1 ring-peach" : "hover:bg-white/10"}`}
              >
                <Flag id={f.id} />
              </button>
            ))}
            <button
              type="button"
              aria-label={t.search}
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 place-items-center hover:text-peach"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center lg:hidden"
              aria-label={t.menu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-white/10 px-4 py-3 lg:hidden">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="block py-3 font-display text-sm font-semibold">
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {children}

      <footer className="bg-ink text-mist">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-wide text-white uppercase">GOLDEN GATE</p>
            <p className="mt-1 font-display text-sm tracking-[0.22em] text-peach uppercase">{t.footerSlogan}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed">{t.footerBlurb}</p>
          </div>
          <div className="md:text-right">
            <nav className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="text-sm hover:text-white">
                  {l.label}
                </Link>
              ))}
              <Link to="/faq" className="text-sm hover:text-white">
                {t.nav.faq}
              </Link>
            </nav>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-8">
          <div className="border-t border-white/30 pt-4 text-xs leading-relaxed">
            <p>{t.address}</p>
            <p className="mt-1">
              {t.hours} · {t.cnpj}
            </p>
            <p className="mt-2">{t.rights}</p>
          </div>
        </div>
      </footer>
      <ChatWidget />

      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-navy/70" role="dialog" aria-modal="true" aria-label={t.searchTitle}>
          <div className="mx-auto mt-16 max-w-xl bg-paper p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">{t.searchTitle}</h2>
              <button type="button" aria-label={t.close} onClick={() => setSearchOpen(false)} className="grid h-10 w-10 place-items-center">
                <X className="h-5 w-5" />
              </button>
            </div>
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="mt-4 w-full border border-line bg-white px-3 py-3 text-navy outline-none focus:border-peach"
            />
            <ul className="mt-4 max-h-80 divide-y divide-line overflow-auto">
              {results.length === 0 && <li className="py-4 text-sm text-muted">{t.searchEmpty}</li>}
              {results.map((p) => (
                <li key={p.id}>
                  <Link to="/imoveis/$id" params={{ id: p.id }} className="flex items-center justify-between gap-3 py-3 hover:text-peach-deep">
                    <span>
                      <span className="block font-display text-sm font-semibold">{p.copy[lang].name}</span>
                      <span className="text-xs text-muted">{p.copy[lang].place}</span>
                    </span>
                    <span className="text-sm font-semibold">{formatPrice(p.price, lang)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
