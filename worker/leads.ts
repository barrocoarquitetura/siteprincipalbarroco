const allowedOrigins = new Set([
  "https://www.barrocoarquitetura.com.br",
  "https://barrocoarquitetura.com.br",
  "https://barroco-arquitetura-residencial.luizcontatoarquiteto.chatgpt.site",
]);

const allowedProperties = new Set([
  "Apartamento",
  "Casa",
  "Terreno para nova casa",
  "Loja ou espaço comercial",
  "Escritório",
]);

const allowedServices = new Set([
  "Projeto de interiores para apartamento",
  "Projeto arquitetônico ou de interiores para casa",
  "Reforma residencial completa",
  "Projeto ou obra comercial / escritório",
  "Projeto, obra e marcenaria",
]);

const allowedTimelines = new Set([
  "Nos próximos 3 meses",
  "Entre 3 e 6 meses",
  "Entre 6 e 12 meses",
  "Estou apenas pesquisando",
]);

const consentVersion = "2026-08-26";

type LeadPayload = {
  clientSubmissionId?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  location?: unknown;
  property?: unknown;
  area?: unknown;
  service?: unknown;
  timeline?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
  attribution?: {
    gclid?: unknown;
    gbraid?: unknown;
    wbraid?: unknown;
    gaClientId?: unknown;
    utmSource?: unknown;
    utmMedium?: unknown;
    utmCampaign?: unknown;
    utmTerm?: unknown;
    utmContent?: unknown;
    landingPage?: unknown;
    pageUrl?: unknown;
    referrer?: unknown;
  };
};

type ValidLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  property: string;
  area: number;
  service: string;
  timeline: string;
  message: string;
  consentAt: string;
  attribution: {
    gclid: string | null;
    gbraid: string | null;
    wbraid: string | null;
    gaClientId: string | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    utmTerm: string | null;
    utmContent: string | null;
    landingPage: string;
    pageUrl: string;
    referrer: string | null;
  };
};

function corsHeaders(origin: string) {
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    "cache-control": "no-store",
    vary: "Origin",
  };
}

function json(origin: string, body: unknown, status: number) {
  return Response.json(body, { status, headers: corsHeaders(origin) });
}

function textValue(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function optionalText(value: unknown, maxLength: number) {
  const normalized = textValue(value, maxLength);
  return normalized || null;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) return `+55${digits}`;
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) return `+${digits}`;
  return "";
}

