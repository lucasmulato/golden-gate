import { useNavigate } from "@tanstack/react-router";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { answer } from "@/lib/concierge";
import { useI18n } from "@/lib/i18n";

type Msg = { role: "bot" | "user"; text: string; links?: { href: string; label: string }[] };

function saveLead(note: string) {
  const prev = JSON.parse(window.localStorage.getItem("gg-leads") || "[]") as unknown[];
  prev.push({ note, at: new Date().toISOString(), via: "chat" });
  window.localStorage.setItem("gg-leads", JSON.stringify(prev));
}

function openLink(href: string, navigate: ReturnType<typeof useNavigate>, close: () => void) {
  const url = new URL(href, "http://gg.local");
  const imovel = url.searchParams.get("imovel") ?? "";
  close();
  if (url.pathname.startsWith("/imoveis/") && url.pathname !== "/imoveis/") {
    void navigate({ to: "/imoveis/$id", params: { id: url.pathname.split("/")[2] ?? "" } });
    return;
  }
  if (url.pathname === "/contato") {
    void navigate({ to: "/contato", hash: imovel });
    return;
  }
  if (url.pathname === "/imoveis") return void navigate({ to: "/imoveis" });
  if (url.pathname === "/sobre") return void navigate({ to: "/sobre" });
  if (url.pathname === "/equipe") return void navigate({ to: "/equipe" });
  if (url.pathname === "/faq") return void navigate({ to: "/faq" });
  if (url.pathname === "/servicos") return void navigate({ to: "/servicos" });
  void navigate({ to: "/" });
}

export function ChatWidget() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", text: t.chat.welcome }]);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: "bot", text: t.chat.welcome }]);
    setInput("");
  }, [lang, t.chat.welcome]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [messages, typing, open]);

  function push(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    const contact = trimmed.match(/[\w.+-]+@[\w.-]+\.\w+/) || trimmed.match(/(\+?\d[\d\s().-]{7,}\d)/);
    setTyping(true);
    window.setTimeout(() => {
      if (contact) {
        saveLead(trimmed);
        const thanks = {
          pt: "Anotado. Deixo o contato com a mesa da Marina Costa. Se quiser, diga também qual imóvel te interessa.",
          en: "Noted. I’ll leave this contact with Marina Costa’s desk. If you like, also say which home you mean.",
          es: "Anotado. Dejo el contacto en la mesa de Marina Costa. Si quiere, diga también qué inmueble le interesa.",
        }[lang];
        setMessages((m) => [...m, { role: "bot", text: thanks, links: [{ href: "/contato", label: t.chat.suggestions[1] }] }]);
      } else {
        const reply = answer(lang, trimmed);
        setMessages((m) => [...m, { role: "bot", text: reply.text, links: reply.links }]);
      }
      setTyping(false);
    }, 550);
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="chat-panel flex flex-col overflow-hidden bg-paper">
          <div className="flex items-center gap-3 bg-navy px-4 py-3 text-white">
            <span className="grid h-9 w-9 place-items-center bg-peach font-display text-xs font-bold text-navy">GG</span>
            <span className="min-w-0">
              <span className="block font-display text-sm font-semibold">{t.chat.title}</span>
              <span className="block text-xs text-mist">{t.chat.status}</span>
            </span>
            <button type="button" aria-label={t.close} onClick={() => setOpen(false)} className="ml-auto grid h-10 w-10 place-items-center">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto bg-soft px-3 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[92%] ${m.role === "user" ? "ml-auto" : ""}`}>
                <p className={`px-3 py-2 text-sm leading-relaxed ${m.role === "user" ? "bg-peach text-navy" : "bg-paper text-navy"}`}>
                  {m.text}
                </p>
                {m.links && m.links.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {m.links.map((l) => (
                      <button
                        key={l.href + l.label}
                        type="button"
                        className="bg-navy px-2.5 py-1 text-xs font-semibold text-white hover:bg-navy-2"
                        onClick={() => openLink(l.href, navigate, () => setOpen(false))}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && <p className="text-xs tracking-wide text-muted">…</p>}
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-line bg-paper px-3 py-2">
            {t.chat.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => push(s)}
                className="border border-line px-2 py-1 text-left text-xs text-navy-2 hover:border-peach"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            className="flex border-t border-line"
            onSubmit={(e) => {
              e.preventDefault();
              push(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chat.placeholder}
              className="min-w-0 flex-1 px-3 py-3 text-sm outline-none"
            />
            <button type="submit" aria-label={t.chat.send} className="grid w-12 place-items-center bg-peach text-navy">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        aria-label={t.chat.open}
        onClick={() => setOpen((v) => !v)}
        className="grid h-14 w-14 place-items-center rounded-full bg-peach text-navy shadow-[0_8px_20px_rgba(50,63,84,0.28)]"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
