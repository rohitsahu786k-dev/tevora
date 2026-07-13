import { describe, expect, it } from "vitest";
import { brandSettings } from "@/config/brand";
import {
  publishedProjects,
  publishedResources,
  productFamilies,
  sectors,
  spaces,
} from "@/content";
import { mainNavigation } from "@/config/navigation";

describe("launch-facing brand contracts", () => {
  it("preserves the primary identity verbatim", () => {
    expect(brandSettings.brandName).toBe("TEVORA");
    expect(brandSettings.brandDescriptor).toBe("Technology Furniture");
    expect(brandSettings.brandLine).toBe("Technology, built into the space.");
  });

  it("uses concrete primary-navigation terminology", () => {
    expect(mainNavigation.map((item) => item.label)).toEqual([
      "Products",
      "Spaces",
      "Sectors",
      "Configure",
      "Projects",
      "Resources",
      "Design Support",
      "Partners",
      "Company",
      "Contact",
    ]);
  });

  it("does not publish unapproved projects or resource files", () => {
    expect(
      publishedProjects.every((item) => item.dataStatus === "verified"),
    ).toBe(true);
    expect(
      publishedResources.every(
        (item) => item.dataStatus === "verified" && item.file,
      ),
    ).toBe(true);
  });

  it("keeps control and command within a broad market taxonomy", () => {
    expect(sectors).toHaveLength(12);
    expect(
      sectors.filter((item) => item.slug === "control-command"),
    ).toHaveLength(1);
    expect(spaces.filter((item) => item.slug === "control-room")).toHaveLength(
      1,
    );
    expect(
      productFamilies.some((item) => item.slug === "presentation-stations"),
    ).toBe(true);
  });

  it("keeps the future parent endorsement hidden", () => {
    expect(brandSettings.parentBrandName).toBe("OnePWS");
    expect(brandSettings.parentBrandVisibility).toBe(false);
  });
});
