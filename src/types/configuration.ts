export const CONFIGURATION_VERSION = 1 as const;

export type ConfigureEntryMode =
  | "find-product"
  | "configure-product"
  | "design-space"
  | "build-requirement"
  | "upload-layout"
  | "request-proposal";

export type RequirementAnswer = "" | "yes" | "no" | "unsure";

export interface ProductFinderAnswers {
  sector: string;
  space: string;
  activity: string;
  users: string;
  displaySize: string;
  displayQuantity: string;
  camera: string;
  soundbar: string;
  controlDevice: string;
  computingDevices: string;
  rackEquipment: RequirementAnswer;
  mobility: RequirementAnswer;
  heightAdjustment: RequirementAnswer;
  accessibility: RequirementAnswer;
  concealedStorage: RequirementAnswer;
  serviceAccess: string;
  cadBimRequired: RequirementAnswer;
  projectStage: string;
  projectLocation: string;
}

export interface ProductConfiguration {
  productSlug: string;
  model: string;
  displayConfiguration: string;
  deviceConfiguration: string;
  cameraConfiguration: string;
  soundbarConfiguration: string;
  rackConfiguration: string;
  finish: string;
  mobility: string;
  accessorySlugs: string[];
}

export interface TevoraConfigurationState {
  version: typeof CONFIGURATION_VERSION;
  id: string;
  updatedAt: string;
  mode: ConfigureEntryMode;
  finder: ProductFinderAnswers;
  configuration: ProductConfiguration;
}

export interface ConfigurationRecommendation {
  productSlug: string;
  familySlug: string;
  reasons: string[];
  limitations: string[];
  accessorySlugs: string[];
}

export interface ConfigurationIntegrationAdapters {
  viewer3d: unknown;
  pricingEngine: unknown;
  boqEngine: unknown;
  recommendationEngine: unknown;
  crm: unknown;
  partnerAccounts: unknown;
  pdfGeneration: unknown;
  cadExport: unknown;
  cloudRendering: unknown;
}
