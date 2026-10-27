import type { Lang } from "@/lib/i18n";

export type Kind = "apartment" | "house" | "penthouse" | "land" | "studio";

type L10n = { name: string; place: string; blurb: string; description: string; features: string[] };

export type Property = {
  id: string;
  kind: Kind;
  price: number;
  beds: number;
  baths: number;
  area: number;
  floor: number | null;
  year: number;
  beach: number;
  image: string;
  gallery: string[];
  featured: boolean;
  copy: Record<Lang, L10n>;
};

const g = {
  atlantico: "/media/atlantico.jpg",
  dunas: "/media/dunas.jpg",
  cobertura: "/media/cobertura.jpg",
  mare: "/media/mare.jpg",
  lote: "/media/lote.jpg",
  flat: "/media/flat.jpg",
  cozinha: "/media/cozinha.jpg",
  suite: "/media/suite.jpg",
  fachada: "/media/fachada.jpg",
  hero: "/media/hero.jpg",
};

export const properties: Property[] = [
  {
    id: "atlantico",
    kind: "apartment",
    price: 1890000,
    beds: 3,
    baths: 4,
    area: 168,
    floor: 8,
    year: 2024,
    beach: 40,
    image: g.atlantico,
    gallery: [g.atlantico, g.cozinha, g.suite, g.fachada],
    featured: true,
    copy: {
      pt: {
        name: "Residencial Atlântico",
        place: "Orla de Paracuru",
        blurb: "Três suítes, living aberto para o Atlântico e o endereço-assinatura da casa.",
        description:
          "Situado a cerca de 40 metros da areia, o Atlântico surpreende pela planta limpa e pela luz. Três suítes com banheiros independentes, um living com janelas voltadas para o mar e pisos de madeira que contrastam com o mármore da cozinha sob medida. A varanda acompanha a fachada. É o imóvel que a Golden Gate mostra primeiro — e o que costuma fechar a conversa.",
        features: [
          "Cozinha sob medida",
          "Living voltado para o mar",
          "Três suítes",
          "Varanda corrida",
          "A 40 m da areia",
          "Vaga coberta",
          "Acabamento pronto",
          "Planta familiar",
        ],
      },
      en: {
        name: "Residencial Atlântico",
        place: "Paracuru shore",
        blurb: "Three suites, a living room open to the Atlantic, and the house’s signature address.",
        description:
          "About 40 metres from the sand, Atlântico is defined by a clean plan and the light. Three suites with their own baths, a living room facing the sea and timber floors set against a bespoke marble kitchen. The balcony runs the length of the façade. It is the home Golden Gate shows first — and the one that usually closes the conversation.",
        features: [
          "Bespoke kitchen",
          "Sea-facing living room",
          "Three suites",
          "Full-length balcony",
          "40 m from the sand",
          "Covered parking",
          "Turn-key finish",
          "Family plan",
        ],
      },
      es: {
        name: "Residencial Atlântico",
        place: "Orilla de Paracuru",
        blurb: "Tres suites, living abierto al Atlántico y la dirección insignia de la casa.",
        description:
          "A unos 40 metros de la arena, el Atlântico sorprende por la planta limpia y la luz. Tres suites con baño propio, un living hacia el mar y pisos de madera frente al mármol de la cocina a medida. El balcón recorre la fachada. Es el inmueble que Golden Gate muestra primero — y el que suele cerrar la conversación.",
        features: [
          "Cocina a medida",
          "Living al mar",
          "Tres suites",
          "Balcón corrido",
          "A 40 m de la arena",
          "Cochera cubierta",
          "Acabado listo",
          "Planta familiar",
        ],
      },
    },
  },
  {
    id: "dunas",
    kind: "house",
    price: 3450000,
    beds: 4,
    baths: 5,
    area: 286,
    floor: null,
    year: 2023,
    beach: 90,
    image: g.dunas,
    gallery: [g.dunas, g.hero, g.suite, g.fachada],
    featured: true,
    copy: {
      pt: {
        name: "Vila Dunas",
        place: "Faixa de kitesurf",
        blurb: "Casa térrea entre coqueiros, piscina privada e quatro suítes.",
        description:
          "A Vila Dunas fica na faixa em que o vento de Paracuru é o assunto do fim de tarde. Volume branco, brises de madeira, piscina no jardim e quatro suítes. A casa é própria da Golden Gate, entregue em 2023, com acesso simples à orla e silêncio de condomínio baixo. Para quem quer o litoral sem dividir corredor.",
        features: [
          "Piscina privada",
          "Quatro suítes",
          "Brises de madeira",
          "Jardim com coqueiros",
          "A 90 m da areia",
          "Energia e água ligadas",
          "Suíte de hóspedes",
          "Garagem para dois carros",
        ],
      },
      en: {
        name: "Vila Dunas",
        place: "Kitesurf stretch",
        blurb: "A single-storey house among palms, with a private pool and four suites.",
        description:
          "Vila Dunas sits on the stretch where Paracuru’s wind is the late-afternoon subject. White volume, timber screens, a garden pool and four suites. Golden Gate owns the house, delivered in 2023, with a simple walk to the shore and the quiet of a low compound. For someone who wants the coast without sharing a corridor.",
        features: [
          "Private pool",
          "Four suites",
          "Timber screens",
          "Palm garden",
          "90 m from the sand",
          "Utilities connected",
          "Guest suite",
          "Parking for two cars",
        ],
      },
      es: {
        name: "Vila Dunas",
        place: "Franja de kitesurf",
        blurb: "Casa de una planta entre cocoteros, piscina privada y cuatro suites.",
        description:
          "Vila Dunas está en la franja donde el viento de Paracuru es el tema del atardecer. Volumen blanco, celosías de madera, piscina en el jardín y cuatro suites. La casa es de Golden Gate, entregada en 2023, con acceso simple a la orilla y el silencio de un conjunto bajo. Para quien quiere el litoral sin compartir pasillo.",
        features: [
          "Piscina privada",
          "Cuatro suites",
          "Celosías de madera",
          "Jardín con cocoteros",
          "A 90 m de la arena",
          "Servicios conectados",
          "Suite de huéspedes",
          "Cochera para dos autos",
        ],
      },
    },
  },
  {
    id: "horizonte",
    kind: "penthouse",
    price: 4200000,
    beds: 3,
    baths: 4,
    area: 214,
    floor: 12,
    year: 2025,
    beach: 60,
    image: g.cobertura,
    gallery: [g.cobertura, g.atlantico, g.suite, g.cozinha],
    featured: true,
    copy: {
      pt: {
        name: "Cobertura Horizonte",
        place: "Centro de Paracuru",
        blurb: "Terraço inteiro, pôr do sol no Atlântico e a linha mais alta do portfólio.",
        description:
          "A Horizonte ocupa o último piso com terraço contínuo, lounge externo e três suítes. O pôr do sol entra sem pedir licença. Entrega 2025, acabamento ainda com margem para o comprador escolher pedra e tecido com a casa. É o imóvel para quem quer altura, silêncio e uma única chave.",
        features: [
          "Terraço contínuo",
          "Lounge externo",
          "Três suítes",
          "Vista 180º",
          "Entrega 2025",
          "Acabamento sob consulta",
          "Duas vagas",
          "A 60 m da areia",
        ],
      },
      en: {
        name: "Cobertura Horizonte",
        place: "Paracuru centre",
        blurb: "A full terrace, sunset on the Atlantic, and the highest line in the portfolio.",
        description:
          "Horizonte takes the top floor with a continuous terrace, an outdoor lounge and three suites. Sunset comes in without asking. Delivery 2025, with room for the buyer to choose stone and fabric with the house. The home for someone who wants height, quiet and a single key.",
        features: [
          "Continuous terrace",
          "Outdoor lounge",
          "Three suites",
          "180º view",
          "2025 delivery",
          "Finishes by consultation",
          "Two parking spaces",
          "60 m from the sand",
        ],
      },
      es: {
        name: "Cobertura Horizonte",
        place: "Centro de Paracuru",
        blurb: "Terraza completa, atardecer en el Atlántico y la línea más alta del portafolio.",
        description:
          "Horizonte ocupa el último piso con terraza continua, lounge exterior y tres suites. El atardecer entra sin pedir permiso. Entrega 2025, con margen para que el comprador elija piedra y tela con la casa. El inmueble para quien quiere altura, silencio y una sola llave.",
        features: [
          "Terraza continua",
          "Lounge exterior",
          "Tres suites",
          "Vista 180º",
          "Entrega 2025",
          "Acabado a consulta",
          "Dos cocheras",
          "A 60 m de la arena",
        ],
      },
    },
  },
  {
    id: "mare",
    kind: "house",
    price: 980000,
    beds: 2,
    baths: 3,
    area: 142,
    floor: null,
    year: 2022,
    beach: 650,
    image: g.mare,
    gallery: [g.mare, g.suite, g.fachada, g.cozinha],
    featured: false,
    copy: {
      pt: {
        name: "Casa Maré",
        place: "Lagoa",
        blurb: "Casa baixa à beira da lagoa, duas suítes e jardim já formado.",
        description:
          "A Maré é a opção mais quieta do portfólio: volume baixo, vidro corrido e a lagoa como vizinha. Duas suítes, jardim consolidado e uma caminhada até a vila. Funciona como casa de fim de semana ou como base para quem trabalha remoto e quer água parada em vez de vento.",
        features: [
          "Frente para a lagoa",
          "Duas suítes",
          "Jardim formado",
          "Planta térrea",
          "Escritório",
          "Pronto para morar",
          "Baixa manutenção",
          "Acesso à vila",
        ],
      },
      en: {
        name: "Casa Maré",
        place: "Lagoon",
        blurb: "A low house on the lagoon, two suites and a garden already grown in.",
        description:
          "Maré is the quietest option in the portfolio: a low volume, a run of glass and the lagoon as a neighbour. Two suites, a settled garden and a walk into the village. It works as a weekend house or as a base for someone working remotely who wants still water rather than wind.",
        features: [
          "Lagoon frontage",
          "Two suites",
          "Established garden",
          "Single storey",
          "Study",
          "Ready to live in",
          "Low maintenance",
          "Walk to the village",
        ],
      },
      es: {
        name: "Casa Maré",
        place: "Laguna",
        blurb: "Casa baja junto a la laguna, dos suites y jardín ya formado.",
        description:
          "Maré es la opción más quieta del portafolio: volumen bajo, vidrio corrido y la laguna como vecina. Dos suites, jardín consolidado y una caminata hasta el pueblo. Sirve como casa de fin de semana o como base para quien trabaja a distancia y prefiere agua quieta al viento.",
        features: [
          "Frente a la laguna",
          "Dos suites",
          "Jardín formado",
          "Planta baja",
          "Estudio",
          "Lista para vivir",
          "Bajo mantenimiento",
          "Acceso al pueblo",
        ],
      },
    },
  },
  {
    id: "brisa-lote",
    kind: "land",
    price: 620000,
    beds: 0,
    baths: 0,
    area: 720,
    floor: null,
    year: 2025,
    beach: 120,
    image: g.lote,
    gallery: [g.lote, g.hero, g.dunas, g.fachada],
    featured: false,
    copy: {
      pt: {
        name: "Lote Brisa",
        place: "Orla sul",
        blurb: "720 m² com coqueiros e frente generosa para quem quer projetar a própria casa.",
        description:
          "O Lote Brisa é terreno próprio, escriturado, com testada para a faixa de areia e coqueiros já no lote. A Golden Gate não impõe um projeto: acompanha o comprador na leitura de recuos e na escolha de quem constrói. É a peça do portfólio para quem chega com arquiteto na mala.",
        features: [
          "720 m²",
          "Escritura da casa",
          "Coqueiros no lote",
          "A 120 m da areia",
          "Topografia plana",
          "Acesso pavimentado",
          "Sem construção",
          "Apoio de projeto sob consulta",
        ],
      },
      en: {
        name: "Lote Brisa",
        place: "South shore",
        blurb: "720 sq m with palms and a generous frontage for someone who will design their own house.",
        description:
          "Lote Brisa is company-owned land, deeded, facing the sand belt with palms already on the plot. Golden Gate does not impose a design: it walks the buyer through setbacks and the choice of who builds. The piece of the portfolio for someone who arrives with an architect in the suitcase.",
        features: [
          "720 sq m",
          "Company deed",
          "Palms on the plot",
          "120 m from the sand",
          "Flat topography",
          "Paved access",
          "No building yet",
          "Design support on request",
        ],
      },
      es: {
        name: "Lote Brisa",
        place: "Orilla sur",
        blurb: "720 m² con cocoteros y frente generoso para quien quiere proyectar su propia casa.",
        description:
          "Lote Brisa es terreno propio, escriturado, con frente a la franja de arena y cocoteros ya en el lote. Golden Gate no impone un proyecto: acompaña al comprador en los retiros y en la elección de quién construye. La pieza del portafolio para quien llega con arquitecto en la maleta.",
        features: [
          "720 m²",
          "Escritura de la casa",
          "Cocoteros en el lote",
          "A 120 m de la arena",
          "Topografía plana",
          "Acceso pavimentado",
          "Sin construcción",
          "Apoyo de proyecto a consulta",
        ],
      },
    },
  },
  {
    id: "flat-brisa",
    kind: "studio",
    price: 540000,
    beds: 1,
    baths: 1,
    area: 42,
    floor: 3,
    year: 2024,
    beach: 180,
    image: g.flat,
    gallery: [g.flat, g.cozinha, g.fachada, g.atlantico],
    featured: false,
    copy: {
      pt: {
        name: "Flat Brisa",
        place: "Vila",
        blurb: "42 m² prontos, uma suíte e a porta de entrada do portfólio.",
        description:
          "O Flat Brisa é o imóvel de quem quer uma chave em Paracuru sem assumir uma casa. Estúdio de 42 m², cama, estar e uma cozinha curta, no terceiro andar, a uma caminhada da vila e da praia. Funciona como base própria ou como estadia de temporada administrada à parte — a Golden Gate vende a unidade, não opera hotel.",
        features: [
          "42 m²",
          "Uma suíte",
          "Mobiliado com linho",
          "Terceiro andar",
          "A 180 m da areia",
          "Condomínio baixo",
          "Pronto para usar",
          "Ideal para primeira chave",
        ],
      },
      en: {
        name: "Flat Brisa",
        place: "Village",
        blurb: "42 sq m, ready, one suite, and the front door of the portfolio.",
        description:
          "Flat Brisa is for someone who wants a key in Paracuru without taking on a house. A 42 sq m studio — bed, sitting area and a short kitchen — on the third floor, a walk from the village and the beach. It works as a private base or as a seasonal stay run separately. Golden Gate sells the unit; it does not operate a hotel.",
        features: [
          "42 sq m",
          "One suite",
          "Dressed in linen",
          "Third floor",
          "180 m from the sand",
          "Low service charge",
          "Ready to use",
          "A first key",
        ],
      },
      es: {
        name: "Flat Brisa",
        place: "Pueblo",
        blurb: "42 m² listos, una suite y la puerta de entrada del portafolio.",
        description:
          "Flat Brisa es el inmueble de quien quiere una llave en Paracuru sin asumir una casa. Estudio de 42 m², cama, estar y una cocina corta, en el tercer piso, a un paseo del pueblo y de la playa. Funciona como base propia o como estadía de temporada administrada aparte. Golden Gate vende la unidad; no opera un hotel.",
        features: [
          "42 m²",
          "Una suite",
          "Vestido en lino",
          "Tercer piso",
          "A 180 m de la arena",
          "Expensas bajas",
          "Listo para usar",
          "Ideal como primera llave",
        ],
      },
    },
  },
];

