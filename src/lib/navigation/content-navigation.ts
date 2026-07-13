import type { BreadcrumbItem } from "@/components/navigation/breadcrumbs";
import { brandSettings } from "@/config/brand";
import { productFamilies, products, sectors, spaces } from "@/content";
import { routes } from "@/lib/routes";

export function getContentBreadcrumbs(
  type: "product" | "family" | "space" | "sector",
  slug: string,
): BreadcrumbItem[] {
  const home = { label: "Home", href: routes.home };
  if (type === "family") {
    const family = productFamilies.find((item) => item.slug === slug);
    return [
      home,
      { label: "Products", href: routes.products },
      { label: family?.name ?? slug },
    ];
  }
  if (type === "product") {
    const product = products.find((item) => item.slug === slug);
    const family = productFamilies.find(
      (item) => item.id === product?.productFamily,
    );
    return [
      home,
      { label: "Products", href: routes.products },
      {
        label: family?.name ?? "Product Family",
        href: family ? routes.productFamily(family.slug) : routes.products,
      },
      { label: product?.name ?? slug },
    ];
  }
  const collection = type === "space" ? spaces : sectors;
  const item = collection.find((entry) => entry.slug === slug);
  return [
    home,
    {
      label: type === "space" ? "Spaces" : "Sectors",
      href: type === "space" ? routes.spaces : routes.sectors,
    },
    { label: item?.name ?? slug },
  ];
}
export function getCanonicalUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return new URL(path, base).toString();
}
export function getEntityCanonicalUrl(
  type: "product" | "family" | "space" | "sector",
  slug: string,
) {
  const path =
    type === "product"
      ? routes.product(slug)
      : type === "family"
        ? routes.productFamily(slug)
        : type === "space"
          ? routes.space(slug)
          : routes.sector(slug);
  return getCanonicalUrl(path);
}
export const canonicalSiteName = brandSettings.brandName;