function safePageUrl(value: unknown, fallback: string) {
  const raw = textValue(value, 500);
  if (!raw) return fallback;
  try {
    const url = new URL(raw);
    return allowedOrigins.has(url.origin) ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

function validate(payload: LeadPayload, origin: string): { lead?: ValidLead; error?: string; spam?: boolean } {
  if (textValue(payload.website, 200)) return { spam: true };

  const id = textValue(payload.clientSubmissionId, 64);
  const name = textValue(payload.name, 100);
  const email = textValue(payload.email, 254).toLowerCase();
  const phone = normalizePhone(textValue(payload.phone, 30));
  const location = textValue(payload.location, 160);
  const property = textValue(payload.property, 80);
  const service = textValue(payload.service, 120);
  const timeline = textValue(payload.timeline, 80);
  const message = textValue(payload.message, 2000);
  const area = Number(payload.area);
  const attribution = payload.attribution ?? {};

  if (!isUuid(id)) return { error: "Identificador de envio inválido." };
  if (name.length < 2) return { error: "Informe seu nome." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Informe um e-mail válido." };
  if (!phone) return { error: "Informe um WhatsApp com DDD." };
  if (location.length < 3) return { error: "Informe o bairro e a cidade do projeto." };
  if (!allowedProperties.has(property)) return { error: "Selecione o tipo de imóvel." };
  if (!Number.isInteger(area) || area < 20 || area > 5000) return { error: "Informe uma área válida entre 20 e 5.000 m²." };
  if (!allowedServices.has(service)) return { error: "Selecione o serviço desejado." };
  if (!allowedTimelines.has(timeline)) return { error: "Selecione o prazo do projeto." };
  if (payload.consent !== true) return { error: "Autorize o uso dos dados para prosseguir." };

  const fallbackUrl = `${origin}/`;
  return {
    lead: {
      id,
      name,
      email,
      phone,
      location,
      property,
      area,
      service,
      timeline,
      message,
      consentAt: new Date().toISOString(),
      attribution: {
        gclid: optionalText(attribution.gclid, 500),
        gbraid: optionalText(attribution.gbraid, 500),
        wbraid: optionalText(attribution.wbraid, 500),
        gaClientId: optionalText(attribution.gaClientId, 100),
        utmSource: optionalText(attribution.utmSource, 200),
        utmMedium: optionalText(attribution.utmMedium, 200),
        utmCampaign: optionalText(attribution.utmCampaign, 300),
        utmTerm: optionalText(attribution.utmTerm, 300),
        utmContent: optionalText(attribution.utmContent, 300),
        landingPage: safePageUrl(attribution.landingPage, fallbackUrl),
        pageUrl: safePageUrl(attribution.pageUrl, fallbackUrl),
        referrer: optionalText(attribution.referrer, 500),
      },
    },
  };
}

function leadReference(id: string, now = new Date()) {
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  return `BA-${date}-${id.slice(0, 6).toUpperCase()}`;
}

function requestOrigin(request: Request) {
  const origin = request.headers.get("origin") ?? "";
  return allowedOrigins.has(origin) ? origin : null;
}

export async function handleLeadOptions(request: Request) {
  const origin = requestOrigin(request);
  if (!origin) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export async function handleLeadPost(request: Request, database: D1Database) {
  const origin = requestOrigin(request);
  if (!origin) return Response.json({ error: "Origem não autorizada." }, { status: 403 });

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > 16_384) return json(origin, { error: "Envio muito grande." }, 413);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json(origin, { error: "Formato de envio inválido." }, 415);
  }

  let payload: LeadPayload;
  try {
    const raw = await request.text();
    if (raw.length > 16_384) return json(origin, { error: "Envio muito grande." }, 413);
    payload = JSON.parse(raw) as LeadPayload;
  } catch {
    return json(origin, { error: "Não foi possível ler os dados enviados." }, 400);
  }

  const validation = validate(payload, origin);
  if (validation.spam) return json(origin, { ok: false }, 202);
  if (!validation.lead) return json(origin, { error: validation.error }, 422);

  const lead = validation.lead;
  const reference = leadReference(lead.id);

  try {
    const insert = database.prepare(`
      INSERT OR IGNORE INTO leads (
        id, reference, name, email, phone, location, property_type,
        area_square_meters, service, timeline, message, consent_at,
        consent_version, gclid, gbraid, wbraid, ga_client_id, utm_source,
        utm_medium, utm_campaign, utm_term, utm_content, landing_page,
        page_url, referrer
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      lead.id,
      reference,
      lead.name,
      lead.email,
      lead.phone,
      lead.location,
      lead.property,
      lead.area,
      lead.service,
      lead.timeline,
      lead.message,
      lead.consentAt,
      consentVersion,
      lead.attribution.gclid,
      lead.attribution.gbraid,
      lead.attribution.wbraid,
      lead.attribution.gaClientId,
      lead.attribution.utmSource,
      lead.attribution.utmMedium,
      lead.attribution.utmCampaign,
      lead.attribution.utmTerm,
      lead.attribution.utmContent,
      lead.attribution.landingPage,
      lead.attribution.pageUrl,
      lead.attribution.referrer,
    );
    const select = database.prepare(
      "SELECT id, reference, created_at AS createdAt FROM leads WHERE id = ? LIMIT 1",
    ).bind(lead.id);
    const [, selected] = await database.batch([insert, select]);
    const saved = selected.results?.[0] as { id?: string; reference?: string; createdAt?: string } | undefined;

    if (!saved?.id || !saved.reference) throw new Error("Lead was not persisted");
    return json(origin, { ok: true, lead: saved }, 201);
  } catch (error) {
    console.error("lead_insert_failed", error instanceof Error ? error.message : "unknown");
    return json(origin, { error: "Não foi possível registrar o contato. Tente novamente." }, 503);
  }
}
