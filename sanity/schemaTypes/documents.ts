import { defineArrayMember, defineField, defineType } from "sanity";
import { isUniqueAcrossType } from "../lib/slug";

const slug = defineField({
  name: "slug",
  type: "slug",
  options: { source: "name", maxLength: 96, isUnique: isUniqueAcrossType },
  validation: (rule) => rule.required(),
});
const titleSlug = [
  defineField({
    name: "name",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  slug,
];
const publishing = [
  defineField({
    name: "status",
    type: "string",
    options: { list: ["draft", "active", "archived"] },
    initialValue: "draft",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "publishAt",
    title: "Scheduled publish time",
    type: "datetime",
    description: "Readiness field for a future scheduling integration.",
  }),
];
const seoField = defineField({ name: "seo", type: "seo" });
const refs = (name: string, to: string) =>
  defineField({
    name,
    type: "array",
    of: [
      defineArrayMember({
        type: "reference",
        to: [{ type: to }],
        options: { disableNew: true },
      }),
    ],
  });

export const brandSettings = defineType({
  name: "brandSettings",
  title: "Brand settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "brandDescriptor", type: "string" }),
    defineField({ name: "brandLine", type: "string" }),
    defineField({ name: "shortDescription", type: "text" }),
    defineField({ name: "longDescription", type: "portableText" }),
    defineField({ name: "logoLight", type: "imageWithAlt" }),
    defineField({ name: "logoDark", type: "imageWithAlt" }),
    defineField({ name: "brandSymbol", type: "imageWithAlt" }),
    defineField({ name: "favicon", type: "image" }),
    defineField({ name: "primaryColour", type: "string" }),
    defineField({ name: "accentColour", type: "string" }),
    defineField({
      name: "showParentBrand",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "hideParentBrand",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "parentBrandName", type: "string" }),
    defineField({ name: "parentBrandLogo", type: "imageWithAlt" }),
    defineField({ name: "relationshipText", type: "string" }),
    defineField({
      name: "footerEndorsement",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "companyPageEndorsement",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "legalCompanyName", type: "string" }),
    defineField({
      name: "contactDetails",
      type: "object",
      fields: [
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "address", type: "text" }),
      ],
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "url", type: "url" }),
          ],
        }),
      ],
    }),
    defineField({ name: "region", type: "string" }),
    defineField({ name: "language", type: "string", initialValue: "en" }),
    seoField,
  ],
  validation: (rule) =>
    rule.custom((value) =>
      value?.showParentBrand && value?.hideParentBrand
        ? "Show and hide parent brand cannot both be enabled."
        : true,
    ),
});

