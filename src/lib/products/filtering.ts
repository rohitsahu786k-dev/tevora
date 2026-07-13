import { productFamilies, products, sectors, spaces } from "@/content";
import { productToSectors, productToSpaces } from "@/content/relationships";
import type { FilterDefinition, Product } from "@/types/content";

export type ProductFilterField = "series" | "space" | "sector";
export interface ProductFilterDefinition extends FilterDefinition {
  field: ProductFilterField;
  options: { label: string; value: string }[];
}
const unique = <T>(items: T[]) => [...new Set(items)];
export function getFamilyFilterDefinitions(
  familySlug: string,
): ProductFilterDefinition[] {
  const family = productFamilies.find((item) => item.slug === familySlug);
  const familyProducts = products.filter(
    (product) => product.family === familySlug,
  );
  if (!family) return [];
  const spaceSlugs = unique(
    familyProducts.flatMap((product) => productToSpaces[product.slug] ?? []),
  );
  const sectorSlugs = unique(
    familyProducts.flatMap((product) => productToSectors[product.slug] ?? []),
  );
  return [
    {
      id: `${family.id}-series`,
      label: "Series",
      field: "series",
      type: "multiple",
      options: family.series.map((item) => ({
        label: item.name,
        value: item.slug,
      })),
    },
    {
      id: `${family.id}-space`,
      label: "Supported space",
      field: "space",
      type: "multiple",
      options: spaceSlugs
        .map((slug) => spaces.find((space) => space.slug === slug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .map((space) => ({ label: space.name, value: space.slug })),
    },
    {
      id: `${family.id}-sector`,
      label: "Supported sector",
      field: "sector",
      type: "multiple",
      options: sectorSlugs
        .map((slug) => sectors.find((sector) => sector.slug === slug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .map((sector) => ({ label: sector.name, value: sector.slug })),
    },
  ].filter(
    (definition) => definition.options.length > 1,
  ) as ProductFilterDefinition[];
}
export function getProductFilterValues(
  product: Product,
  field: ProductFilterField,
) {
  if (field === "series") return [product.slug];
  if (field === "space") return productToSpaces[product.slug] ?? [];
  return productToSectors[product.slug] ?? [];
}
