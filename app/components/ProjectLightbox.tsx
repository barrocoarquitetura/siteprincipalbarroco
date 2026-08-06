"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type LightboxItem = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type LightboxState = {
  items: LightboxItem[];
  index: number;
};

function getItem(trigger: HTMLAnchorElement): LightboxItem {
  const image = trigger.querySelector<HTMLImageElement>("img");
  return {
    src: trigger.getAttribute("href") || image?.currentSrc || image?.src || "",
    alt: image?.alt || trigger.dataset.lightboxTitle || "Projeto da Barroco Arquitetura",
    title: trigger.dataset.lightboxTitle || "Projeto Barroco",
    description: trigger.dataset.lightboxDescription || "",
  };
}

export function ProjectLightbox() {
  const [gallery, setGallery] = useState<LightboxState | null>(null);
  const isOpen = gallery !== null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLAnchorElement | null>(null);

  const close = useCallback(() => {
    setGallery(null);
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }, []);

  const move = useCallback((direction: -1 | 1) => {
    setGallery((current) => {
      if (!current) return current;
      return {
        ...current,
        index: (current.index + direction + current.items.length) % current.items.length,
      };
    });
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLAnchorElement>("[data-project-lightbox]");
      if (!trigger) return;

      event.preventDefault();
      const triggers = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-project-lightbox]"));
      returnFocusRef.current = trigger;
      setGallery({
        items: triggers.map(getItem),
        index: Math.max(0, triggers.indexOf(trigger)),
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close, move]);

  if (!gallery) return null;

  const item = gallery.items[gallery.index];

  return (
    <div
      className="project-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Imagem ampliada: ${item.title}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="project-lightbox__frame">
        <div className="project-lightbox__topbar">
          <button ref={closeButtonRef} type="button" onClick={close} aria-label="Fechar imagem ampliada">Fechar <span aria-hidden="true">×</span></button>
        </div>
        <div className="project-lightbox__image">
          <Image src={item.src} alt={item.alt} fill sizes="100vw" />
        </div>
        <div className="project-lightbox__footer">
          <div><strong>{item.title}</strong><span>{item.description}</span></div>
          {gallery.items.length > 1 && (
            <div className="project-lightbox__nav">
              <button type="button" onClick={() => move(-1)} aria-label="Imagem anterior">←</button>
              <button type="button" onClick={() => move(1)} aria-label="Próxima imagem">→</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
