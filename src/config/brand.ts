import type { BrandSettings } from "@/types/content";

/** Placeholder contact values must be replaced before production launch. */
export const brandSettings: BrandSettings = {
  brandName: "ONESPACE",
  brandDescriptor: "Technology Furniture",
  brandLine: "Technology, built into the space.",
  shortDescription:
    "Technology-integrated furniture for technology-led spaces.",
  longDescription:
    "Technology-integrated furniture for presenting, teaching, meeting, collaborating, communicating and controlling.",
  logoLight: "/brand/onespace-logo-light.svg",
  logoDark: "/brand/onespace-logo-dark.svg",
  brandSymbol: "/brand/onespace-symbol.svg",
  favicon: "/brand/onespace-favicon.svg",
  primaryColour: "#18302b",
  accentColour: "#2f7968",
  parentBrandName: "OnePWS",
  parentBrandVisibility: false,
  parentBrandRelationshipText: "A OnePWS Company",
  legalCompanyName: "ONESPACE",
  contactDetails: {
    email: "marketing@onepws.com",
    phone: "+00 0000 000000",
    address: "Placeholder — regional contact details to be confirmed",
  },
  socialLinks: [],
  regionalSettings: {
    region: "Global",
    language: "en",
    locale: "en",
    currency: null,
  },
  seoDefaults: {
    titleTemplate: "%s | ONESPACE",
    title: "ONESPACE | Technology Furniture",
    description: "Technology, built into the space.",
  },
};

export type BrandConfig = typeof brandSettings;
