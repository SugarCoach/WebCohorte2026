import type { Lang } from "@/lib/translations";

export const CHAT_CHROME: Record<Lang, {
  title: string;
  status: string;
  disclaimer: string;
  inputLabel: string;
  placeholder: string;
  openLabel: string;
  closeLabel: string;
  closeBtnLabel: string;
  sendLabel: string;
  greeting: string;
  menuBtnLabel: string;
  menuPrompt: string;
  emptyMsg: string;
  tooLongMsg: string;
  connectionErrorMsg: string;
}> = {
  es: {
    title: "Asistente SugarCoach",
    status: "En línea",
    disclaimer: "Puedo ayudarte con dudas sobre cómo usar la app. No doy indicaciones médicas ni veo tus datos de salud.",
    inputLabel: "Escribí tu consulta",
    placeholder: "Escribí tu consulta...",
    openLabel: "Abrir el asistente de SugarCoach",
    closeLabel: "Cerrar el asistente de SugarCoach",
    closeBtnLabel: "Cerrar el asistente",
    sendLabel: "Enviar mensaje",
    greeting: "¡Hola! Soy el asistente de SugarCoach. Puedo ayudarte con dudas sobre cómo usar la app. ¿En qué te ayudo?",
    menuBtnLabel: "Ver todas las opciones",
    menuPrompt: "Claro, elegí una opción:",
    emptyMsg: "Escribime tu consulta primero 🙂",
    tooLongMsg: "Tu mensaje es un poco largo, ¿podés resumirlo?",
    connectionErrorMsg: "Tuvimos un problema de conexión. Probá de nuevo en un momento.",
  },
  en: {
    title: "SugarCoach Assistant",
    status: "Online",
    disclaimer: "I can help with questions about how to use the app. I don't give medical advice or see your health data.",
    inputLabel: "Type your question",
    placeholder: "Type your question...",
    openLabel: "Open the SugarCoach assistant",
    closeLabel: "Close the SugarCoach assistant",
    closeBtnLabel: "Close assistant",
    sendLabel: "Send message",
    greeting: "Hi! I'm the SugarCoach assistant. I can help with questions about using the app. What can I help you with?",
    menuBtnLabel: "Show all options",
    menuPrompt: "Sure, pick an option:",
    emptyMsg: "Type your question first 🙂",
    tooLongMsg: "Your message is a bit long, could you shorten it?",
    connectionErrorMsg: "We had a connection problem. Please try again in a moment.",
  },
};

export const TOP_LEVEL_OPTIONS: Record<Lang, string[]> = {
  es: ["Cómo registrar mis datos", "Puntos y logros", "Ver mis reportes", "Cómo enviar datos al médico", "Cómo vincular a mi familia", "Planes y precios", "Hablar con soporte"],
  en: ["How to log my data", "Points and achievements", "View my reports", "How to send data to my doctor", "How to link my family", "Plans and pricing", "Talk to support"],
};

// Palabras clave en los dos idiomas juntas: alguien puede escribir en
// español con la interfaz en inglés (o al revés), y el bot igual
// tiene que entender de qué tema se trata.
const CLINICAL_KEYWORDS = [
  "dosis", "cuanta insulina", "cuánta insulina", "me pongo", "sintoma", "síntoma", "me siento mal",
  "hipoglucemia", "hiperglucemia", "desmay", "emergencia", "me duele", "dolor",
  "dose", "dosage", "how much insulin", "symptom", "i feel sick", "hypoglycemia", "hyperglycemia",
  "passed out", "emergency", "it hurts", "pain",
];

type Topic = {
  id: string;
  keywords: string[];
  reply: Record<Lang, string>;
  options: Record<Lang, string[]>;
};

