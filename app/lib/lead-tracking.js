// Shared by React and the generated FTP runtime. Do not merge fields across touches.
const storageKey = "barroco_attribution_v2";
const ttl = 90 * 24 * 60 * 60 * 1000;

export function readAttribution() {
  const now = Date.now();
  const params = new URLSearchParams(window.location.search);
  let stored = {};
  try {
    stored = JSON.parse(window.localStorage.getItem(storageKey) || "{}") || {};
  } catch { /* Storage can be unavailable. */ }
  const valid = (touch) => touch && Number.isFinite(touch.capturedAt) &&
    now >= touch.capturedAt && now - touch.capturedAt < ttl;
  let external = false;
  try {
    const host = (url) => new URL(url).hostname.replace(/^www\./, "");
    external = Boolean(document.referrer) && host(document.referrer) !== host(window.location.href);
  } catch { /* Invalid referrers are not attribution signals. */ }
  const tagged = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
    .some((key) => Boolean(params.get(key)));
  const fresh = {
    gclid: params.get("gclid") || "",
    gbraid: params.get("gbraid") || "",
    wbraid: params.get("wbraid") || "",
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
    landingPage: window.location.href,
    referrer: document.referrer,
    capturedAt: now,
  };
  // Repeated reads on the same landing page must not extend the expiry.
  const sameLanding = valid(stored.lastTouch) && stored.lastTouch.landingPage === fresh.landingPage &&
    stored.lastTouch.referrer === fresh.referrer;
  const lastTouch = valid(stored.lastTouch) && (!(tagged || external) || sameLanding) ? stored.lastTouch : fresh;
  const firstTouch = valid(stored.firstTouch) ? stored.firstTouch : lastTouch;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify({ firstTouch, lastTouch }));
    window.localStorage.removeItem("barroco_attribution_v1");
  } catch { /* The current attribution still travels with the submission. */ }
  let gaClientId = "";
  try {
    const cookie = document.cookie.split("; ").find((item) => item.startsWith("_ga="));
    const parts = decodeURIComponent(cookie?.slice(4) || "").split(".");
    if (parts.length >= 4) gaClientId = parts.slice(-2).join(".");
  } catch { /* Ignore malformed cookies. */ }
  return { ...lastTouch, gaClientId, pageUrl: window.location.href };
}

export function safeContactUrl(href) {
  // Never send recipient numbers, message bodies or query parameters to analytics.
  if (href.startsWith("tel:")) return "tel:";
  if (href.startsWith("mailto:")) return "mailto:";
  try {
    const url = new URL(href);
    if (url.hostname === "wa.me" || url.hostname === "api.whatsapp.com") return `${url.origin}/`;
  } catch { /* Unrecognized destinations are not logged. */ }
  return "";
}

export async function submitLead(endpoint, payload) {
  const controller = new AbortController();
  let timer;
  /** @type {Promise<never>} */
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error("O envio demorou mais que o esperado. Tente novamente ou fale pelo WhatsApp."));
      controller.abort();
    }, 15000);
  });
  try {
    return await Promise.race([
      (async () => {
        const response = await fetch(endpoint, {
          method: "POST", mode: "cors", signal: controller.signal,
          headers: { "content-type": "application/json" }, body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (!response.ok || !result.ok || !result.lead?.id || !result.lead.reference) {
          throw new Error("Não foi possível registrar o contato. Tente novamente ou fale pelo WhatsApp.");
        }
        return result;
      })(),
      timeout,
    ]);
  } finally {
    clearTimeout(timer);
  }
}
