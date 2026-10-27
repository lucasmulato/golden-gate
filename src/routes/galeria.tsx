import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { galleryImages } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/galeria")({ component: GalleryPage });

function GalleryPage() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Shell>
      <section className="bg-navy px-4 py-16 text-center text-white">
        <p className="font-display text-xs tracking-[0.28em] text-peach uppercase">{t.galleryEyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-medium">{t.galleryTitle}</h1>
        <p className="mx-auto mt-4 max-w-xl text-mist">{t.galleryLead}</p>
      </section>
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-10 md:grid-cols-3">
        {galleryImages.map((src, i) => (
          <button key={src + i} type="button" onClick={() => setOpen(i)} className="overflow-hidden bg-soft">
            <img src={src} alt="" className="frame-photo w-full object-cover" />
          </button>
        ))}
      </section>
      {open !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4" role="dialog">
          <button type="button" aria-label={t.close} onClick={() => setOpen(null)} className="absolute top-4 right-4 grid h-11 w-11 place-items-center text-white">
            <X />
          </button>
          <img src={galleryImages[open]} alt="" className="max-h-[85vh] max-w-5xl object-contain" />
          <div className="absolute bottom-6 flex gap-3">
            <button
              type="button"
              className="bg-white/15 px-4 py-2 text-sm text-white"
              onClick={() => setOpen((open + galleryImages.length - 1) % galleryImages.length)}
            >
              ←
            </button>
            <button
              type="button"
              className="bg-white/15 px-4 py-2 text-sm text-white"
              onClick={() => setOpen((open + 1) % galleryImages.length)}
            >
              →
            </button>
          </div>
        </div>
      )}
    </Shell>
  );
}
