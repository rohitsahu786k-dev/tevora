import { describe, expect, it } from "vitest";
import { resources } from "@/content";
import { searchContent } from "@/components/search/search-data";
import { LocalSearchProvider } from "@/lib/search/providers";
import { resourceAccessSchema } from "@/lib/validation/resource-access";

describe("resources and global search", () => {
  it("contains every requested resource category as placeholder-safe data", () => {
    expect(
      new Set(resources.map((resource) => resource.resourceType)).size,
    ).toBe(14);
    expect(resources).toHaveLength(14);
    resources.forEach((resource) => {
      expect(resource.dataStatus).toBe("placeholder");
      expect(resource.file).toBeNull();
      expect(resource.fileSize).toBeNull();
      expect(resource.lastUpdated).toBeNull();
    });
  });

  it("searches products and company pages through the local provider", async () => {
    expect(
      searchContent("ARC").some((result) => result.category === "Products"),
    ).toBe(true);
    const provider = new LocalSearchProvider();
    const results = await provider.search({ query: "design support" });
    expect(results.some((result) => result.category === "Company Pages")).toBe(
      true,
    );
  });

  it("validates only the six approved gated-resource fields", () => {
    const result = resourceAccessSchema.parse({
      name: "Project User",
      company: "Example Practice",
      workEmail: "user@example.com",
      country: "India",
      role: "Architect",
      projectType: "Education",
    });
    expect(Object.keys(result)).toHaveLength(6);
  });
});