export const galleryImages = [
  g.hero,
  g.atlantico,
  g.dunas,
  g.cobertura,
  g.mare,
  g.cozinha,
  g.suite,
  g.fachada,
  g.flat,
  g.lote,
];

export function getProperty(id: string) {
  return properties.find((p) => p.id === id);
}

export type Person = {
  id: string;
  initials: string;
  langs: string[];
  copy: Record<Lang, { name: string; role: string; bio: string }>;
};

export const team: Person[] = [
  {
    id: "marina",
    initials: "MC",
    langs: ["PT", "EN"],
    copy: {
      pt: {
        name: "Marina Costa",
        role: "Diretora comercial",
        bio: "Conduz visitas, proposta e escritura. É a primeira pessoa que o comprador encontra na sala de Paracuru.",
      },
      en: {
        name: "Marina Costa",
        role: "Commercial director",
        bio: "She runs visits, offers and the deed. She is the first person a buyer meets in the Paracuru room.",
      },
      es: {
        name: "Marina Costa",
        role: "Directora comercial",
        bio: "Conduce visitas, propuesta y escritura. Es la primera persona que el comprador encuentra en la sala de Paracuru.",
      },
    },
  },
  {
    id: "andre",
    initials: "AL",
    langs: ["PT", "EN"],
    copy: {
      pt: {
        name: "André Lima",
        role: "Relações com investidores",
        bio: "Organiza comparativos de preço por metro, prazo de escritura e a leitura fria de cada endereço do portfólio.",
      },
      en: {
        name: "André Lima",
        role: "Investor relations",
        bio: "He prepares price-per-metre comparisons, deed timing and a cool reading of every address in the portfolio.",
      },
      es: {
        name: "André Lima",
        role: "Relación con inversores",
        bio: "Organiza comparativos de precio por metro, plazo de escritura y una lectura fría de cada dirección del portafolio.",
      },
    },
  },
  {
    id: "sofia",
    initials: "SM",
    langs: ["PT", "EN", "ES"],
    copy: {
      pt: {
        name: "Sofia Martins",
        role: "Atendimento internacional",
        bio: "Recebe quem compra a partir da Europa ou da América hispânica e traduz a documentação sem teatralizar o processo.",
      },
      en: {
        name: "Sofia Martins",
        role: "International desk",
        bio: "She receives buyers coming from Europe or Spanish-speaking America and translates the paperwork without theatre.",
      },
      es: {
        name: "Sofia Martins",
        role: "Atención internacional",
        bio: "Recibe a quien compra desde Europa o Hispanoamérica y traduce la documentación sin teatralizar el proceso.",
      },
    },
  },
];

