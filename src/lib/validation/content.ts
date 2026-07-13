import { z } from "zod";

export const idSchema = z.string().min(1);
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Must be a URL-safe slug");
export const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().int().positive().nullable(),
  height: z.number().int().positive().nullable(),
  caption: z.string().optional(),
});
export const videoSchema = z.object({
  src: z.string().min(1),
  title: z.string().min(1),
  poster: imageSchema.optional(),
  transcript: z.string().optional(),
  durationSeconds: z.number().nonnegative().optional(),
});
export const mediaSchema = z
  .object({
    type: z.enum(["image", "video"]),
    image: imageSchema.optional(),
    video: videoSchema.optional(),
  })
  .superRefine((media, ctx) => {
    if (media.type === "image" && !media.image)
      ctx.addIssue({
        code: "custom",
        message: "Image media requires image data",
      });
    if (media.type === "video" && !media.video)
      ctx.addIssue({
        code: "custom",
        message: "Video media requires video data",
      });
  });
export const downloadSchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  file: z.string().min(1),
  fileFormat: z.string().min(1),
  fileSize: z.string().nullable(),
  revision: z.string().nullable(),
  language: z.string().min(2),
  lastUpdated: z.string().nullable(),
  accessLevel: z.enum(["public", "registered", "restricted"]),
});
export const specificationItemSchema = z.object({
  label: z.string().min(1),
  value: z.string().nullable(),
  unit: z.string().optional(),
  note: z.string().optional(),
  verified: z.boolean(),
});
export const specificationGroupSchema = z.object({
  name: z.string().min(1),
  items: z.array(specificationItemSchema),
});
export const finishSchema = z.object({
  id: idSchema,
  name: z.string().min(1),
  code: z.string().optional(),
  swatch: imageSchema.optional(),
  description: z.string().optional(),
});
export const featureStorySchema = z.object({
  id: idSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  media: mediaSchema.optional(),
});
export const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  style: z.enum(["primary", "secondary", "text"]).optional(),
});
export const quoteSchema = z.object({
  quote: z.string().min(1),
  attribution: z.string().optional(),
  role: z.string().optional(),
  organisation: z.string().optional(),
});
export const metricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  unit: z.string().optional(),
  verified: z.boolean(),
});
export const compatibilityRuleSchema = z.object({
  id: idSchema,
  type: z.enum(["includes", "requires", "excludes", "conditional"]),
  subject: z.string().min(1),
  target: z.string().min(1),
  note: z.string().optional(),
  verified: z.boolean(),
});
export const navigationItemSchema: z.ZodType<{
  label: string;
  href: string;
  children?: unknown[];
  external?: boolean;
}> = z.lazy(() =>
  z.object({
    label: z.string().min(1),
    href: z.string().min(1),
    children: z.array(navigationItemSchema).optional(),
    external: z.boolean().optional(),
  }),
);
export const filterDefinitionSchema = z.object({
  id: idSchema,
  label: z.string().min(1),
  field: z.string().min(1),
  type: z.enum(["single", "multiple", "range", "boolean"]),
  options: z
    .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
    .optional(),
});
export const contactDetailsSchema = z.object({
  email: z.email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  enquiryUrl: z.string().optional(),
});
export const seoMetadataSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  canonicalUrl: z.string().optional(),
  image: imageSchema.optional(),
  noIndex: z.boolean().optional(),
});
const dataStatus = z.enum(["placeholder", "verified"]);
const aliases = { title: z.string().min(1), summary: z.string().min(1) };

