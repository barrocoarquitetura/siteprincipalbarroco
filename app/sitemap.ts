import type { MetadataRoute } from "next";
import { caseStudies } from "./projetos/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.barrocoarquitetura.com.br";
  const lastModified = new Date("2026-07-19");
  const primaryPages: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projetos`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projetos-de-apartamentos`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projetos-de-casas`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/reformas-residenciais`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projetos-e-obras-comerciais`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
  const projectPages: MetadataRoute.Sitemap = caseStudies.map(({ slug }) => ({
    url: `${base}/projetos/${slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.8,
  }));
  return [...primaryPages, ...projectPages];
}
