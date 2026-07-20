import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: [
      "https://www.barrocoarquitetura.com.br/sitemap.xml",
      "https://www.barrocoarquitetura.com.br/sitemap-images.xml",
    ],
    host: "https://www.barrocoarquitetura.com.br",
  };
}