export const services: Record<Lang, { title: string; body: string }[]> = {
  pt: [
    { title: "Venda de imóvel próprio", body: "Apartamento, casa, cobertura, flat e terreno. O anúncio é da Golden Gate, a escritura também." },
    { title: "Visita privada", body: "Horário marcado na orla, na lagoa ou no lote. Sem plantão aberto e sem fila na porta." },
    { title: "Comprador de fora", body: "CPF, procuração e câmbio explicados em inglês ou espanhol, com a mesa internacional." },
    { title: "Acabamento sob consulta", body: "Na Cobertura Horizonte ainda há margem para pedra, tecido e marcenaria antes da entrega." },
  ],
  en: [
    { title: "Sale of company property", body: "Apartment, house, penthouse, studio and land. The listing is Golden Gate’s, and so is the deed." },
    { title: "Private visit", body: "A set time on the shore, the lagoon or the plot. No open house, no queue at the door." },
    { title: "Buyers from abroad", body: "CPF, power of attorney and currency explained in English or Spanish, with the international desk." },
    { title: "Finishes by consultation", body: "At Cobertura Horizonte there is still room for stone, fabric and joinery before delivery." },
  ],
  es: [
    { title: "Venta de inmueble propio", body: "Apartamento, casa, ático, estudio y terreno. El anuncio es de Golden Gate, la escritura también." },
    { title: "Visita privada", body: "Hora marcada en la orilla, la laguna o el lote. Sin casa abierta y sin fila en la puerta." },
    { title: "Comprador de fuera", body: "CPF, poder y cambio explicados en inglés o español, con la mesa internacional." },
    { title: "Acabado a consulta", body: "En Cobertura Horizonte todavía hay margen para piedra, tela y carpintería antes de la entrega." },
  ],
};