export const productFamily = defineType({
  name: "productFamily",
  title: "Product family",
  type: "document",
  fields: [
    ...titleSlug,
    defineField({
      name: "shortDescription",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "longDescription", type: "portableText" }),
    defineField({ name: "statement", type: "string" }),
    defineField({ name: "heroMedia", type: "gallery" }),
    defineField({ name: "thumbnail", type: "imageWithAlt" }),
    defineField({
      name: "productTypes",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "series",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    refs("featuredProducts", "product"),
    refs("supportedSpaces", "space"),
    refs("supportedSectors", "sector"),
    defineField({
      name: "keyCapabilities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    refs("relatedFamilies", "productFamily"),
    ...publishing,
    seoField,
  ],
});
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    ...titleSlug,
    defineField({
      name: "series",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "model", type: "string" }),
    defineField({
      name: "productFamily",
      type: "reference",
      to: [{ type: "productFamily" }],
      options: { disableNew: true },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "descriptor", type: "string" }),
    defineField({ name: "overview", type: "portableText" }),
    defineField({ name: "heroMedia", type: "gallery" }),
    defineField({ name: "gallery", type: "gallery" }),
    defineField({
      name: "featureStories",
      type: "array",
      of: [defineArrayMember({ type: "featureStory" })],
    }),
    defineField({
      name: "technicalSpecifications",
      type: "array",
      of: [defineArrayMember({ type: "specificationGroup" })],
    }),
    defineField({
      name: "finishes",
      type: "array",
      of: [defineArrayMember({ type: "finishSwatch" })],
    }),
    refs("compatibleAccessories", "accessory"),
    refs("supportedSpaces", "space"),
    refs("supportedSectors", "sector"),
    defineField({
      name: "downloads",
      type: "array",
      of: [defineArrayMember({ type: "downloadableFile" })],
    }),
    defineField({ name: "configurable", type: "boolean", initialValue: false }),
    defineField({ name: "customisable", type: "boolean", initialValue: false }),
    defineField({ name: "enquiryOnly", type: "boolean", initialValue: true }),
    defineField({
      name: "productStatus",
      type: "string",
      options: {
        list: ["placeholder", "development", "active", "discontinued"],
      },
      initialValue: "placeholder",
      validation: (rule) => rule.required(),
    }),
    ...publishing,
    seoField,
  ],
});
export const accessory = defineType({
  name: "accessory",
  title: "Accessory",
  type: "document",
  fields: [
    ...titleSlug,
    defineField({ name: "series", type: "string" }),
    defineField({ name: "model", type: "string" }),
    defineField({
      name: "accessoryGroup",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "descriptor", type: "string" }),
    defineField({ name: "description", type: "portableText" }),
    defineField({ name: "heroMedia", type: "gallery" }),
    defineField({
      name: "specifications",
      type: "array",
      of: [defineArrayMember({ type: "specificationGroup" })],
    }),
    defineField({
      name: "compatibilityRules",
      type: "array",
      of: [defineArrayMember({ type: "compatibilityRule" })],
    }),
    refs("compatibleProducts", "product"),
    refs("requiredProducts", "product"),
    refs("requiredAccessories", "accessory"),
    refs("excludedAccessories", "accessory"),
    defineField({
      name: "downloads",
      type: "array",
      of: [defineArrayMember({ type: "downloadableFile" })],
    }),
    ...publishing,
    seoField,
  ],
});
export const space = defineType({
  name: "space",
  title: "Space",
  type: "document",
  fields: [
    ...titleSlug,
    defineField({
      name: "group",
      type: "string",
      options: {
        list: [
          "Education",
          "Corporate",
          "Specialist",
          "Public and Self-Service",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "portableText" }),
    defineField({
      name: "primaryUsers",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "activities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "designPriorities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "technologyRequirements",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    refs("recommendedFamilies", "productFamily"),
    refs("recommendedProducts", "product"),
    refs("recommendedAccessories", "accessory"),
    refs("relatedSectors", "sector"),
    defineField({ name: "heroMedia", type: "gallery" }),
    ...publishing,
    seoField,
  ],
});
export const sector = defineType({
  name: "sector",
  title: "Sector",
  type: "document",
  fields: [
    ...titleSlug,
    defineField({ name: "description", type: "portableText" }),
    defineField({
      name: "challenges",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    refs("typicalSpaces", "space"),
    refs("recommendedFamilies", "productFamily"),
    refs("recommendedProducts", "product"),
    refs("projects", "project"),
    defineField({ name: "heroMedia", type: "gallery" }),
    ...publishing,
    seoField,
  ],
});
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "projectName",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      ...slug,
      options: { ...slug.options, source: "projectName" },
    }),
    defineField({
      name: "clientDisplayName",
      type: "string",
      description: "Publish only with explicit client approval.",
    }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "projectType", type: "string" }),
    defineField({
      name: "sector",
      type: "reference",
      to: [{ type: "sector" }],
      options: { disableNew: true },
    }),
    refs("spaces", "space"),
    defineField({ name: "challenge", type: "portableText" }),
    defineField({ name: "approach", type: "portableText" }),
    defineField({
      name: "technologyRequirements",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    refs("productsUsed", "product"),
    refs("accessoriesUsed", "accessory"),
    defineField({
      name: "outcomes",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "gallery", type: "gallery" }),
    defineField({ name: "testimonial", type: "quote" }),
    defineField({ name: "completionDate", type: "date" }),
    ...publishing,
    seoField,
  ],
  preview: { select: { title: "projectName", subtitle: "location" } },
});
export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ ...slug, options: { ...slug.options, source: "title" } }),
    defineField({
      name: "resourceType",
      type: "string",
      options: {
        list: [
          "product-brochure",
          "product-data-sheet",
          "technical-specification",
          "cad",
          "bim",
          "revit",
          "step",
          "installation-guide",
          "finish-card",
          "sustainability-document",
          "certification",
          "planning-guide",
          "video",
          "product-image",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "productFamily",
      type: "reference",
      to: [{ type: "productFamily" }],
      options: { disableNew: true },
    }),
    defineField({
      name: "product",
      type: "reference",
      to: [{ type: "product" }],
      options: { disableNew: true },
    }),
    defineField({
      name: "accessory",
      type: "reference",
      to: [{ type: "accessory" }],
      options: { disableNew: true },
    }),
    refs("sectors", "sector"),
    refs("spaces", "space"),
    defineField({ name: "file", type: "downloadableFile" }),
    defineField({
      name: "revisionHistory",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "revision",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "date", type: "date" }),
            defineField({ name: "notes", type: "text" }),
          ],
        }),
      ],
    }),
    ...publishing,
    seoField,
  ],
});
export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ ...slug, options: { ...slug.options, source: "title" } }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "body", type: "portableText" }),
    defineField({ name: "heroImage", type: "imageWithAlt" }),
    refs("authors", "person"),
    refs("relatedProducts", "product"),
    refs("relatedSpaces", "space"),
    refs("relatedSectors", "sector"),
    ...publishing,
    seoField,
  ],
});
export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    ...titleSlug,
    defineField({ name: "role", type: "string" }),
    defineField({ name: "biography", type: "portableText" }),
    defineField({ name: "portrait", type: "imageWithAlt" }),
    defineField({ name: "email", type: "string" }),
    ...publishing,
  ],
});
export const officeLocation = defineType({
  name: "officeLocation",
  title: "Office location",
  type: "document",
  fields: [
    ...titleSlug,
    defineField({ name: "address", type: "text" }),
    defineField({ name: "country", type: "string" }),
    defineField({ name: "region", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "mapUrl", type: "url" }),
    ...publishing,
    seoField,
  ],
});
const navItems = defineField({
  name: "items",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      fields: [
        defineField({
          name: "label",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "href",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "description", type: "text" }),
        defineField({
          name: "children",
          type: "array",
          of: [defineArrayMember({ type: "cta" })],
        }),
      ],
    }),
  ],
});
export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    navItems,
  ],
});
export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "brandLine", type: "string" }),
    navItems,
    defineField({
      name: "legalLinks",
      type: "array",
      of: [defineArrayMember({ type: "cta" })],
    }),
    defineField({
      name: "showEndorsement",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
const pageFields = [
  defineField({
    name: "title",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({ name: "eyebrow", type: "string" }),
  defineField({ name: "heroCopy", type: "portableText" }),
  defineField({ name: "heroMedia", type: "gallery" }),
  defineField({
    name: "sections",
    type: "array",
    of: [defineArrayMember({ type: "featureStory" })],
  }),
  seoField,
];
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    ...pageFields,
    refs("featuredFamilies", "productFamily"),
    refs("featuredSpaces", "space"),
    refs("featuredProjects", "project"),
  ],
});
export const companyPage = defineType({
  name: "companyPage",
  title: "Company page",
  type: "document",
  fields: [
    ...pageFields,
    defineField({
      name: "showParentBrandEndorsement",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
export const designSupportPage = defineType({
  name: "designSupportPage",
  title: "Design support page",
  type: "document",
  fields: [
    ...pageFields,
    defineField({
      name: "audiences",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "supportAreas",
      type: "array",
      of: [defineArrayMember({ type: "featureStory" })],
    }),
  ],
});
export const seoDefaults = defineType({
  name: "seoDefaults",
  title: "SEO defaults",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", initialValue: "Global SEO" }),
    defineField({
      name: "defaults",
      type: "seo",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "siteUrl", type: "url" }),
  ],
});
export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "source",
      type: "string",
      validation: (rule) => rule.required().regex(/^\//, "Must begin with /."),
    }),
    defineField({
      name: "destination",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "permanent", type: "boolean", initialValue: true }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
  ],
});

export const partnerType = defineType({
  name: "partnerType",
  title: "Partner type",
  type: "document",
  fields: [
    ...titleSlug,
    defineField({
      name: "description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "idealOrganisation", type: "string" }),
    defineField({ name: "typicalCapabilities", type: "text" }),
    defineField({ name: "typicalCustomerBase", type: "text" }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
    defineField({ name: "sortOrder", type: "number" }),
  ],
});

export const partnerBenefit = defineType({
  name: "partnerBenefit",
  title: "Partner benefit",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "qualification",
      type: "string",
      description:
        "For example: subject to partner type, region and agreement.",
    }),
    defineField({ name: "sortOrder", type: "number" }),
  ],
});

export const partnerRequirement = defineType({
  name: "partnerRequirement",
  title: "Partner requirement",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "mandatory", type: "boolean", initialValue: false }),
    defineField({ name: "sortOrder", type: "number" }),
  ],
});

