import { describe, expect, it } from "vitest";
import { documentTypes } from "../../sanity/schemaTypes/documents";
import { reusableObjects } from "../../sanity/schemaTypes/objects";
import { collectionQueries, entryQueries } from "@/lib/cms/queries";

describe("Sanity CMS architecture", () => {
  it("registers every requested document type", () => {
    expect(new Set(documentTypes.map((type) => type.name))).toEqual(
      new Set([
        "brandSettings",
        "productFamily",
        "product",
        "accessory",
        "space",
        "sector",
        "project",
        "resource",
        "article",
        "person",
        "officeLocation",
        "navigation",
        "footer",
        "homepage",
        "companyPage",
        "designSupportPage",
        "partnerProgrammePage",
        "partnerType",
        "partnerBenefit",
        "partnerRequirement",
        "partnerFaq",
        "partnerJourneyStep",
        "partnerApplicationSettings",
        "partnerRegionSettings",
        "partnerLegalDisclaimer",
        "seoDefaults",
        "redirect",
      ]),
    );
  });
  it("registers relationship, media and structured-content objects", () => {
    const names = new Set(reusableObjects.map((type) => type.name));
    [
      "seo",
      "imageWithAlt",
      "video",
      "downloadableFile",
      "specificationGroup",
      "featureStory",
      "cta",
      "quote",
      "metric",
      "gallery",
      "finishSwatch",
      "compatibilityRule",
      "productRelationship",
      "accessoryRelationship",
      "spaceRelationship",
      "sectorRelationship",
      "portableText",
    ].forEach((name) => expect(names.has(name)).toBe(true));
  });
  it("provides collection and entry queries for every domain collection", () => {
    expect(Object.keys(collectionQueries).sort()).toEqual(
      Object.keys(entryQueries).sort(),
    );
    expect(Object.keys(collectionQueries)).toHaveLength(7);
  });
  it("defaults parent-brand presentation controls to hidden", () => {
    const brand = documentTypes.find((type) => type.name === "brandSettings");
    const fields = brand && "fields" in brand ? brand.fields : [];
    const show = fields.find((field) => field.name === "showParentBrand");
    const footer = fields.find((field) => field.name === "footerEndorsement");
    const company = fields.find(
      (field) => field.name === "companyPageEndorsement",
    );
    expect(show?.initialValue).toBe(false);
    expect(footer?.initialValue).toBe(false);
    expect(company?.initialValue).toBe(false);
  });
});
