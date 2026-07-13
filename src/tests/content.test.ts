import { describe, expect, it } from "vitest";
import {
  accessories,
  accessoryGroups,
  productFamilies,
  products,
  projects,
  resources,
  sectors,
  spaces,
} from "@/content";
import { brandSettings } from "@/config/brand";
import {
  brandSettingsSchema,
  specificationItemSchema,
  validateContent,
} from "@/lib/validation/content";

describe("content models", () => {
  it("validates every placeholder collection and its references", () => {
    expect(
      validateContent({
        brandSettings,
        productFamilies,
        products,
        accessoryGroups,
        accessories,
        spaces,
        sectors,
        projects,
        resources,
      }),
    ).toEqual({
      families: 11,
      products: 56,
      accessoryGroups: 12,
      accessories: 12,
    });
  });

  it("contains the supplied product types and series", () => {
    expect(
      productFamilies.flatMap((family) => family.productTypes),
    ).toHaveLength(73);
    expect(
      productFamilies
        .find((family) => family.slug === "presentation-stations")
        ?.series.map(({ name }) => name),
    ).toEqual([
      "ARC",
      "ARC Pro",
      "LIFT",
      "LIFT Access",
      "PIVOT",
      "EDU Station",
    ]);
  });

  it("validates global settings and unverified specification values", () => {
    expect(brandSettingsSchema.parse(brandSettings).brandName).toBe("TEVORA");
    expect(
      specificationItemSchema.safeParse({
        label: "Width",
        value: null,
        verified: false,
      }).success,
    ).toBe(true);
  });

  it("marks all sample content as placeholder data", () => {
    expect(
      [
        ...productFamilies,
        ...products,
        ...accessories,
        ...spaces,
        ...sectors,
        ...projects,
        ...resources,
      ].every((entry) => entry.dataStatus === "placeholder"),
    ).toBe(true);
  });

  it("rejects claims on placeholder records", () => {
    const result = validateContent;
    expect(() =>
      result({
        brandSettings,
        productFamilies,
        products: [
          { ...products[0], certifications: ["Unverified certification"] },
          ...products.slice(1),
        ],
        accessoryGroups,
        accessories,
        spaces,
        sectors,
        projects,
        resources,
      }),
    ).toThrow(/Placeholder products cannot contain certifications/);
  });
});
