import { describe, expect, it } from "vitest";
import {
  buildProductStructuredData,
  buildProjectStructuredData,
} from "@/components/seo/json-ld";
import {
  productFamilies,
  products,
  projects,
  sectors,
  spaces,
} from "@/content";

describe("SEO integrity", () => {
  it("keeps entity metadata titles unique within each collection", () => {
    for (const entries of [
      productFamilies,
      products,
      spaces,
      sectors,
      projects,
    ]) {
      const titles = entries.map((entry) => entry.seo.title);
      expect(new Set(titles).size).toBe(titles.length);
    }
  });
  it("does not emit unsupported commerce or certification Product data", () => {
    const product = products[0]!;
    const family = productFamilies.find(
      (item) => item.id === product.productFamily,
    )!;
    const data = buildProductStructuredData(product, family.name);
    expect(data).not.toHaveProperty("offers");
    expect(data).not.toHaveProperty("aggregateRating");
    expect(data).not.toHaveProperty("review");
    expect(data).not.toHaveProperty("certification");
  });
  it("omits unverified client and outcome claims from project data", () => {
    const data = buildProjectStructuredData(projects[0]!);
    expect(data).not.toHaveProperty("review");
    expect(data).not.toHaveProperty("award");
    expect(data).not.toHaveProperty("sponsor");
  });
});
