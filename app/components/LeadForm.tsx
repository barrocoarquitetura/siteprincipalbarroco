"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type LeadFormProps = {
  defaultService?: string;
};

const formConversionId = "AW-614157022/KLJACJyUorQDEN6V7aQC";
const analyticsMeasurementId = "G-YED0X4J78V";
const leadApiUrl = "https://barroco-arquitetura-residencial.luizcontatoarquiteto.chatgpt.site/api/leads";
const attributionStorageKey = "barroco_attribution_v1";

type AnalyticsWindow = Window & {
  dataLayer?: Array<unknown>;
  gtag?: (...parameters: unknown[]) => void;
};

type Attribution = {
  gclid: string;
  gbraid: string;
  wbraid: string;
  gaClientId: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  landingPage: string;
  pageUrl: string;
  referrer: string;
};

type LeadResponse = {
  ok?: boolean;
  error?: string;
  lead?: { id?: string; reference?: string };
};

function cookieValue(name: string) {
  const prefix = `${encodeURIComponent(name)}=`;
  const cookie = document.cookie.split("; ").find((item) => item.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : "";
}

function googleClickIdFromCookie() {
  const value = cookieValue("_gcl_aw");
  return value.split(".").slice(2).join(".");
}

function googleAnalyticsClientId() {
  const parts = cookieValue("_ga").split(".");
  return parts.length >= 4 ? parts.slice(-2).join(".") : "";
}

function readAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  let stored: Partial<Attribution> = {};
  try {
    stored = JSON.parse(window.localStorage.getItem(attributionStorageKey) ?? "{}") as Partial<Attribution>;
  } catch {
    stored = {};
  }

  const attribution: Attribution = {
    gclid: params.get("gclid") || googleClickIdFromCookie() || stored.gclid || "",
    gbraid: params.get("gbraid") || stored.gbraid || "",
    wbraid: params.get("wbraid") || stored.wbraid || "",
    gaClientId: googleAnalyticsClientId() || stored.gaClientId || "",
    utmSource: params.get("utm_source") || stored.utmSource || "",
    utmMedium: params.get("utm_medium") || stored.utmMedium || "",
    utmCampaign: params.get("utm_campaign") || stored.utmCampaign || "",
    utmTerm: params.get("utm_term") || stored.utmTerm || "",
    utmContent: params.get("utm_content") || stored.utmContent || "",
    landingPage: stored.landingPage || window.location.href,
    pageUrl: window.location.href,
    referrer: stored.referrer || document.referrer,
  };

  try {
    window.localStorage.setItem(attributionStorageKey, JSON.stringify(attribution));
  } catch {
    // Attribution still travels with this submission when storage is unavailable.
  }
  return attribution;
}

function normalizedPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) return `+55${digits}`;
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) return `+${digits}`;
  return value;
}

function whatsappMessage(fields: Record<string, FormDataEntryValue>, reference?: string) {
  return [
    "Olá, Barroco Arquitetura. Gostaria de avaliar meu projeto.",
    reference ? `Código do contato: ${reference}` : "",
    "",
    `Nome: ${fields.name}`,
    `E-mail: ${fields.email}`,
    `Telefone: ${fields.phone}`,
    `Cidade/bairro: ${fields.location}`,
    `Imóvel: ${fields.property}`,
    `Área aproximada: ${fields.area} m²`,
    `Serviço: ${fields.service}`,
    `Prazo: ${fields.timeline}`,
    fields.message ? `Observações: ${fields.message}` : "",
  ].filter(Boolean).join("\n");
}

function whatsappDestination(message: string) {
  return `https://api.whatsapp.com/send?phone=551127630517&text=${encodeURIComponent(message)}`;
}

