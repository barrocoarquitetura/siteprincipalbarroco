"use client";

import { useEffect } from "react";

type AnalyticsWindow = Window & { dataLayer?: Array<Record<string, unknown>> };

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

      (window as AnalyticsWindow).dataLayer?.push({
        event: eventName,
        page_path: window.location.pathname,
        link_url: href,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
