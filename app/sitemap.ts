import type { MetadataRoute } from "next";
import { blogPosts } from "./blog/posts";
import { caseStudies } from "./projetos/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.barrocoarquitetura.com.br";
  // Editorial dates audited against Git history (not build/deploy timestamps).
  // 4631b21: home/Reformas copy; 2367c5e: service contact sections.
  // 1b6b820: portfolio title; fae6dbb: restored blog content/authorship.
  // Image resizing and CSS-only changes do not advance these dates.
  const primaryPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date("2026-10-02"), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projetos`, lastModified: new Date("2026-08-27"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projetos-de-apartamentos`, lastModified: new Date("2026-09-19"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projetos-de-casas`, lastModified: new Date("2026-09-19"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/reformas-residenciais`, lastModified: new Date("2026-10-02"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projetos-e-obras-comerciais`, lastModified: new Date("2026-09-19"), changeFrequency: "monthly", priority: 0.9 },
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