export const brandSettingsSchema = z.object({
  brandName: z.string().min(1),
  brandDescriptor: z.string().min(1),
  brandLine: z.string().min(1),
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  logoLight: z.string().min(1),
  logoDark: z.string().min(1),
  brandSymbol: z.string().min(1),
  favicon: z.string().min(1),
  primaryColour: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  accentColour: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  parentBrandName: z.string(),
  parentBrandVisibility: z.boolean(),
  parentBrandRelationshipText: z.string(),
  legalCompanyName: z.string().min(1),
  contactDetails: contactDetailsSchema,
  socialLinks: z.array(
    z.object({ label: z.string().min(1), href: z.string().min(1) }),
  ),
  regionalSettings: z.object({
    region: z.string().min(1),
    language: z.string().min(2),
    locale: z.string().min(2),
    currency: z.string().nullable(),
  }),
  seoDefaults: seoMetadataSchema.extend({ titleTemplate: z.string().min(1) }),
});
export const productSeriesSchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
});
export const productFamilySchema = z.object({
  id: idSchema,
  name: z.string().min(1),
  slug: slugSchema,
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  statement: z.string().min(1),
  heroMedia: mediaSchema.nullable(),
  thumbnailMedia: mediaSchema.nullable(),
  featuredProducts: z.array(idSchema),
  supportedSpaces: z.array(idSchema),
  supportedSectors: z.array(idSchema),
  keyCapabilities: z.array(z.string()),
  relatedFamilies: z.array(idSchema),
  filterDefinitions: z.array(filterDefinitionSchema),
  seo: seoMetadataSchema,
  productTypes: z.array(z.string().min(1)).min(1),
  series: z.array(productSeriesSchema).min(1),
  dataStatus,
  ...aliases,
});
export const productSchema = z
  .object({
    id: idSchema,
    name: z.string().min(1),
    series: z.string().min(1),
    model: z.string().nullable(),
    slug: slugSchema,
    productFamily: idSchema,
    descriptor: z.string().min(1),
    summary: z.string().min(1),
    overview: z.string().min(1),
    useCases: z.array(z.string()),
    heroMedia: mediaSchema.nullable(),
    gallery: z.array(mediaSchema),
    featureStories: z.array(featureStorySchema),
    keyFeatures: z.array(z.string()),
    technicalSpecifications: z.array(specificationGroupSchema),
    dimensions: specificationGroupSchema.nullable(),
    equipmentCapacity: specificationGroupSchema.nullable(),
    rackCapacity: specificationGroupSchema.nullable(),
    displayCompatibility: z.array(compatibilityRuleSchema),
    vesaCompatibility: z.array(compatibilityRuleSchema),
    deviceCompatibility: z.array(compatibilityRuleSchema),
    cameraCompatibility: z.array(compatibilityRuleSchema),
    soundbarCompatibility: z.array(compatibilityRuleSchema),
    cableManagement: z.string().nullable(),
    ventilation: z.string().nullable(),
    cooling: z.string().nullable(),
    serviceAccess: z.string().nullable(),
    accessibility: z.string().nullable(),
    mobility: z.string().nullable(),
    heightAdjustment: z.string().nullable(),
    powerAndData: z.string().nullable(),
    finishes: z.array(finishSchema),
    variants: z.array(idSchema),
    compatibleAccessories: z.array(idSchema),
    supportedSpaces: z.array(idSchema),
    supportedSectors: z.array(idSchema),
    standards: z.array(z.string()),
    certifications: z.array(z.string()),
    sustainability: z.array(z.string()),
    downloads: z.array(downloadSchema),
    configurable: z.boolean(),
    customisable: z.boolean(),
    enquiryOnly: z.boolean(),
    productStatus: z.enum([
      "concept",
      "coming-soon",
      "available",
      "discontinued",
      "placeholder",
    ]),
    seo: seoMetadataSchema,
    dataStatus,
    title: z.string().min(1),
    family: slugSchema,
    features: z.array(z.string()),
  })
  .superRefine((product, ctx) => {
    if (product.dataStatus !== "placeholder") return;
    const forbiddenArrays = [
      "standards",
      "certifications",
      "sustainability",
      "displayCompatibility",
      "vesaCompatibility",
      "deviceCompatibility",
      "cameraCompatibility",
      "soundbarCompatibility",
    ] as const;
    for (const field of forbiddenArrays)
      if (product[field].length)
        ctx.addIssue({
          code: "custom",
          path: [field],
          message: `Placeholder products cannot contain ${field}`,
        });
    for (const field of [
      "dimensions",
      "equipmentCapacity",
      "rackCapacity",
    ] as const)
      if (product[field] !== null)
        ctx.addIssue({
          code: "custom",
          path: [field],
          message: `Placeholder products cannot contain ${field}`,
        });
  });
export const accessoryGroupSchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
});
export const accessorySchema = z
  .object({
    id: idSchema,
    name: z.string().min(1),
    series: z.string().nullable(),
    model: z.string().nullable(),
    slug: slugSchema,
    accessoryGroup: idSchema,
    descriptor: z.string().min(1),
    description: z.string().min(1),
    heroMedia: mediaSchema.nullable(),
    gallery: z.array(mediaSchema),
    specifications: z.array(specificationGroupSchema),
    compatibilityRules: z.array(compatibilityRuleSchema),
    compatibleProducts: z.array(idSchema),
    requiredProducts: z.array(idSchema),
    requiredAccessories: z.array(idSchema),
    excludedAccessories: z.array(idSchema),
    downloads: z.array(downloadSchema),
    seo: seoMetadataSchema,
    dataStatus,
    ...aliases,
    group: slugSchema,
  })
  .superRefine((accessory, ctx) => {
    if (
      accessory.dataStatus === "placeholder" &&
      (accessory.specifications.length || accessory.compatibilityRules.length)
    )
      ctx.addIssue({
        code: "custom",
        message:
          "Placeholder accessories cannot contain specifications or compatibility claims",
      });
  });
