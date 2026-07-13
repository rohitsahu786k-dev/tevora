export type CompatibilityStatus =
  "verified" | "provisional" | "requires-technical-review" | "not-compatible";
export interface DisplayRange {
  minimum: string | null;
  maximum: string | null;
  unit: string | null;
  verified: boolean;
}
export interface ModelCompatibilityRule {
  productId: string;
  model: string;
  status: CompatibilityStatus;
  note: string;
}
export interface AccessoryCompatibilityProfile {
  accessoryId: string;
  compatibleProductIds: string[];
  compatibleProductFamilyIds: string[];
  incompatibleProductIds: string[];
  requiredBaseProduct: boolean;
  requiredAccessoryIds: string[];
  excludedAccessoryIds: string[];
  supportedDisplayRange: DisplayRange | null;
  supportedDeviceTypes: string[];
  supportedVesaPatterns: string[];
  installationTypes: string[];
  modelSpecificRules: ModelCompatibilityRule[];
  status: CompatibilityStatus;
  notes: string[];
  dataStatus: "placeholder" | "verified";
}
export interface CompatibilityContext {
  productId?: string;
  productFamilyId?: string;
  productModel?: string | null;
  selectedAccessoryIds: string[];
}
export interface CompatibilityResult {
  accessoryId: string;
  status: CompatibilityStatus;
  canSelect: boolean;
  reasons: string[];
  requiredAccessoryIds: string[];
  excludedAccessoryIds: string[];
  alternativeAccessoryIds: string[];
}
