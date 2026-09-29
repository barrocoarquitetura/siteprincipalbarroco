"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { readAttribution, submitLead } from "../lib/lead-tracking.js";

type LeadFormProps = {
  defaultService?: string;
};

const formConversionId = "AW-614157022/KLJACJyUorQDEN6V7aQC";
const googleAdsId = "AW-614157022";
const analyticsMeasurementId = "G-YED0X4J78V";
const leadApiUrl = "https://barroco-arquitetura-residencial.luizcontatoarquiteto.chatgpt.site/api/leads";

type AnalyticsWindow = Window & {
  dataLayer?: Array<unknown>;
  gtag?: (...parameters: unknown[]) => void;
};

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
      const result = await submitLead(formElement.dataset.leadEndpoint || leadApiUrl, {
        ...fields,
        clientSubmissionId: submissionId.current,
        consent: form.get("consent") === "on",
        attribution: readAttribution(),
      });

      const destination = whatsappDestination(whatsappMessage(fields, result.lead.reference));
      const analyticsWindow = window as AnalyticsWindow;
      analyticsWindow.dataLayer?.push({
        event: "lead_form_whatsapp",
        lead_id: result.lead.id,
        lead_reference: result.lead.reference,
        service: fields.service,
        property_type: fields.property,
      });
      const userData = {
        email: String(fields.email).trim().toLowerCase(),
        phone_number: normalizedPhone(String(fields.phone)),
      };
      analyticsWindow.gtag?.("event", "form_submit", {
        send_to: googleAdsId,
        user_data: userData,
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
        analyticsWindow.gtag("set", "user_data", userData);
        analyticsWindow.gtag("event", "conversion", {
          send_to: formConversionId,
          transaction_id: result.lead.id,
          user_data: userData,
          event_timeout: 1500,
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
        {submitting ? "Registrando contato…" : "Solicitar proposta"} <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">Seus dados são registrados com segurança antes da abertura do WhatsApp. Revise a mensagem antes de enviá-la.</p>
      <p data-form-status className={`form-status${status ? ` form-status--${status.tone}` : ""}`} aria-live="polite" role="status" hidden={!status}>
        {status?.message}
      </p>
      <a
        data-form-fallback
        className="form-fallback"
        href="https://api.whatsapp.com/send?phone=551127630517"
        onClick={(event) => {
          if (!fallbackDestination) return;
          event.preventDefault();
          window.location.assign(fallbackDestination);
        }}
        hidden={!fallbackDestination}
      >
        Continuar diretamente pelo WhatsApp
      </a>
    </form>
  );
}