export const spaceSchema = z.object({
  id: idSchema,
  name: z.string().min(1),
  slug: slugSchema,
  group: z.string().min(1),
  description: z.string().min(1),
  primaryUsers: z.array(z.string()),
  activities: z.array(z.string()),
  designPriorities: z.array(z.string()),
  technologyRequirements: z.array(z.string()),
  recommendedFamilies: z.array(idSchema),
  recommendedProducts: z.array(idSchema),
  recommendedAccessories: z.array(idSchema),
  relatedSectors: z.array(idSchema),
  heroMedia: mediaSchema.nullable(),
  resources: z.array(idSchema),
  seo: seoMetadataSchema,
  dataStatus,
  ...aliases,
});
export const sectorSchema = z.object({
  id: idSchema,
  name: z.string().min(1),
  slug: slugSchema,
  description: z.string().min(1),
  challenges: z.array(z.string()),
  typicalSpaces: z.array(idSchema),
  recommendedFamilies: z.array(idSchema),
  recommendedProducts: z.array(idSchema),
  projects: z.array(idSchema),
  heroMedia: mediaSchema.nullable(),
  resources: z.array(idSchema),
  seo: seoMetadataSchema,
  dataStatus,
  ...aliases,
});
export const projectSchema = z
  .object({
    id: idSchema,
    slug: slugSchema,
    projectName: z.string().min(1),
    clientDisplayName: z.string().nullable(),
    location: z.string().nullable(),
    projectType: z.string().nullable(),
    sector: idSchema.nullable(),
    spaces: z.array(idSchema),
    challenge: z.string().min(1),
    approach: z.string().min(1),
    technologyRequirements: z.array(z.string()),
    productsUsed: z.array(idSchema),
    accessoriesUsed: z.array(idSchema),
    outcomes: z.array(z.string()),
    gallery: z.array(mediaSchema),
    testimonial: quoteSchema.nullable(),
    completionDate: z.string().nullable(),
    seo: seoMetadataSchema,
    dataStatus,
    ...aliases,
  })
  .superRefine((project, ctx) => {
    if (
      project.dataStatus === "placeholder" &&
      (project.clientDisplayName !== null ||
        project.testimonial !== null ||
        project.outcomes.length)
    )
      ctx.addIssue({
        code: "custom",
        message:
          "Placeholder projects cannot contain client names, testimonials or outcome claims",
      });
  });
export const resourceSchema = z.object({
  id: idSchema,
  slug: slugSchema,
  title: z.string().min(1),
  resourceType: z.enum([
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
  ]),
  productFamily: idSchema.nullable(),
  product: idSchema.nullable(),
  accessory: idSchema.nullable(),
  sectors: z.array(idSchema),
  spaces: z.array(idSchema),
  file: z.string().nullable(),
  fileFormat: z.string().nullable(),
  fileSize: z.string().nullable(),
  revision: z.string().nullable(),
  language: z.string().min(2),
  lastUpdated: z.string().nullable(),
  accessLevel: z.enum(["public", "registered", "restricted"]),
  seo: seoMetadataSchema,
  dataStatus,
  summary: z.string().min(1),
  kind: z.enum(["guide", "download", "article"]),
});

function assertUnique(values: string[], label: string) {
  const duplicate = values.find(
    (value, index) => values.indexOf(value) !== index,
  );
  if (duplicate) throw new Error(`Duplicate ${label}: ${duplicate}`);
}
export function validateContent(input: {
  brandSettings: unknown;
  productFamilies: unknown[];
  products: unknown[];
  accessoryGroups: unknown[];
  accessories: unknown[];
  spaces: unknown[];
  sectors: unknown[];
  projects: unknown[];
  resources: unknown[];
}) {
  brandSettingsSchema.parse(input.brandSettings);
  const families = z.array(productFamilySchema).parse(input.productFamilies);
  const products = z.array(productSchema).parse(input.products);
  const groups = z.array(accessoryGroupSchema).parse(input.accessoryGroups);
  const accessories = z.array(accessorySchema).parse(input.accessories);
  z.array(spaceSchema).parse(input.spaces);
  z.array(sectorSchema).parse(input.sectors);
  z.array(projectSchema).parse(input.projects);
  z.array(resourceSchema).parse(input.resources);
  for (const [label, items] of [
    ["product-family", families],
    ["product", products],
    ["accessory-group", groups],
    ["accessory", accessories],
  ] as const)
    assertUnique(
      items.map((item) => item.slug),
      `${label} slug`,
    );
  const familyIds = new Set(families.map((item) => item.id));
  const groupIds = new Set(groups.map((item) => item.slug));
  for (const product of products)
    if (!familyIds.has(product.productFamily))
      throw new Error(
        `Product ${product.slug} references unknown family ${product.productFamily}`,
      );
  for (const accessory of accessories)
    if (!groupIds.has(accessory.accessoryGroup))
      throw new Error(
        `Accessory ${accessory.slug} references unknown group ${accessory.accessoryGroup}`,
      );
  return {
    families: families.length,
    products: products.length,
    accessoryGroups: groups.length,
    accessories: accessories.length,
  };
}
export const validateProductTaxonomy = validateContent;