export const partnerFaq = defineType({
  name: "partnerFaq",
  title: "Partner FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      type: "portableText",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "sortOrder", type: "number" }),
  ],
});

export const partnerJourneyStep = defineType({
  name: "partnerJourneyStep",
  title: "Partner journey step",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "sortOrder",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
  ],
});

export const partnerLegalDisclaimer = defineType({
  name: "partnerLegalDisclaimer",
  title: "Partner legal disclaimer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "portableText",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "region", type: "string" }),
    defineField({
      name: "version",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "effectiveFrom", type: "date" }),
    defineField({ name: "active", type: "boolean", initialValue: false }),
  ],
});

export const partnerRegionSettings = defineType({
  name: "partnerRegionSettings",
  title: "Partner region settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "regionCode",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "countries",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "programmeOpen",
      type: "boolean",
      initialValue: false,
    }),
    refs("availablePartnerTypes", "partnerType"),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "availabilityMessage", type: "text" }),
    defineField({
      name: "assignedRegionalRole",
      type: "string",
      description: "Role label only; do not store private reviewer data here.",
    }),
  ],
});

export const partnerApplicationSettings = defineType({
  name: "partnerApplicationSettings",
  title: "Partner application settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      initialValue: "Global partner application",
    }),
    defineField({
      name: "programmeOpen",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "closedMessage", type: "text" }),
    defineField({
      name: "applicationQuestions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "id",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "helpText", type: "text" }),
            defineField({
              name: "required",
              type: "boolean",
              initialValue: false,
            }),
            defineField({ name: "region", type: "string" }),
          ],
        }),
      ],
    }),
    refs("legalDisclaimers", "partnerLegalDisclaimer"),
    defineField({ name: "privacyPolicyUrl", type: "url" }),
    defineField({ name: "partnerContactEmail", type: "string" }),
    defineField({
      name: "maximumFileSizeMb",
      type: "number",
      initialValue: 15,
    }),
    defineField({
      name: "dataRetentionDays",
      type: "number",
      description: "Requires legal and privacy approval before activation.",
    }),
  ],
});

export const partnerProgrammePage = defineType({
  name: "partnerProgrammePage",
  title: "Partner programme page",
  type: "document",
  fields: [
    ...pageFields,
    defineField({
      name: "programmeOpen",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "programmeStatement", type: "text" }),
    refs("partnerTypes", "partnerType"),
    refs("benefits", "partnerBenefit"),
    refs("requirements", "partnerRequirement"),
    refs("faqs", "partnerFaq"),
    refs("journey", "partnerJourneyStep"),
    refs("regions", "partnerRegionSettings"),
    defineField({ name: "applicationCta", type: "cta" }),
  ],
});

export const documentTypes = [
  brandSettings,
  productFamily,
  product,
  accessory,
  space,
  sector,
  project,
  resource,
  article,
  person,
  officeLocation,
  navigation,
  footer,
  homepage,
  companyPage,
  designSupportPage,
  partnerProgrammePage,
  partnerType,
  partnerBenefit,
  partnerRequirement,
  partnerFaq,
  partnerJourneyStep,
  partnerApplicationSettings,
  partnerRegionSettings,
  partnerLegalDisclaimer,
  seoDefaults,
  redirect,
];
