import { describe, expect, it } from "vitest";
import { accessories, products } from "@/content";
import { compatibilityProfiles } from "@/content/compatibility";
import {
  canAddAccessory,
  evaluateCompatibility,
} from "@/lib/compatibility/engine";
import { validateCompatibilityProfiles } from "@/lib/validation/compatibility";
import type { AccessoryCompatibilityProfile } from "@/types/compatibility";

const product = products[0]!;
const profile = compatibilityProfiles.find((item) =>
  item.compatibleProductIds.includes(product.id),
)!;
const verified = (
  overrides: Partial<AccessoryCompatibilityProfile>,
): AccessoryCompatibilityProfile => ({
  ...profile,
  accessoryId: "accessory-test",
  compatibleProductIds: [product.id],
  compatibleProductFamilyIds: [product.productFamily],
  status: "verified",
  dataStatus: "verified",
  notes: [],
  ...overrides,
});
describe("compatibility engine", () => {
  it("validates production profiles without invented technical rules", () => {
    expect(validateCompatibilityProfiles(compatibilityProfiles)).toHaveLength(
      accessories.length,
    );
    expect(
      compatibilityProfiles.every(
        (item) =>
          item.status === "provisional" &&
          item.supportedDisplayRange === null &&
          item.supportedVesaPatterns.length === 0 &&
          item.modelSpecificRules.length === 0,
      ),
    ).toBe(true);
  });
  it("requires a base product before accessory selection", () => {
    const result = evaluateCompatibility(profile, { selectedAccessoryIds: [] });
    expect(result.status).toBe("requires-technical-review");
    expect(result.canSelect).toBe(false);
  });
  it("returns provisional for a mapped taxonomy relationship", () => {
    const result = evaluateCompatibility(profile, {
      productId: product.id,
      productFamilyId: product.productFamily,
      selectedAccessoryIds: [],
    });
    expect(result.status).toBe("provisional");
    expect(result.canSelect).toBe(true);
  });
  it("prevents explicit incompatible and excluded combinations", () => {
    const explicit = verified({
      incompatibleProductIds: [product.id],
      excludedAccessoryIds: ["accessory-conflict"],
    });
    const result = evaluateCompatibility(explicit, {
      productId: product.id,
      productFamilyId: product.productFamily,
      selectedAccessoryIds: ["accessory-conflict"],
    });
    expect(result.status).toBe("not-compatible");
    expect(result.canSelect).toBe(false);
    expect(
      canAddAccessory(explicit, {
        productId: product.id,
        selectedAccessoryIds: [],
      }),
    ).toBe(false);
  });
  it("blocks selection when required accessories are missing", () => {
    const requiring = verified({
      requiredAccessoryIds: ["accessory-required"],
    });
    const blocked = evaluateCompatibility(requiring, {
      productId: product.id,
      selectedAccessoryIds: [],
    });
    expect(blocked.canSelect).toBe(false);
    expect(blocked.requiredAccessoryIds).toEqual(["accessory-required"]);
    expect(
      evaluateCompatibility(requiring, {
        productId: product.id,
        selectedAccessoryIds: ["accessory-required"],
      }).canSelect,
    ).toBe(true);
  });
  it("applies model-specific rules and suggests alternatives", () => {
    const blocked = verified({
      modelSpecificRules: [
        {
          productId: product.id,
          model: "MODEL-A",
          status: "not-compatible",
          note: "Verified model exclusion.",
        },
      ],
    });
    const alternative = verified({ accessoryId: "accessory-alternative" });
    const result = evaluateCompatibility(
      blocked,
      {
        productId: product.id,
        productFamilyId: product.productFamily,
        productModel: "MODEL-A",
        selectedAccessoryIds: [],
      },
      [blocked, alternative],
    );
    expect(result.status).toBe("not-compatible");
    expect(result.alternativeAccessoryIds).toContain("accessory-alternative");
  });
});
