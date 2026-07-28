import type { MetadataRoute } from "next";
import {
  accessories,
  productFamilies,
  products,
  projects,
  sectors,
  spaces,
} from "@/content";
import { getCanonicalUrl } from "@/lib/navigation/content-navigation";
import { routes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    routes.home,
    routes.products,
    routes.accessories,
    routes.spaces,
    routes.sectors,
    routes.configure,
    routes.projects,
    routes.resources,
    routes.login,
    routes.designSupport,
    routes.partners,
    routes.partnerApply,
    routes.company,
    routes.contact,
  ];
  const verified = [
    ...productFamilies
      .filter((item) => item.dataStatus === "verified")
      .map((item) => routes.productFamily(item.slug)),
    ...products
      .filter((item) => item.dataStatus === "verified")
      .map((item) => routes.product(item.slug)),
    ...accessories
      .filter((item) => item.dataStatus === "verified")
      .map((item) => routes.accessory(item.slug)),
    ...spaces
      .filter((item) => item.dataStatus === "verified")
      .map((item) => routes.space(item.slug)),
    ...sectors
      .filter((item) => item.dataStatus === "verified")
      .map((item) => routes.sector(item.slug)),
    ...projects
      .filter((item) => item.dataStatus === "verified")
      .map((item) => routes.project(item.slug)),
  ];
  return [...staticPaths, ...verified].map((path) => ({
    url: getCanonicalUrl(path),
    changeFrequency: path === routes.home ? "weekly" : "monthly",
    priority: path === routes.home ? 1 : 0.7,
  }));
}
