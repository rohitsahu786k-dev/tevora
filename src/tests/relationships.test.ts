import { describe, expect, it } from "vitest";
import { accessories, products, sectors, spaces } from "@/content";
import { relationshipGraph } from "@/content/relationships";
import {
  generateFilters,
  getRelatedAccessories,
  getRelatedProducts,
  getRelatedSectors,
  getRelatedSpaces,
  recommendProducts,
  validateRelationships,
} from "@/lib/content/relationships";
import {
  getContentBreadcrumbs,
  getEntityCanonicalUrl,
} from "@/lib/navigation/content-navigation";

describe("space and sector relationships", () => {
  it("contains the complete taxonomy", () => {
    expect(sectors).toHaveLength(12);
    expect(spaces).toHaveLength(32);
    expect(
      spaces.filter(({ group }) => group === "Education Spaces"),
    ).toHaveLength(9);
    expect(
      spaces.filter(({ group }) => group === "Corporate Spaces"),
    ).toHaveLength(9);
    expect(
      spaces.filter(({ group }) => group === "Specialist Spaces"),
    ).toHaveLength(9);
    expect(
      spaces.filter(({ group }) => group === "Public and Self-Service Spaces"),
    ).toHaveLength(5);
  });
  it("has no orphaned mapping references", () =>
    expect(validateRelationships()).toBe(true));
  it("provides editorial planning content for every space and sector", () => {
    spaces.forEach((space) => {
      expect(space.primaryUsers.length).toBeGreaterThan(0);
      expect(space.activities.length).toBeGreaterThan(0);
      expect(space.technologyRequirements.length).toBeGreaterThan(0);
      expect(space.designPriorities.length).toBeGreaterThan(0);
    });
    sectors.forEach((sector) =>
      expect(sector.challenges.length).toBeGreaterThan(0),
    );
  });
  it("supports bidirectional related-content queries", () => {
    expect(
      getRelatedSpaces({ sector: "higher-education" }).length,
    ).toBeGreaterThan(0);
    expect(getRelatedProducts({ space: "boardroom" }).length).toBeGreaterThan(
      0,
    );
    expect(
      getRelatedSectors("forum").some(({ slug }) => slug === "corporate"),
    ).toBe(true);
    expect(getRelatedAccessories("forum").length).toBeGreaterThan(0);
  });
  it("varies and diversifies the first six space recommendations", () => {
    const recommendationSets = spaces.map((space) =>
      getRelatedProducts({ space: space.slug }).slice(0, 6),
    );
    const uniqueOrders = new Set(
      recommendationSets.map((items) =>
        items.map((product) => product.slug).join(","),
      ),
    );

    expect(uniqueOrders.size).toBeGreaterThan(16);
    recommendationSets.forEach((items) => {
      expect(
        new Set(items.map((product) => product.family)).size,
      ).toBeGreaterThanOrEqual(4);
    });
  });
  it("keeps product, space, sector and accessory navigation reciprocal", () => {
    products.forEach((product) => {
      getRelatedSpaces({ product: product.slug }).forEach((space) =>
        expect(getRelatedProducts({ space: space.slug })).toContainEqual(
          product,
        ),
      );
      getRelatedAccessories(product.slug).forEach((accessory) =>
        expect(relationshipGraph.accessoryToProducts[accessory.slug]).toContain(
          product.slug,
        ),
      );
    });
    accessories.forEach((accessory) => {
      (relationshipGraph.accessoryToProducts[accessory.slug] ?? []).forEach(
        (productSlug) =>
          expect(relationshipGraph.productToAccessories[productSlug]).toContain(
            accessory.slug,
          ),
      );
    });
  });
  it("generates recommendations and filters", () => {
    expect(
      recommendProducts({
        spaceSlugs: ["boardroom"],
        sectorSlugs: ["corporate"],
        limit: 3,
      }),
    ).toHaveLength(3);
    expect(generateFilters("spaces")).toHaveLength(4);
    expect(generateFilters("sectors")).toHaveLength(12);
    expect(generateFilters("products")).toHaveLength(11);
  });
  it("builds breadcrumbs and canonical URLs", () => {
    expect(getContentBreadcrumbs("space", "boardroom").at(-1)?.label).toBe(
      "Boardroom",
    );
    expect(getEntityCanonicalUrl("sector", "corporate")).toContain(
      "/sectors/corporate",
    );
  });
  it("maps the placeholder project to a sector, space and product", () =>
    expect(relationshipGraph.projectRelationships["example-project"]).toEqual({
      sector: "corporate",
      spaces: ["boardroom"],
      products: ["forum"],
    }));
});
