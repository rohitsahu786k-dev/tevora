import { describe, expect, it } from "vitest";
import {
  aspectRatios,
  mediaAssets,
  mediaCategories,
  supportedMediaFormats,
} from "@/content/media";
import { auditMedia } from "@/lib/media/audit";

describe("production media system", () => {
  it("defines every media category and required standard ratio", () => {
    expect(mediaCategories).toHaveLength(13);
    expect(Object.keys(aspectRatios)).toEqual(
      expect.arrayContaining([
        "homepage-hero",
        "product-family-hero",
        "product-hero",
        "product-tile",
        "editorial-feature",
        "portrait-story",
        "finish-swatch",
        "mobile-hero",
      ]),
    );
  });
  it("supports modern image, video and 3D delivery formats", () => {
    expect(supportedMediaFormats.images).toEqual(
      expect.arrayContaining(["png", "jpg", "webp", "avif"]),
    );
    expect(supportedMediaFormats.video).toEqual(["mp4", "webm"]);
    expect(supportedMediaFormats.models).toEqual(["glb", "usdz"]);
  });
  it("has no blocking media audit errors", () => {
    expect(
      auditMedia(Object.values(mediaAssets)).filter(
        (issue) => issue.severity === "error",
      ),
    ).toEqual([]);
  });
});
