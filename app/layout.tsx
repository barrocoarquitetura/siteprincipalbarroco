import type { Metadata } from "next";
import { ScrollReveal } from "./components/ScrollReveal";
import { ProjectLightbox } from "./components/ProjectLightbox";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { AnalyticsEvents } from "./components/AnalyticsEvents";
import "./globals.css";

const googleAdsId = "AW-614157022";
const googleTagGatewayPath = "/metrics/";
const googleTagLoader = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${googleAdsId}');(function(){var firstPartyPath='${googleTagGatewayPath}';var googleScript='https://www.googletagmanager.com/gtag/js?id=${googleAdsId}';var loaded=false;function load(src,isFirstParty){if(loaded)return;loaded=true;var script=document.createElement('script');script.async=true;script.src=src;if(isFirstParty)script.onerror=function(){loaded=false;load(googleScript,false)};document.head.appendChild(script)}if(!window.fetch){load(googleScript,false);return}Promise.race([fetch(firstPartyPath+'healthy',{cache:'no-store',credentials:'same-origin'}).then(function(response){if(!response.ok)return false;return response.text().then(function(text){return text.trim()==='ok'})}).catch(function(){return false}),new Promise(function(resolve){setTimeout(function(){resolve(false)},1200)})]).then(function(healthy){load(healthy?firstPartyPath:googleScript,healthy)})})();`;

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.barrocoarquitetura.com.br/#empresa",
  name: "Barroco Arquitetura",
  legalName: "Barroco Arquitetura",
  alternateName: "Barroco Arquitetura e Interiores",
  description: "Escritório de arquitetura em Santo André especializado em projetos residenciais e comerciais, interiores, reformas, obras e marcenaria, com atendimento em diferentes regiões do estado de São Paulo.",
  url: "https://www.barrocoarquitetura.com.br",
  logo: {
    "@type": "ImageObject",
    url: "https://www.barrocoarquitetura.com.br/images/logo-barroco-avatar.webp",
    contentUrl: "https://www.barrocoarquitetura.com.br/images/logo-barroco-avatar.webp",
    width: 900,
    height: 899,
    caption: "Barroco Arquitetura",
  },
  image: [
    "https://www.barrocoarquitetura.com.br/images/portfolio-integracao-varanda.webp",
    "https://www.barrocoarquitetura.com.br/images/apartamento-estar-jantar-integrados.webp",
    "https://www.barrocoarquitetura.com.br/images/hero-casa-terrea-contemporanea.webp",
  ],
  telephone: "+55 11 2763-0517",
  email: "contato@barrocoarquitetura.com.br",
  hasMap: "https://share.google/IFzqEJ3Gx7VCFYvad",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55 11 2763-0517",
    contactType: "atendimento comercial",
    availableLanguage: "Portuguese",
    areaServed: "Estado de São Paulo",
    url: "https://wa.me/551127630517",
  },
  knowsAbout: [
    "Projetos de arquitetura",
    "Arquitetura de interiores",
    "Projeto de interiores para apartamentos",
    "Projeto arquitetônico para casas",
    "Reformas residenciais",
    "Arquitetura comercial",
    "Reforma de escritórios",
    "Gerenciamento de obras",
    "Marcenaria planejada",
  ],
  foundingDate: "2013",
  founder: [
    {
      "@type": "Person",
      "@id": "https://www.barrocoarquitetura.com.br/#mayara-cimino",
      url: "https://www.barrocoarquitetura.com.br/#mayara-cimino",
      name: "Mayara Cimino",
      jobTitle: "Arquiteta",
      worksFor: { "@id": "https://www.barrocoarquitetura.com.br/#empresa" },
    },
    {
      "@type": "Person",
      "@id": "https://www.barrocoarquitetura.com.br/#luiz-faria",
      url: "https://www.barrocoarquitetura.com.br/#luiz-faria",
      name: "Luiz Faria",
      jobTitle: "Arquiteto",
      worksFor: { "@id": "https://www.barrocoarquitetura.com.br/#empresa" },
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Travessa Marcelina, 32",
    addressLocality: "Santo André",
    addressRegion: "SP",
    postalCode: "09040-120",
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Estado de São Paulo" },
    { "@type": "City", name: "Santo André" },
    { "@type": "City", name: "São Bernardo do Campo" },
    { "@type": "City", name: "São Caetano do Sul" },
    { "@type": "City", name: "Mauá" },
    { "@type": "City", name: "São Paulo" },
  ],
  sameAs: ["https://www.instagram.com/barrocoarquitetura/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de arquitetura e obras",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projeto de interiores para apartamentos" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projeto arquitetônico e de interiores para casas" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reformas residenciais, gerenciamento e marcenaria" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projetos e obras comerciais e para escritórios" } },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.barrocoarquitetura.com.br/#website",
  url: "https://www.barrocoarquitetura.com.br",
  name: "Barroco Arquitetura",
  alternateName: "Barroco",
  inLanguage: "pt-BR",
  publisher: { "@id": "https://www.barrocoarquitetura.com.br/#empresa" },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.barrocoarquitetura.com.br"),
  applicationName: "Barroco Arquitetura",
  authors: [{ name: "Barroco Arquitetura", url: "https://www.barrocoarquitetura.com.br" }],
  creator: "Barroco Arquitetura",
  publisher: "Barroco Arquitetura",
  category: "Arquitetura e design de interiores",
  title: {
    default: "Barroco Arquitetura | Projetos e obras residenciais e comerciais",
    template: "%s | Barroco Arquitetura",
  },
  description: "Escritório de arquitetura em Santo André para projetos de casas, apartamentos, interiores, reformas e obras comerciais no estado de São Paulo.",
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Barroco Arquitetura",
    description: "Projetos e obras para casas, apartamentos, comércios e escritórios.",
    type: "website",
    siteName: "Barroco Arquitetura",
    locale: "pt_BR",
    images: [{
      url: "/images/logo-barroco-avatar.webp",
      width: 900,
      height: 900,
      alt: "Barroco Arquitetura",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barroco Arquitetura",
    description: "Projetos e obras para casas, apartamentos, comércios e escritórios em São Paulo.",
    images: ["/images/hero-apartamento-integrado.webp"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/images/logo-barroco-avatar.webp" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: googleTagLoader,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reveal-enabled')}catch(e){}" }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {children}
        <AnalyticsEvents />
        <ProjectLightbox />
        <ScrollReveal />
        <WhatsAppButton />
      </body>
    </html>
  );
}
