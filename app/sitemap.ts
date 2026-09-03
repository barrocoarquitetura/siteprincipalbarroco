import type { MetadataRoute } from "next";
import { blogPosts } from "./blog/posts";
import { caseStudies } from "./projetos/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.barrocoarquitetura.com.br";
  const primaryPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date("2026-09-03"), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projetos`, lastModified: new Date("2026-08-27"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projetos-de-apartamentos`, lastModified: new Date("2026-09-03"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projetos-de-casas`, lastModified: new Date("2026-09-03"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/reformas-residenciais`, lastModified: new Date("2026-09-03"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projetos-e-obras-comerciais`, lastModified: new Date("2026-09-03"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date("2026-09-03"), changeFrequency: "weekly", priority: 0.85 },
  ];
  const projectPages: MetadataRoute.Sitemap = caseStudies.map(({ slug, modified }) => ({
    url: `${base}/projetos/${slug}`,
    lastModified: new Date(modified),
    changeFrequency: "yearly",
    priority: 0.8,
  }));
  const blogPages: MetadataRoute.Sitemap = blogPosts.map(({ slug, modified }) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(modified),
    changeFrequency: "monthly",
    priority: 0.75,
  }));
  return [...primaryPages, ...projectPages, ...blogPages];
}
