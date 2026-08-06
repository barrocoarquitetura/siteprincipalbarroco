/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const navigation = [
  ["Sobre", "/#sobre"],
  ["Serviços", "/#servicos"],
  ["Projetos", "/projetos"],
  ["Conteúdo", "/blog"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-shell site-header__inner">
        <Link href="/" className="brand" aria-label="Barroco Arquitetura — início">
          <span className="brand__mark" aria-hidden="true"><img src="/images/logo-barroco-monograma.webp" alt="" /></span>
          <span className="brand__wordmark"><strong>Barroco</strong><span>Arquitetura</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <Link className="header-cta" href="/#contato">Solicitar proposta</Link>
        <details className="mobile-menu">
          <summary>Menu</summary>
          <nav aria-label="Navegação móvel">
            {navigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            <Link href="/#contato">Solicitar proposta</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