export const faqs: Record<Lang, { q: string; a: string }[]> = {
  pt: [
    { q: "A Golden Gate é imobiliária de terceiros?", a: "Não. A atividade é compra e venda de imóveis próprios. O que está no site é portfólio da casa." },
    { q: "Onde fica o escritório?", a: "Rua Domingos Paulino, 31, Sala 2, Paracuru — CE, CEP 62.680-000. Cerca de 80 km de Fortaleza." },
    { q: "Atendem em outros idiomas?", a: "Sim. O site, o chat e a mesa comercial operam em português, inglês e espanhol." },
    { q: "Como funciona a visita?", a: "Pelo formulário de contato ou pelo chat. Escolha o imóvel e um dia. A equipe confirma o horário." },
    { q: "Há financiamento?", a: "A casa conversa sobre condição de pagamento caso a caso. Não há simulação de banco dentro deste site." },
    { q: "Estrangeiro pode comprar?", a: "Pode. Sofia Martins conduz a documentação. Imóvel urbano em área não rural segue o rito comum, com CPF e representação se o comprador não estiver no Brasil." },
  ],
  en: [
    { q: "Does Golden Gate list other people’s homes?", a: "No. The activity is the purchase and sale of company-owned property. What is on the site is the house portfolio." },
    { q: "Where is the office?", a: "Rua Domingos Paulino, 31, Sala 2, Paracuru — CE, postcode 62.680-000. About 80 km from Fortaleza." },
    { q: "Do you work in other languages?", a: "Yes. The site, the chat and the sales desk run in Portuguese, English and Spanish." },
    { q: "How does a visit work?", a: "Through the contact form or the chat. Pick a home and a day. The team confirms the time." },
    { q: "Is there financing?", a: "The house discusses payment terms case by case. There is no bank simulator on this site." },
    { q: "Can a foreigner buy?", a: "Yes. Sofia Martins handles the paperwork. An urban home outside a rural zone follows the ordinary path, with a CPF and representation if the buyer is not in Brazil." },
  ],
  es: [
    { q: "¿Golden Gate lista inmuebles de terceros?", a: "No. La actividad es compra y venta de inmuebles propios. Lo que está en el sitio es el portafolio de la casa." },
    { q: "¿Dónde está la oficina?", a: "Rua Domingos Paulino, 31, Sala 2, Paracuru — CE, CEP 62.680-000. A unos 80 km de Fortaleza." },
    { q: "¿Atienden en otros idiomas?", a: "Sí. El sitio, el chat y la mesa comercial operan en portugués, inglés y español." },
    { q: "¿Cómo funciona la visita?", a: "Por el formulario de contacto o por el chat. Elija el inmueble y un día. El equipo confirma el horario." },
    { q: "¿Hay financiación?", a: "La casa conversa la condición de pago caso a caso. No hay simulador de banco en este sitio." },
    { q: "¿Un extranjero puede comprar?", a: "Puede. Sofia Martins conduce la documentación. Un inmueble urbano fuera de zona rural sigue el rito común, con CPF y representación si el comprador no está en Brasil." },
  ],
};

