"use client";

import { useEffect } from "react";

const whatsappConversionId = "AW-614157022/bWIoCP-morQDEN6V7aQC";

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (command: "event", eventName: string, parameters: Record<string, unknown>) => void;
};

export function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.href;
      let eventName = "";
      if (/wa\.me|api\.whatsapp\.com/.test(href)) eventName = "whatsapp_click";
      else if (href.startsWith("tel:")) eventName = "phone_click";
      else if (href.startsWith("mailto:")) eventName = "email_click";
      if (!eventName) return;

      const analyticsWindow = window as AnalyticsWindow;
      analyticsWindow.dataLayer?.push({
        event: eventName,
        page_path: window.location.pathname,
        link_url: href,
      });
      if (eventName === "whatsapp_click" && typeof analyticsWindow.gtag === "function") {
        analyticsWindow.gtag("event", "conversion", { send_to: whatsappConversionId });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
