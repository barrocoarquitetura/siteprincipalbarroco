/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__grid">
        <div>
          <Link href="/" className="brand brand--footer" aria-label="Barroco Arquitetura — início">
            <span className="brand__mark" aria-hidden="true"><img src="/images/logo-barroco-monograma.webp" alt="" /></span>
            <span className="brand__wordmark"><strong>Barroco</strong><span>Arquitetura</span></span>
          </Link>
          <p>Projetos e obras para casas, apartamentos, comércios e escritórios.</p>
        </div>
        <div>
          <strong>Serviços</strong>
          <Link href="/projetos">Projetos</Link>
          <Link href="/projetos-de-apartamentos">Apartamentos</Link>
          <Link href="/projetos-de-casas">Casas</Link>
          <Link href="/reformas-residenciais">Reformas</Link>
          <Link href="/projetos-e-obras-comerciais">Comercial e escritórios</Link>
        </div>
        <div>
          <strong>Contato</strong>
          <a href="mailto:contato@barrocoarquitetura.com.br">contato@barrocoarquitetura.com.br</a>
          <a className="site-footer__whatsapp" href="https://wa.me/551127630517" target="_blank" rel="noreferrer" aria-label="WhatsApp da Barroco Arquitetura: (11) 2763-0517">(11) 2763-0517</a>
          <a
            className="site-footer__instagram"
            href="https://www.instagram.com/barrocoarquitetura/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram oficial da Barroco Arquitetura"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.7" r="1" className="site-footer__instagram-dot" />
            </svg>
            <span>@barrocoarquitetura</span>
          </a>
        </div>
        <div>
          <strong>Endereço</strong>
          <a href="https://share.google/IFzqEJ3Gx7VCFYvad" target="_blank" rel="noreferrer">Travessa Marcelina, 32</a>
          <span>Jardim Bela Vista · Santo André</span>
          <span>SP · 09040-120</span>
        </div>
      </div>
      <div className="page-shell site-footer__bottom">
        <span>© 2026 Barroco Arquitetura</span>
        <span>Arquitetura · Interiores · Obras</span>
      </div>
    </footer>
  );
}
