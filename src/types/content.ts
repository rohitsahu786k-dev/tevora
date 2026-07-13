export type ID = string;
export type Slug = string;
export type DataStatus = "placeholder" | "verified";

export interface Image {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
  caption?: string;
}
export interface Video {
  src: string;
  title: string;
  poster?: Image;
  transcript?: string;
  durationSeconds?: number;
}
export interface Media {
  type: "image" | "video";
  image?: Image;
  video?: Video;
}
export interface Download {
  id: ID;
  title: string;
  file: string;
  fileFormat: string;
  fileSize: string | null;
  revision: string | null;
  language: string;
  lastUpdated: string | null;
  accessLevel: "public" | "registered" | "restricted";
}
export interface SpecificationItem {
  label: string;
  value: string | null;
  unit?: string;
  note?: string;
  verified: boolean;
}
export interface SpecificationGroup {
  name: string;
  items: SpecificationItem[];
}
export interface Finish {
  id: ID;
  name: string;
  code?: string;
  swatch?: Image;
  description?: string;
}
export interface FeatureStory {
  id: ID;
  title: string;
  description: string;
  media?: Media;
}
export interface CTA {
  label: string;
  href: string;
  style?: "primary" | "secondary" | "text";
}
export interface Quote {
  quote: string;
  attribution?: string;
  role?: string;
  organisation?: string;
}
export interface Metric {
  label: string;
  value: string;
  unit?: string;
  verified: boolean;
}
export interface CompatibilityRule {
  id: ID;
  type: "includes" | "requires" | "excludes" | "conditional";
  subject: string;
  target: string;
  note?: string;
  verified: boolean;
}
export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  external?: boolean;
}
export interface FilterDefinition {
  id: ID;
  label: string;
  field: string;
  type: "single" | "multiple" | "range" | "boolean";
  options?: { label: string; value: string }[];
}
export interface ContactDetails {
  email: string;
  phone: string;
  address: string;
  enquiryUrl?: string;
}
export interface SocialLink {
  label: string;
  href: string;
}
export interface RegionalSettings {
  region: string;
  language: string;
  locale: string;
  currency: string | null;
}
export interface SEOMetadata {
  title: string;
  description: string;
  canonicalUrl?: string;
  image?: Image;
  noIndex?: boolean;
}
export interface SEODefaults extends SEOMetadata {
  titleTemplate: string;
}

export interface BrandSettings {
  brandName: string;
  brandDescriptor: string;
  brandLine: string;
  shortDescription: string;
  longDescription: string;
  logoLight: string;
  logoDark: string;
  brandSymbol: string;
  favicon: string;
  primaryColour: string;
  accentColour: string;
  parentBrandName: string;
  parentBrandVisibility: boolean;
  parentBrandRelationshipText: string;
  legalCompanyName: string;
  contactDetails: ContactDetails;
  socialLinks: SocialLink[];
  regionalSettings: RegionalSettings;
  seoDefaults: SEODefaults;
}

export interface ProductSeries {
  name: string;
  slug: Slug;
}
export interface ProductFamily {
  id: ID;
  name: string;
  slug: Slug;
  shortDescription: string;
  longDescription: string;
  statement: string;
  heroMedia: Media | null;
  thumbnailMedia: Media | null;
  featuredProducts: ID[];
  supportedSpaces: ID[];
  supportedSectors: ID[];
  keyCapabilities: string[];
  relatedFamilies: ID[];
  filterDefinitions: FilterDefinition[];
  seo: SEOMetadata;
  productTypes: string[];
  series: ProductSeries[];
  dataStatus: DataStatus;
  /** Temporary display aliases used by shared collection components. */ title: string;
  summary: string;
}
export type ProductStatus =
  "concept" | "coming-soon" | "available" | "discontinued" | "placeholder";