export const quotes: Record<Lang, { quote: string; name: string; place: string }[]> = {
  pt: [
    { quote: "A visita durou o tempo certo. Vi o Atlântico com quem podia falar de escritura, não com um folheto.", name: "Helena Duarte", place: "São Paulo" },
    { quote: "Comprei de Lisboa. O inglês da mesa foi direto, sem adjetivo sobrando.", name: "Thomas Keller", place: "Lisboa" },
    { quote: "O lote estava como o anúncio. Coqueiro, medida e silêncio.", name: "Camila Rocha", place: "Fortaleza" },
  ],
  en: [
    { quote: "The visit lasted the right amount of time. I saw Atlântico with someone who could talk about the deed, not a brochure.", name: "Helena Duarte", place: "São Paulo" },
    { quote: "I bought from Lisbon. The English at the desk was direct, with no spare adjective.", name: "Thomas Keller", place: "Lisbon" },
    { quote: "The plot was as advertised. Palm, measure and quiet.", name: "Camila Rocha", place: "Fortaleza" },
  ],
  es: [
    { quote: "La visita duró el tiempo justo. Vi el Atlântico con quien podía hablar de escritura, no con un folleto.", name: "Helena Duarte", place: "São Paulo" },
    { quote: "Compré desde Lisboa. El inglés de la mesa fue directo, sin adjetivo de más.", name: "Thomas Keller", place: "Lisboa" },
    { quote: "El lote estaba como el anuncio. Cocotero, medida y silencio.", name: "Camila Rocha", place: "Fortaleza" },
  ],
};
