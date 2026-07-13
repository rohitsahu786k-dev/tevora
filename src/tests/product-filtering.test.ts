import { describe, expect, it } from "vitest";
import { products } from "@/content";
import {
  getFamilyFilterDefinitions,
  getProductFilterValues,
} from "@/lib/products/filtering";

describe("product-family filtering", () => {
  it("only creates populated metadata filters", () => {
    const definitions = getFamilyFilterDefinitions("presentation-stations");
    expect(definitions.map(({ field }) => field)).toEqual([
      "series",
      "space",
      "sector",
    ]);
    expect(definitions.every(({ options }) => options.length > 1)).toBe(true);
  });
  it("maps series, space and sector values without technical claims", () => {
    const product = products.find(({ slug }) => slug === "arc")!;
    expect(getProductFilterValues(product, "series")).toEqual(["arc"]);
    expect(getProductFilterValues(product, "space").length).toBeGreaterThan(0);
    expect(getProductFilterValues(product, "sector").length).toBeGreaterThan(0);
  });
  it("does not expose unsupported technical filters", () => {
    const fields = getFamilyFilterDefinitions("mobile-av-carts").map(
      ({ field }) => field,
    );
    expect(fields).not.toContain("displaySize");
    expect(fields).not.toContain("rackCapacity");
    expect(fields).not.toContain("heightAdjustment");
  });
});
