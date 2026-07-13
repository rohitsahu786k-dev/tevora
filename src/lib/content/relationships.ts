import {
  accessories,
  productFamilies,
  products,
  projects,
  sectors,
  spaces,
} from "@/content";
import {
  accessoryToProducts,
  productToAccessories,
  productToSectors,
  productToSpaces,
  sectorToSpaces,
  spaceToProductFamilies,
  spaceToProducts,
} from "@/content/relationships";

const bySlug = <T extends { slug: string }>(items: T[], slugs: string[]) =>
  slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is T => Boolean(item));
export const getRelatedProducts = ({
  space,
  sector,
  accessory,
}: {
  space?: string;
  sector?: string;
  accessory?: string;
}) => {
  const slugs = new Set<string>();
  if (space) spaceToProducts[space]?.forEach((slug) => slugs.add(slug));
  if (sector)
    sectorToSpaces[sector]
      ?.flatMap((slug) => spaceToProducts[slug] ?? [])
      .forEach((slug) => slugs.add(slug));
  if (accessory)
    accessoryToProducts[accessory]?.forEach((slug) => slugs.add(slug));
  return bySlug(products, [...slugs]);
};
export const getRelatedAccessories = (productSlug: string) =>
  bySlug(accessories, productToAccessories[productSlug] ?? []);
export const getRelatedSpaces = ({
  product,
  sector,
}: {
  product?: string;
  sector?: string;
}) =>
  bySlug(
    spaces,
    product
      ? (productToSpaces[product] ?? [])
      : sector
        ? (sectorToSpaces[sector] ?? [])
        : [],
  );
export const getRelatedSectors = (productSlug: string) =>
  bySlug(sectors, productToSectors[productSlug] ?? []);
export function recommendProducts({
  spaceSlugs = [],
  sectorSlugs = [],
  limit = 6,
}: {
  spaceSlugs?: string[];
  sectorSlugs?: string[];
  limit?: number;
}) {
  return products
    .map((product) => ({
      product,
      score:
        spaceSlugs.filter((slug) =>
          productToSpaces[product.slug]?.includes(slug),
        ).length *
          3 +
        sectorSlugs.filter((slug) =>
          productToSectors[product.slug]?.includes(slug),
        ).length,
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || a.product.name.localeCompare(b.product.name),
    )
    .slice(0, limit)
    .map(({ product }) => product);
}
export function generateFilters(scope: "products" | "spaces" | "sectors") {
  if (scope === "spaces")
    return [...new Set(spaces.map(({ group }) => group))].map((value) => ({
      label: value,
      value,
    }));
  if (scope === "sectors")
    return sectors.map(({ name, slug }) => ({ label: name, value: slug }));
  return productFamilies.map(({ name, slug }) => ({
    label: name,
    value: slug,
  }));
}
export function validateRelationships() {
  const errors: string[] = [];
  const sectorSlugs = new Set(sectors.map(({ slug }) => slug));
  const spaceSlugs = new Set(spaces.map(({ slug }) => slug));
  const familySlugs = new Set(productFamilies.map(({ slug }) => slug));
  const productSlugs = new Set(products.map(({ slug }) => slug));
  const accessorySlugs = new Set(accessories.map(({ slug }) => slug));
  for (const [sector, related] of Object.entries(sectorToSpaces)) {
    if (!sectorSlugs.has(sector)) errors.push(`Unknown sector ${sector}`);
    related.forEach((slug) => {
      if (!spaceSlugs.has(slug)) errors.push(`Unknown space ${slug}`);
    });
  }
  for (const [space, related] of Object.entries(spaceToProductFamilies)) {
    if (!spaceSlugs.has(space)) errors.push(`Unknown space ${space}`);
    related.forEach((slug) => {
      if (!familySlugs.has(slug)) errors.push(`Unknown family ${slug}`);
    });
  }
  for (const [space, related] of Object.entries(spaceToProducts)) {
    if (!spaceSlugs.has(space)) errors.push(`Unknown space ${space}`);
    related.forEach((slug) => {
      if (!productSlugs.has(slug)) errors.push(`Unknown product ${slug}`);
    });
  }
  for (const [product, related] of Object.entries(productToAccessories)) {
    if (!productSlugs.has(product)) errors.push(`Unknown product ${product}`);
    related.forEach((slug) => {
      if (!accessorySlugs.has(slug)) errors.push(`Unknown accessory ${slug}`);
    });
  }
  for (const project of projects) {
    if (
      project.sector &&
      !sectorSlugs.has(project.sector.replace("sector-", ""))
    )
      errors.push(`Unknown project sector ${project.sector}`);
    project.spaces.forEach((id) => {
      if (!spaceSlugs.has(id.replace("space-", "")))
        errors.push(`Unknown project space ${id}`);
    });
    project.productsUsed.forEach((id) => {
      if (!productSlugs.has(id.replace("product-", "")))
        errors.push(`Unknown project product ${id}`);
    });
  }
  if (errors.length) throw new Error(errors.join("; "));
  return true;
}
