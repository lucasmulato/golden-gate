import { faqs, properties as catalog } from "@/lib/catalog";
import { formatPrice, type Lang } from "@/lib/i18n";

export type BotLink = { href: string; label: string };
export type BotReply = { text: string; links?: BotLink[] };

const linkLabel = {
  pt: { portfolio: "Ver imóveis", visit: "Abrir agenda", about: "Sobre a casa", faq: "Todas as dúvidas" },
  en: { portfolio: "View homes", visit: "Open the diary", about: "About the house", faq: "All questions" },
  es: { portfolio: "Ver inmuebles", visit: "Abrir agenda", about: "Sobre la casa", faq: "Todas las dudas" },
};

function has(text: string, words: string[]) {
  return words.some((w) => {
    if (w.includes(" ")) return text.includes(w);
    if (w.length <= 3) return new RegExp(`(^|[^a-z])${w}([^a-z]|$)`).test(text);
    return text.includes(w);
  });
}

export function answer(lang: Lang, raw: string): BotReply {
  const text = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const L = linkLabel[lang];

  const property = catalog.find((p) => {
    const name = p.copy[lang].name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const id = p.id.replace("-", " ");
    return text.includes(name) || name.split(" ").some((part) => part.length > 4 && text.includes(part)) || text.includes(id);
  });

  if (property && !has(text, ["todos", "all homes", "quais", "which", "que inmue", "lista", "list", "portfo"])) {
    const c = property.copy[lang];
    const price = formatPrice(property.price, lang);
    const specs =
      property.beds > 0
        ? `${property.area} m² · ${property.beds} · ${price}`
        : `${property.area} m² · ${price}`;
    const line = {
      pt: `${c.name} fica em ${c.place}. ${c.blurb} ${specs}. ${c.description}`,
      en: `${c.name} is in ${c.place}. ${c.blurb} ${specs}. ${c.description}`,
      es: `${c.name} está en ${c.place}. ${c.blurb} ${specs}. ${c.description}`,
    }[lang];
    return {
      text: line,
      links: [
        { href: `/imoveis/${property.id}`, label: c.name },
        { href: `/contato?imovel=${property.id}`, label: L.visit },
      ],
    };
  }

  if (has(text, ["ola", "oi", "hey", "hello", "hi", "hola", "bom dia", "boa tarde", "buenos", "good morning"])) {
    return {
      text: {
        pt: "Olá. Posso falar de um imóvel, do preço, da visita ou de como um estrangeiro compra em Paracuru.",
        en: "Hello. I can talk about a home, a price, a visit, or how a foreign buyer purchases in Paracuru.",
        es: "Hola. Puedo hablar de un inmueble, del precio, de la visita o de cómo compra un extranjero en Paracuru.",
      }[lang],
    };
  }

  if (has(text, ["agend", "visit", "visita", "showing", "horario", "marcar", "book", "cita", "conhecer o im"])) {
    return {
      text: {
        pt: "A visita é com hora marcada, de segunda a sábado, entre 9h e 18h. Escolha o imóvel e um dia na agenda — a mensagem fica registrada nesta demonstração.",
        en: "Visits are by appointment, Monday to Saturday, 9am to 6pm. Pick a home and a day in the diary — the note is saved on this demonstration.",
        es: "La visita es con hora, de lunes a sábado, de 9h a 18h. Elija el inmueble y un día en la agenda — el mensaje queda registrado en esta demostración.",
      }[lang],
      links: [{ href: "/contato", label: L.visit }],
    };
  }

  if (has(text, ["preco", "price", "precio", "valor", "quanto", "how much", "cuanto", "barato", "cheap", "caro"])) {
    const sorted = [...catalog].sort((a, b) => a.price - b.price);
    const low = sorted[0];
    const high = sorted[sorted.length - 1];
    const list = sorted
      .map((p) => `${p.copy[lang].name}: ${formatPrice(p.price, lang)}`)
      .join(" · ");
    return {
      text: {
        pt: `Os preços de hoje vão de ${formatPrice(low.price, lang)} (${low.copy.pt.name}) a ${formatPrice(high.price, lang)} (${high.copy.pt.name}). ${list}.`,
        en: `Today’s prices run from ${formatPrice(low.price, lang)} (${low.copy.en.name}) to ${formatPrice(high.price, lang)} (${high.copy.en.name}). ${list}.`,
        es: `Los precios de hoy van de ${formatPrice(low.price, lang)} (${low.copy.es.name}) a ${formatPrice(high.price, lang)} (${high.copy.es.name}). ${list}.`,
      }[lang],
      links: [{ href: "/imoveis", label: L.portfolio }],
    };
  }

  if (has(text, ["onde", "where", "endereco", "address", "direccion", "escritorio", "office", "oficina", "paracuru", "fortaleza", "fica", "local"])) {
    return {
      text: {
        pt: "O escritório fica na Rua Domingos Paulino, 31, Sala 2, Paracuru — CE, CEP 62.680-000. São cerca de 80 km de Fortaleza, no litoral oeste. CNPJ 62.678.365/0001-27.",
        en: "The office is at Rua Domingos Paulino, 31, Sala 2, Paracuru — CE, postcode 62.680-000. About 80 km from Fortaleza, on the west coast. CNPJ 62.678.365/0001-27.",
        es: "La oficina está en Rua Domingos Paulino, 31, Sala 2, Paracuru — CE, CEP 62.680-000. Unos 80 km desde Fortaleza, en el litoral oeste. CNPJ 62.678.365/0001-27.",
      }[lang],
      links: [{ href: "/sobre", label: L.about }, { href: "/contato", label: L.visit }],
    };
  }

  if (has(text, ["estrangeir", "foreign", "extranjer", "gringo", "cpf", "document", "passport", "passaport", "compra de fora", "overseas", "europe"])) {
    return {
      text: {
        pt: "Sim. Comprador de fora é atendido por Sofia Martins, em inglês ou espanhol. O caminho usual pede CPF e, se a pessoa não estiver no Brasil, uma procuração. Imóvel urbano fora de faixa rural segue o rito comum — a casa explica o passo, não substitui o advogado.",
        en: "Yes. Buyers from abroad are looked after by Sofia Martins, in English or Spanish. The usual path needs a CPF and, if the person is not in Brazil, a power of attorney. An urban home outside a rural belt follows the ordinary route — the house explains the step, it does not replace a lawyer.",
        es: "Sí. Al comprador de fuera lo atiende Sofia Martins, en inglés o español. El camino usual pide CPF y, si la persona no está en Brasil, un poder. Un inmueble urbano fuera de zona rural sigue el rito común — la casa explica el paso, no reemplaza al abogado.",
      }[lang],
      links: [{ href: "/equipe", label: "Sofia Martins" }],
    };
  }

  if (has(text, ["financ", "banco", "mortgage", "hipotec", "parcela", "payment", "pagamento", "entrada", "cash", "a vista"])) {
    return {
      text: {
        pt: "Não há simulador de banco neste site. A condição de pagamento é conversada imóvel a imóvel, direto com a casa, porque o portfólio é próprio. Na visita a gente abre número, entrada e prazo.",
        en: "There is no bank simulator on this site. Payment terms are discussed home by home, directly with the house, because the portfolio is company-owned. On the visit we open the number, the deposit and the term.",
        es: "No hay simulador de banco en este sitio. La condición de pago se conversa inmueble por inmueble, directo con la casa, porque el portafolio es propio. En la visita abrimos número, entrada y plazo.",
      }[lang],
      links: [{ href: "/contato", label: L.visit }],
    };
  }

  if (has(text, ["idioma", "language", "ingles", "english", "espanhol", "spanish", "portugues", "portuguese", "bandeira"])) {
    return {
      text: {
        pt: "O site inteiro muda com as bandeiras no topo: Brasil para português, Reino Unido para inglês, Espanha para espanhol. Este atendimento acompanha o idioma escolhido.",
        en: "The whole site follows the flags at the top: Brazil for Portuguese, the United Kingdom for English, Spain for Spanish. This concierge follows the language you picked.",
        es: "El sitio entero cambia con las banderas de arriba: Brasil para portugués, Reino Unido para inglés, España para español. Esta atención sigue el idioma elegido.",
      }[lang],
    };
  }

  if (has(text, ["horario", "hours", "abre", "open", "funciona", "sabado", "saturday", "domingo"])) {
    return {
      text: {
        pt: "A casa atende de segunda a sábado, das 9h às 18h. Domingo não há visita, salvo combinação prévia.",
        en: "The house is open Monday to Saturday, 9am to 6pm. No Sunday visits unless arranged ahead.",
        es: "La casa atiende de lunes a sábado, de 9h a 18h. El domingo no hay visita, salvo acuerdo previo.",
      }[lang],
    };
  }

  if (has(text, ["kite", "praia", "beach", "playa", "vento", "wind", "mar", "ocean", "lagoa", "lagoon", "laguna"])) {
    return {
      text: {
        pt: "Paracuru é litoral oeste do Ceará, conhecido pelo vento e pelo kitesurf. A Vila Dunas fica nessa faixa. A Casa Maré é lagoa, mais quieta. O Atlântico e a Horizonte estão na orla, a poucos metros da areia.",
        en: "Paracuru is on the west coast of Ceará, known for wind and kitesurf. Vila Dunas sits on that stretch. Casa Maré is lagoon, quieter. Atlântico and Horizonte are on the shore, a short walk from the sand.",
        es: "Paracuru es litoral oeste de Ceará, conocido por el viento y el kitesurf. Vila Dunas está en esa franja. Casa Maré es laguna, más quieta. Atlântico y Horizonte están en la orilla, a pocos metros de la arena.",
      }[lang],
      links: [{ href: "/imoveis", label: L.portfolio }],
    };
  }

  if (has(text, ["quem", "who", "sobre", "about", "empresa", "company", "golden", "cnpj", "proprio", "own propert", "tercer", "terceir"])) {
    return {
      text: {
        pt: "A Golden Gate Imobiliária Ltda. comercializa imóveis próprios em Paracuru. Não é uma vitrine de anúncios de terceiros. Fundação em 2025, CNPJ 62.678.365/0001-27, seis endereços abertos neste portfólio.",
        en: "Golden Gate Imobiliária Ltda. sells property it owns in Paracuru. It is not a window of third-party listings. Founded in 2025, CNPJ 62.678.365/0001-27, six addresses open in this portfolio.",
        es: "Golden Gate Imobiliária Ltda. comercializa inmuebles propios en Paracuru. No es un escaparate de anuncios de terceros. Fundación en 2025, CNPJ 62.678.365/0001-27, seis direcciones abiertas en este portafolio.",
      }[lang],
      links: [{ href: "/sobre", label: L.about }],
    };
  }

  if (has(text, ["imove", "imuei", "propert", "house", "casa", "apart", "cobertura", "pent", "flat", "studio", "terreno", "land", "lote", "lista", "portfolio", "quais", "which", "que tienen", "dispon"])) {
    const list = catalog.map((p) => p.copy[lang].name).join(", ");
    return {
      text: {
        pt: `No portfólio aberto: ${list}. Posso detalhar qualquer um — é só dizer o nome. O destaque da casa é o Residencial Atlântico.`,
        en: `In the open portfolio: ${list}. I can go into any of them — just say the name. The house’s lead home is Residencial Atlântico.`,
        es: `En el portafolio abierto: ${list}. Puedo detallar cualquiera — basta decir el nombre. El destaque de la casa es el Residencial Atlântico.`,
      }[lang],
      links: [{ href: "/imoveis", label: L.portfolio }],
    };
  }

  if (has(text, ["contato", "contact", "telefone", "phone", "email", "whats", "falar", "pessoa", "human", "persona"])) {
    return {
      text: {
        pt: "Se quiser uma pessoa, deixe nome e telefone ou e-mail na mensagem, ou use a agenda. A mesa é da Marina Costa. Eu registro o pedido, mas não substituo a conversa presencial.",
        en: "If you want a person, leave a name and a phone or email in your message, or use the diary. The desk is Marina Costa’s. I log the request, but I do not replace the meeting.",
        es: "Si quiere una persona, deje nombre y teléfono o correo en el mensaje, o use la agenda. La mesa es de Marina Costa. Yo registro el pedido, pero no reemplazo la conversación presencial.",
      }[lang],
      links: [{ href: "/contato", label: L.visit }, { href: "/equipe", label: "Marina Costa" }],
    };
  }

  const faqHit = faqs[lang].find((f) => {
    const q = f.q
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const tokens = q.split(/\W+/).filter((w) => w.length > 4);
    return tokens.filter((w) => text.includes(w)).length >= 2;
  });
  if (faqHit) {
    return { text: faqHit.a, links: [{ href: "/faq", label: L.faq }] };
  }

  return {
    text: {
      pt: "Não tenho essa resposta pronta. Pergunte sobre imóveis, preços, visita, endereço, documentação de estrangeiro ou horários — ou deixe seu contato que a mesa retorna.",
      en: "I don’t have that answer ready. Ask about homes, prices, a visit, the address, paperwork for a foreign buyer or opening hours — or leave your contact and the desk will reply.",
      es: "No tengo esa respuesta lista. Pregunte por inmuebles, precios, visita, dirección, documentación de extranjero u horarios — o deje su contacto y la mesa responde.",
    }[lang],
    links: [{ href: "/faq", label: L.faq }, { href: "/contato", label: L.visit }],
  };
}
