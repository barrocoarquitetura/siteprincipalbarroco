import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "Página não encontrada | Barroco Arquitetura",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found page-shell">
        <p className="eyebrow">Erro 404</p>
        <h1>Esta página não existe mais.</h1>
        <p>Conheça os projetos e serviços atuais da Barroco Arquitetura.</p>
        <div className="button-row">
          <Link className="button button--primary" href="/projetos">Ver projetos</Link>
          <Link className="button button--ghost" href="/">Ir para o início</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