export interface Product {
  id: ID;
  name: string;
  series: string;
  model: string | null;
  slug: Slug;
  productFamily: ID;
  descriptor: string;
  summary: string;
  overview: string;
  useCases: string[];
  heroMedia: Media | null;
  gallery: Media[];
  featureStories: FeatureStory[];
  keyFeatures: string[];
  technicalSpecifications: SpecificationGroup[];
  dimensions: SpecificationGroup | null;
  equipmentCapacity: SpecificationGroup | null;
  rackCapacity: SpecificationGroup | null;
  displayCompatibility: CompatibilityRule[];
  vesaCompatibility: CompatibilityRule[];
  deviceCompatibility: CompatibilityRule[];
  cameraCompatibility: CompatibilityRule[];
  soundbarCompatibility: CompatibilityRule[];
  cableManagement: string | null;
  ventilation: string | null;
  cooling: string | null;
  serviceAccess: string | null;
  accessibility: string | null;
  mobility: string | null;
  heightAdjustment: string | null;
  powerAndData: string | null;
  finishes: Finish[];
  variants: ID[];
  compatibleAccessories: ID[];
  supportedSpaces: ID[];
  supportedSectors: ID[];
  standards: string[];
  certifications: string[];
  sustainability: string[];
  downloads: Download[];
  configurable: boolean;
  customisable: boolean;
  enquiryOnly: boolean;
  productStatus: ProductStatus;
  seo: SEOMetadata;
  dataStatus: DataStatus;
  title: string;
  family: string;
  features: string[];
}
export interface AccessoryGroup {
  name: string;
  slug: Slug;
}
export interface Accessory {
  id: ID;
  name: string;
  series: string | null;
  model: string | null;
  slug: Slug;
  accessoryGroup: ID;
  descriptor: string;
  description: string;
  heroMedia: Media | null;
  gallery: Media[];
  specifications: SpecificationGroup[];
  compatibilityRules: CompatibilityRule[];
  compatibleProducts: ID[];
  requiredProducts: ID[];
  requiredAccessories: ID[];
  excludedAccessories: ID[];
  downloads: Download[];
  seo: SEOMetadata;
  dataStatus: DataStatus;
  title: string;
  summary: string;
  group: string;
}
export interface Space {
  id: ID;
  name: string;
  slug: Slug;
  group: string;
  description: string;
  primaryUsers: string[];
  activities: string[];
  designPriorities: string[];
  technologyRequirements: string[];
  recommendedFamilies: ID[];
  recommendedProducts: ID[];
  recommendedAccessories: ID[];
  relatedSectors: ID[];
  heroMedia: Media | null;
  resources: ID[];
  seo: SEOMetadata;
  dataStatus: DataStatus;
  title: string;
  summary: string;
}
export interface Sector {
  id: ID;
  name: string;
  slug: Slug;
  description: string;
  challenges: string[];
  typicalSpaces: ID[];
  recommendedFamilies: ID[];
  recommendedProducts: ID[];
  projects: ID[];
  heroMedia: Media | null;
  resources: ID[];
  seo: SEOMetadata;
  dataStatus: DataStatus;
  title: string;
  summary: string;
}
export interface Project {
  id: ID;
  slug: Slug;
  projectName: string;
  clientDisplayName: string | null;
  location: string | null;
  projectType: string | null;
  sector: ID | null;
  spaces: ID[];
  challenge: string;
  approach: string;
  technologyRequirements: string[];
  productsUsed: ID[];
  accessoriesUsed: ID[];
  outcomes: string[];
  gallery: Media[];
  testimonial: Quote | null;
  completionDate: string | null;
  seo: SEOMetadata;
  dataStatus: DataStatus;
  title: string;
  summary: string;
}
export type ResourceType =
  | "product-brochure"
  | "product-data-sheet"
  | "technical-specification"
  | "cad"
  | "bim"
  | "revit"
  | "step"
  | "installation-guide"
  | "finish-card"
  | "sustainability-document"
  | "certification"
  | "planning-guide"
  | "video"
  | "product-image";
export interface Resource {
  id: ID;
  slug: Slug;
  title: string;
  resourceType: ResourceType;
  productFamily: ID | null;
  product: ID | null;
  accessory: ID | null;
  sectors: ID[];
  spaces: ID[];
  file: string | null;
  fileFormat: string | null;
  fileSize: string | null;
  revision: string | null;
  language: string;
  lastUpdated: string | null;
  accessLevel: "public" | "registered" | "restricted";
  seo: SEOMetadata;
  dataStatus: DataStatus;
  summary: string;
  kind: "guide" | "download" | "article";
}

export type ContentEntry = { slug: string; title: string; summary: string };
