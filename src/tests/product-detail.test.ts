import { describe, expect, it } from "vitest";
import { products } from "@/content";
import {
  getProductDetailContent,
  representativeProductSlugs,
} from "@/content/product-detail-content";

describe("product detail content", () => {
  it("provides the six representative product stories", () =>
    expect(representativeProductSlugs.sort()).toEqual([
      "arc",
      "forum",
      "move-pro",
      "nexus",
      "techdesk-pro",
      "vista",
    ]));
  it("provides introduction and feature media for every product", () => {
    for (const product of products) {
      const detail = getProductDetailContent(product);
      expect(detail.introduction.length).toBeGreaterThan(20);
      expect(detail.featureStories.length).toBeGreaterThanOrEqual(3);
      expect(
        detail.featureStories.every((story) =>
          Boolean(story.media && story.title && story.explanation),
        ),
      ).toBe(true);
    }
  });
  it("keeps representative technical values unverified", () => {
    for (const slug of representativeProductSlugs) {
      const product = products.find((item) => item.slug === slug)!;
      expect(product.model).toBeNull();
      expect(product.dimensions).toBeNull();
      expect(product.equipmentCapacity).toBeNull();
      expect(product.rackCapacity).toBeNull();
      expect(product.certifications).toEqual([]);
      expect(product.standards).toEqual([]);
    }
  });
});
