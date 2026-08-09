(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = (number) => String(number).padStart(2, "0");
  const formConversionId = "AW-614157022/KLJACJyUorQDEN6V7aQC";
  const whatsappConversionId = "AW-614157022/bWIoCP-morQDEN6V7aQC";
  const analyticsMeasurementId = "G-YED0X4J78V";

  function pushAnalytics(event, details = {}) {
    window.dataLayer?.push({ event, page_path: window.location.pathname, ...details });
  }

  function enableScrollReveal() {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    if (!elements.length) return;

    document.documentElement.classList.add("reveal-enabled");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
  }

  function enableHeroCarousels() {
    document.querySelectorAll(".hero-carousel").forEach((carousel) => {
      const slides = [...carousel.querySelectorAll(".hero-carousel__slides img")];
      const buttons = [...carousel.querySelectorAll(".hero-carousel__nav button")];
      const caption = carousel.querySelector("figcaption");
      if (slides.length < 2) return;

      let active = 0;
      let paused = false;
      const captions = buttons.map((button) => {
        const label = button.getAttribute("aria-label") || "";
        return label.includes(":") ? label.slice(label.indexOf(":") + 1).trim() : "";
      });

      const show = (index) => {
        active = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
          const isActive = slideIndex === active;
          slide.classList.toggle("is-active", isActive);
          slide.setAttribute("aria-hidden", String(!isActive));
        });
        buttons.forEach((button, buttonIndex) => {
          const isActive = buttonIndex === active;
          button.classList.toggle("is-active", isActive);
          if (isActive) button.setAttribute("aria-current", "true");
          else button.removeAttribute("aria-current");
        });
        if (caption && captions[active]) caption.textContent = captions[active];
      };

      buttons.forEach((button, index) => button.addEventListener("click", () => show(index)));
      ["mouseenter", "focusin"].forEach((event) => carousel.addEventListener(event, () => { paused = true; }));
      ["mouseleave", "focusout"].forEach((event) => carousel.addEventListener(event, () => { paused = false; }));
      if (!reduceMotion) window.setInterval(() => { if (!paused) show(active + 1); }, 5200);
      show(0);
    });
  }

  function enablePortfolioCarousels() {
    document.querySelectorAll(".portfolio-carousel").forEach((carousel) => {
      const track = carousel.querySelector(".portfolio-carousel__track");
      const buttons = carousel.querySelectorAll(".carousel-toolbar .carousel-arrows button");
      const previous = buttons[0];
      const next = buttons[1];
      const firstSlide = track?.querySelector("[data-project-slide]");
      if (!track || !firstSlide || !previous || !next) return;

      const step = () => {
        const styles = window.getComputedStyle(track);
        return firstSlide.offsetWidth + (Number.parseFloat(styles.columnGap || styles.gap) || 0);
      };
      const sync = () => {
        previous.disabled = track.scrollLeft <= 3;
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 3;
      };
      previous.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
      next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
      track.addEventListener("scroll", sync, { passive: true });
      window.addEventListener("resize", sync, { passive: true });
      sync();
    });
  }

  function enableTestimonialCarousels() {
    document.querySelectorAll(".testimonial-carousel").forEach((carousel) => {
      const track = carousel.querySelector(".testimonial-carousel__track");
      const testimonials = [...(track?.querySelectorAll("blockquote") || [])];
      const counter = carousel.querySelector(".testimonial-carousel__controls > p");
      const buttons = carousel.querySelectorAll(".testimonial-carousel__controls .carousel-arrows button");
      if (!track || testimonials.length < 2 || buttons.length < 2) return;

      let active = 0;
      const show = (index) => {
        active = (index + testimonials.length) % testimonials.length;
        track.style.transform = `translateX(-${active * 100}%)`;
        testimonials.forEach((testimonial, testimonialIndex) => {
          testimonial.setAttribute("aria-hidden", String(testimonialIndex !== active));
        });
        if (counter) counter.innerHTML = `<span>${pad(active + 1)}</span> / ${pad(testimonials.length)}`;
      };
      buttons[0].addEventListener("click", () => show(active - 1));
      buttons[1].addEventListener("click", () => show(active + 1));
      show(0);
    });
  }

  function enableLightbox() {
    let overlay = null;
    let items = [];
    let active = 0;
    let returnFocus = null;

    const itemFrom = (trigger) => {
      const image = trigger.querySelector("img");
      return {
        src: trigger.getAttribute("href") || image?.currentSrc || image?.src || "",
        alt: image?.alt || trigger.dataset.lightboxTitle || "Projeto da Barroco Arquitetura",
        title: trigger.dataset.lightboxTitle || "Projeto Barroco",
        description: trigger.dataset.lightboxDescription || "",
      };
    };

    const close = () => {
      if (!overlay) return;
      overlay.remove();
      overlay = null;
      document.body.style.overflow = "";
      returnFocus?.focus();
    };

    const show = (index) => {
      if (!overlay || !items.length) return;
      active = (index + items.length) % items.length;
      const item = items[active];
      const image = overlay.querySelector(".project-lightbox__image img");
      const title = overlay.querySelector(".project-lightbox__footer strong");
      const description = overlay.querySelector(".project-lightbox__footer span");
      image.src = item.src;
      image.alt = item.alt;
      title.textContent = item.title;
      description.textContent = item.description;
      overlay.setAttribute("aria-label", `Imagem ampliada: ${item.title}`);
    };

    const open = (trigger) => {
      const triggers = [...document.querySelectorAll("[data-project-lightbox]")];
      items = triggers.map(itemFrom);
      active = Math.max(0, triggers.indexOf(trigger));
      returnFocus = trigger;
      overlay = document.createElement("div");
      overlay.className = "project-lightbox";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.innerHTML = `
        <div class="project-lightbox__frame">
          <div class="project-lightbox__topbar"><button type="button" aria-label="Fechar imagem ampliada">Fechar <span aria-hidden="true">×</span></button></div>
          <div class="project-lightbox__image"><img src="" alt=""></div>
          <div class="project-lightbox__footer">
            <div><strong></strong><span></span></div>
            <div class="project-lightbox__nav"><button type="button" aria-label="Imagem anterior">←</button><button type="button" aria-label="Próxima imagem">→</button></div>
          </div>
        </div>`;
      document.body.append(overlay);
      document.body.style.overflow = "hidden";
      overlay.querySelector(".project-lightbox__topbar button").addEventListener("click", close);
      const navigation = overlay.querySelectorAll(".project-lightbox__nav button");
      navigation[0].addEventListener("click", () => show(active - 1));
      navigation[1].addEventListener("click", () => show(active + 1));
      overlay.addEventListener("mousedown", (event) => { if (event.target === overlay) close(); });
      show(active);
      overlay.querySelector(".project-lightbox__topbar button").focus();
    };

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest?.("[data-project-lightbox]");
      if (!trigger) return;
      event.preventDefault();
      open(trigger);
    });
    window.addEventListener("keydown", (event) => {
      if (!overlay) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") show(active - 1);
      if (event.key === "ArrowRight") show(active + 1);
    });
  }

  function enableLeadForms() {
    document.querySelectorAll("form.lead-form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new FormData(form).entries());
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
        pushAnalytics("lead_form_whatsapp", { service: fields.service, property_type: fields.property });
        window.gtag?.("event", "lead_form_whatsapp", {
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

        if (typeof window.gtag === "function") {
          window.gtag("event", "conversion", {
            send_to: formConversionId,
            event_callback: redirectToWhatsApp,
          });
          window.setTimeout(redirectToWhatsApp, 1200);
        } else {
          redirectToWhatsApp();
        }
      });
    });
  }

  function enableContactAnalytics() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest?.("a[href]");
      if (!link) return;
      const href = link.href;
      let eventName = "";
      if (/wa\.me|api\.whatsapp\.com/.test(href)) {
        eventName = "whatsapp_click";
        if (typeof window.gtag === "function") {
          window.gtag("event", "conversion", { send_to: whatsappConversionId });
        }
      }
      else if (href.startsWith("tel:")) eventName = "phone_click";
      else if (href.startsWith("mailto:")) eventName = "email_click";
      if (!eventName) return;

      pushAnalytics(eventName, { link_url: href });
      window.gtag?.("event", eventName, {
        send_to: analyticsMeasurementId,
        page_path: window.location.pathname,
        link_url: href,
      });
    });
  }

  function closeMobileMenus() {
    document.querySelectorAll(".mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => link.closest("details")?.removeAttribute("open"));
    });
  }

  enableScrollReveal();
  enableHeroCarousels();
  enablePortfolioCarousels();
  enableTestimonialCarousels();
  enableLightbox();
  enableLeadForms();
  enableContactAnalytics();
  closeMobileMenus();
})();