export function LeadForm({ defaultService = "" }: LeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ tone: "success" | "error"; message: string } | null>(null);
  const [fallbackDestination, setFallbackDestination] = useState("");
  const submissionId = useRef<string | null>(null);

  useEffect(() => {
    readAttribution();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const fields = Object.fromEntries(form.entries());
    const fallback = whatsappDestination(whatsappMessage(fields));
    setFallbackDestination("");
    setStatus(null);
    setSubmitting(true);

    submissionId.current ??= crypto.randomUUID();

    try {
      const response = await fetch(formElement.dataset.leadEndpoint || leadApiUrl, {
        method: "POST",
        mode: "cors",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...fields,
          clientSubmissionId: submissionId.current,
          consent: form.get("consent") === "on",
          attribution: readAttribution(),
        }),
      });
      const result = await response.json() as LeadResponse;
      if (!response.ok || !result.ok || !result.lead?.id || !result.lead.reference) {
        throw new Error(result.error || "Não foi possível registrar o contato.");
      }

      const destination = whatsappDestination(whatsappMessage(fields, result.lead.reference));
      const analyticsWindow = window as AnalyticsWindow;
      analyticsWindow.dataLayer?.push({
        event: "lead_form_whatsapp",
        lead_id: result.lead.id,
        lead_reference: result.lead.reference,
        service: fields.service,
        property_type: fields.property,
      });
      analyticsWindow.gtag?.("set", "user_data", {
        email: String(fields.email).trim().toLowerCase(),
        phone_number: normalizedPhone(String(fields.phone)),
      });
      analyticsWindow.gtag?.("event", "lead_form_whatsapp", {
        send_to: analyticsMeasurementId,
        lead_id: result.lead.id,
        service: fields.service,
        property_type: fields.property,
      });

      setStatus({ tone: "success", message: `Contato ${result.lead.reference} registrado. Abrindo o WhatsApp…` });
      let redirected = false;
      const redirectToWhatsApp = () => {
        if (redirected) return;
        redirected = true;
        window.location.assign(destination);
      };

      if (typeof analyticsWindow.gtag === "function") {
        analyticsWindow.gtag("event", "conversion", {
          send_to: formConversionId,
          transaction_id: result.lead.id,
          event_callback: redirectToWhatsApp,
        });
        window.setTimeout(redirectToWhatsApp, 1600);
      } else {
        redirectToWhatsApp();
      }
    } catch (error) {
      setStatus({
        tone: "error",
        message: error instanceof Error ? error.message : "Não foi possível registrar o contato. Tente novamente.",
      });
      setFallbackDestination(fallback);
      setSubmitting(false);
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} data-lead-endpoint={leadApiUrl}>
      <div className="form-grid">
        <label>
          <span>Nome</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>WhatsApp</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" pattern="[0-9 ()+\-]{10,20}" required />
        </label>
        <label>
          <span>E-mail</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Bairro e cidade do projeto</span>
          <input name="location" autoComplete="address-level2" required />
        </label>
        <label>
          <span>Tipo de imóvel ou espaço</span>
          <select name="property" required defaultValue="">
            <option value="" disabled>Selecione</option>
            <option>Apartamento</option>
            <option>Casa</option>
            <option>Terreno para nova casa</option>
            <option>Loja ou espaço comercial</option>
            <option>Escritório</option>
          </select>
        </label>
        <label>
          <span>Área aproximada em m²</span>
          <input name="area" type="number" min="20" max="5000" required />
        </label>
        <label>
          <span>O que você procura?</span>
          <select name="service" required defaultValue={defaultService}>
            <option value="" disabled>Selecione</option>
            <option value="Projeto de interiores para apartamento">Projeto de apartamento</option>
            <option value="Projeto arquitetônico ou de interiores para casa">Projeto de casa</option>
            <option value="Reforma residencial completa">Reforma residencial</option>
            <option value="Projeto ou obra comercial / escritório">Projeto ou obra comercial</option>
            <option value="Projeto, obra e marcenaria">Projeto + obra + marcenaria</option>
          </select>
        </label>
        <label>
          <span>Quando pretende começar?</span>
          <select name="timeline" required defaultValue="">
            <option value="" disabled>Selecione</option>
            <option>Nos próximos 3 meses</option>
            <option>Entre 3 e 6 meses</option>
            <option>Entre 6 e 12 meses</option>
            <option>Estou apenas pesquisando</option>
          </select>
        </label>
        <label className="form-grid__wide">
          <span>Conte um pouco sobre o projeto</span>
          <textarea name="message" rows={4} maxLength={2000} />
        </label>
        <label className="form-consent form-grid__wide">
          <input name="consent" type="checkbox" required />
          <span>Autorizo a Barroco Arquitetura a usar os dados informados para responder ao meu contato e medir sua origem.</span>
        </label>
        <label className="form-honeypot" aria-hidden="true">
          <span>Website</span>
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="button button--form" type="submit" disabled={submitting}>
        {submitting ? "Registrando contato…" : "Enviar pelo WhatsApp"} <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">Seus dados são registrados com segurança antes da abertura do WhatsApp. Revise a mensagem antes de enviá-la.</p>
      <p data-form-status className={`form-status${status ? ` form-status--${status.tone}` : ""}`} aria-live="polite" role="status" hidden={!status}>
        {status?.message}
      </p>
      <a
        data-form-fallback
        className="form-fallback"
        href={fallbackDestination || "#"}
        hidden={!fallbackDestination}
      >
        Continuar diretamente pelo WhatsApp
      </a>
    </form>
  );
}