const TOPICS: Topic[] = [
  {
    id: "registro",
    keywords: ["registrar", "registro", "cargar", "carga", "anotar", "glucosa", "insulina", "comida", "carbohidr",
      "logging", "record", "entry", "glucose", "insulin", "meal", "carb"],
    reply: {
      es: 'Podés registrar glucosa, insulina, comidas y actividad desde el botón "+" en la pantalla principal. Se guarda en segundos y suma puntos a tu racha.',
      en: 'You can log glucose, insulin, meals and activity from the "+" button on the main screen. It saves in seconds and adds points to your streak.',
    },
    options: { es: ["¿Cómo sumo puntos?", "¿Dónde veo mis reportes?"], en: ["How do I earn points?", "Where can I see my reports?"] },
  },
  {
    id: "puntos",
    keywords: ["punto", "puntos", "nivel", "logro", "recompensa", "racha", "estrella",
      "point", "points", "level", "achievement", "reward", "streak", "star"],
    reply: {
      es: "Ganás puntos por cada registro diario completo. Los puntos suben tu nivel y desbloquean logros — nunca califican tus valores de glucosa, solo tu constancia.",
      en: "You earn points for every complete daily log. Points level you up and unlock achievements — they never grade your glucose values, only your consistency.",
    },
    options: { es: ["¿Cómo registro mis datos?", "¿Qué incluye cada plan?"], en: ["How do I log my data?", "What's included in each plan?"] },
  },
  {
    id: "reportes",
    keywords: ["reporte", "grafico", "gráfico", "tiempo en rango", "tir", "estadistica", "estadística", "historial",
      "report", "chart", "graph", "time in range", "statistics", "history"],
    reply: {
      es: "En la sección de Reportes vas a encontrar tu Tiempo en Rango (TIR) y el cruce de glucosa vs. insulina, listos para compartir en tu consulta.",
      en: "In the Reports section you'll find your Time in Range (TIR) and the glucose vs. insulin comparison, ready to share at your appointment.",
    },
    options: { es: ["Hablar con alguien del equipo"], en: ["Talk to someone on the team"] },
  },
  {
    id: "compartir_datos",
    keywords: ["datos al medico", "datos al médico", "enviar datos", "compartir datos", "mandar datos", "codigo qr", "código qr",
      "send data", "share data", "data to my doctor", "data to the doctor", "doctor scan", "qr code"],
    reply: {
      es: "Escaneá el código QR que te comparte tu médico y tus datos se envían automáticamente — no hace falta exportar ni mandar nada a mano.",
      en: "Scan the QR code your doctor shares with you and your data is sent automatically — no need to export or send anything by hand.",
    },
    options: { es: [], en: [] },
  },
  {
    id: "tratamiento",
    keywords: ["tratamiento", "rango", "hipo", "hiper", "target", "dosis basal", "esquema",
      "treatment", "range", "low target", "high target", "basal dose", "regimen"],
    reply: {
      es: 'En "Tratamiento" configurás tus rangos objetivo (hipo, target, hiper) junto con tu profesional de salud. Yo no puedo definir esos valores por vos.',
      en: 'In "Treatment" you set your target ranges (low, target, high) together with your healthcare professional. I can\'t set those values for you.',
    },
    options: { es: ["Hablar con alguien del equipo"], en: ["Talk to someone on the team"] },
  },
  {
    id: "telemedicina",
    keywords: ["telemedicina", "turno", "consulta", "medico", "médico", "doctora", "doctor", "videollamada", "cita",
      "telehealth", "appointment", "video call", "physician"],
    reply: {
      es: 'Podés agendar una consulta de telemedicina desde la sección "Mi equipo". Vas a ver los horarios disponibles de tu profesional asignado.',
      en: 'You can schedule a telehealth visit from the "My team" section. You\'ll see the available times for your assigned professional.',
    },
    options: { es: ["Hablar con alguien del equipo"], en: ["Talk to someone on the team"] },
  },
  {
    id: "planes",
    keywords: ["plan", "precio", "premium", "gratis", "suscripcion", "suscripción", "pagar", "costo",
      "price", "pricing", "free", "subscription", "pay", "cost"],
    reply: {
      es: "El plan gratuito incluye registro y reportes básicos por 60 días. El plan Premium suma telemedicina ilimitada y reportes avanzados.",
      en: "The free plan includes basic logging and reports for 60 days. The Premium plan adds unlimited telehealth and advanced reports.",
    },
    options: { es: ["Hablar con alguien del equipo"], en: ["Talk to someone on the team"] },
  },
  {
    id: "familia",
    keywords: ["familia", "padre", "madre", "cuidador", "conectar", "vincular", "compartir acceso",
      "family", "parent", "caregiver", "connect", "link", "share access"],
    reply: {
      es: "Generá un código QR desde la app y pedile a tu familiar que lo escanee desde la suya — el vínculo se crea automáticamente, sin pasos extra.",
      en: "Generate a QR code from the app and have your family member scan it from theirs — the link is created automatically, no extra steps.",
    },
    options: { es: ["¿Cómo registro mis datos?"], en: ["How do I log my data?"] },
  },
  {
    id: "soporte",
    keywords: ["soporte", "ayuda humana", "hablar con alguien", "contacto", "persona", "humano",
      "support", "human help", "talk to someone", "contact", "human"],
    reply: {
      es: "Te dejo el contacto de soporte: soporte@sugar.coach. Un humano te responde a la brevedad.",
      en: "Here's our support contact: soporte@sugar.coach. A person will get back to you shortly.",
    },
    options: { es: [], en: [] },
  },
];

const CLINICAL_REDIRECT = {
  reply: {
    es: "No puedo darte indicaciones médicas — eso lo tiene que ver tu equipo de salud. Puedo ayudarte con cómo usar la app, o coordinar que hables con tu equipo.",
    en: "I can't give medical advice — that's something your healthcare team needs to handle. I can help with how to use the app, or connect you with your team.",
  },
  options: {
    es: ["Hablar con alguien del equipo", "¿Cómo registro mis datos?"],
    en: ["Talk to someone on the team", "How do I log my data?"],
  },
};

const FALLBACK_REPLY: Record<Lang, string> = {
  es: "No estoy seguro de haber entendido. Elegí una opción, o contame con otras palabras:",
  en: "I'm not sure I understood. Pick an option, or tell me in other words:",
};

export type ClassifyResult = { reply: string; options: string[] };

/**
 * Misma lógica que el flujo de n8n (sugarcoach-chat-n8n-workflow.json):
 * primero el filtro clínico determinístico, después el match de temas,
 * y si no matchea nada, el fallback muestra el menú completo.
 */
export function classify(text: string, lang: Lang): ClassifyResult {
  const t = text.toLowerCase();

  if (CLINICAL_KEYWORDS.some((k) => t.includes(k))) {
    return { reply: CLINICAL_REDIRECT.reply[lang], options: CLINICAL_REDIRECT.options[lang] };
  }

  const topic = TOPICS.find((tp) => tp.keywords.some((k) => t.includes(k)));
  if (topic) return { reply: topic.reply[lang], options: [] };

  // Excepción: si el bot no entendió, SÍ mostramos el menú -- es el único
  // caso donde el usuario no tiene otra pista de por dónde seguir.
  return { reply: FALLBACK_REPLY[lang], options: TOP_LEVEL_OPTIONS[lang] };
}
