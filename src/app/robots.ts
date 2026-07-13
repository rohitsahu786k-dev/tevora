import type { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/navigation/content-navigation";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/api/", "/design-system"],
    },
    sitemap: getCanonicalUrl("/sitemap.xml"),
    host: getCanonicalUrl("/"),
  };
}
