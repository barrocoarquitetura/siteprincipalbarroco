/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type HeroSlide = {
  image: string;
  alt: string;
  caption: string;
  position?: string;
};

type ProjectSlide = {
  image: string;
  title: string;
  text: string;
};

type TestimonialSlide = {
  quote: string;
  name: string;
};

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "previous" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  return (
    <figure
      className="home-hero__image hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carrossel"
      aria-label="Destaques do portfólio Barroco Arquitetura"
    >
      <div className="hero-carousel__slides" aria-live="off">
        {slides.map((slide, index) => (
          <img
            className={index === active ? "is-active" : ""}
            src={slide.image}
            alt={slide.alt}
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            style={{ objectPosition: slide.position || "center" }}
            aria-hidden={index !== active}
            key={slide.image}
          />
        ))}
      </div>
      <div className="hero-carousel__nav" aria-label="Escolher imagem do destaque">
        {slides.map((slide, index) => (
          <button
            type="button"
            className={index === active ? "is-active" : ""}
            aria-label={`Mostrar imagem ${index + 1}: ${slide.caption}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
            key={slide.image}
          />
        ))}
      </div>
      <figcaption key={slides[active]?.caption}>{slides[active]?.caption}</figcaption>
    </figure>
  );
}

export function PortfolioCarousel({ projects }: { projects: ProjectSlide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const syncPosition = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const firstSlide = track.querySelector<HTMLElement>("[data-project-slide]");
    if (!firstSlide) return;

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const step = firstSlide.offsetWidth + gap;
    setActive(Math.max(0, Math.min(projects.length - 1, Math.round(track.scrollLeft / step))));
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 3);
  }, [projects.length]);

  useEffect(() => {
    syncPosition();
    window.addEventListener("resize", syncPosition);
    return () => window.removeEventListener("resize", syncPosition);
  }, [syncPosition]);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.querySelector<HTMLElement>("[data-project-slide]");
    if (!slide) return;

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    track.scrollBy({ left: direction * (slide.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <div className="portfolio-carousel" aria-roledescription="carrossel" aria-label="Projetos realizados">
      <div className="carousel-toolbar">
        <div className="carousel-arrows">
          <button type="button" onClick={() => move(-1)} disabled={active === 0} aria-label="Projeto anterior">
            <ArrowIcon direction="previous" />
          </button>
          <button type="button" onClick={() => move(1)} disabled={atEnd} aria-label="Próximo projeto">
            <ArrowIcon direction="next" />
          </button>
        </div>
      </div>
      <div className="portfolio-carousel__track" ref={trackRef} onScroll={syncPosition} tabIndex={0}>
        {projects.map((project) => (
          <figure className="portfolio-slide" data-project-slide key={project.image}>
            <a
              className="portfolio-slide__image"
              href={project.image}
              data-project-lightbox
              data-lightbox-title={project.title}
              data-lightbox-description={project.text}
              aria-label={`Ampliar imagem: ${project.title}`}
              aria-haspopup="dialog"
            >
              <img src={project.image} alt={`${project.title} — ${project.text}`} loading="lazy" decoding="async" />
              <span className="portfolio-slide__zoom" aria-hidden="true">Ampliar <b>↗</b></span>
            </a>
            <figcaption>
              <div><strong>{project.title}</strong><small>{project.text}</small></div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function TestimonialCarousel({ testimonials }: { testimonials: TestimonialSlide[] }) {
  const [active, setActive] = useState(0);

  const move = (direction: -1 | 1) => {
    setActive((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  return (
    <div className="testimonial-carousel" aria-roledescription="carrossel" aria-label="Depoimentos de clientes">
      <div className="testimonial-carousel__viewport" aria-live="polite">
        <div className="testimonial-carousel__track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {testimonials.map((item) => (
            <blockquote key={item.name} aria-hidden={testimonials[active]?.name !== item.name}>
              <span className="quote-mark">“</span>
              <p>{item.quote}</p>
              <footer>{item.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
      <div className="testimonial-carousel__controls">
        <p><span>{String(active + 1).padStart(2, "0")}</span> / {String(testimonials.length).padStart(2, "0")}</p>
        <div className="carousel-arrows carousel-arrows--light">
          <button type="button" onClick={() => move(-1)} aria-label="Depoimento anterior">
            <ArrowIcon direction="previous" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Próximo depoimento">
            <ArrowIcon direction="next" />
          </button>
        </div>
      </div>
    </div>
  );
}
