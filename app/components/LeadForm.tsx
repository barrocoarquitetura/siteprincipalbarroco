"use client";

import { FormEvent } from "react";

type LeadFormProps = {
  defaultService?: string;
};

const formConversionId = "AW-614157022/KLJACJyUorQDEN6V7aQC";
const analyticsMeasurementId = "G-YED0X4J78V";

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (command: "event", eventName: string, parameters: Record<string, unknown>) => void;
};

export function LeadForm({ defaultService = "" }: LeadFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = Object.fromEntries(form.entries());
    const message = [
      "Olá, Barroco Arquitetura. Gostaria de avaliar meu projeto.",
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

    const destination = `https://api.whatsapp.com/send?phone=551127630517&text=${encodeURIComponent(message)}`;
    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.dataLayer?.push({
      event: "lead_form_whatsapp",
      service: fields.service,
      property_type: fields.property,
    });

    analyticsWindow.gtag?.("event", "lead_form_whatsapp", {
      send_to: analyticsMeasurementId,
      service: fields.service,
      property_type: fields.property,
    });

    let redirected = false;
    const redirectToWhatsApp = () => {
      if (redirected) return;
      redirected = true;
      window.location.assign(destination);
    };

    if (typeof analyticsWindow.gtag === "function") {
      analyticsWindow.gtag("event", "conversion", {
        send_to: formConversionId,
        event_callback: redirectToWhatsApp,
      });
      window.setTimeout(redirectToWhatsApp, 1200);
    } else {
      redirectToWhatsApp();
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Nome</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>WhatsApp</span>
          <input name="phone" type="tel" autoComplete="tel" required />
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
          <textarea name="message" rows={4} />
        </label>
      </div>
      <button className="button button--form" type="submit">Enviar pelo WhatsApp <span aria-hidden="true">→</span></button>
      <p className="form-note">Ao continuar, suas respostas serão inseridas em uma mensagem no WhatsApp. Revise antes de enviar.</p>
    </form>
  );
}
