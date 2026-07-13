export const partnerTypes = [
  "authorised-dealer",
  "av-integration-partner",
  "distribution-partner",
  "design-specification-partner",
  "education-solutions-partner",
  "specialist-solutions-partner",
  "technology-alliance-partner",
] as const;

export type PartnerType = (typeof partnerTypes)[number];

export const partnerApplicationStatuses = [
  "draft",
  "submitted",
  "under-initial-review",
  "additional-information-required",
  "capability-review",
  "commercial-review",
  "territory-review",
  "approved-in-principle",
  "approved",
  "waitlisted",
  "declined",
  "withdrawn",
  "archived",
] as const;

export type PartnerApplicationStatus =
  (typeof partnerApplicationStatuses)[number];

export const publicPartnerStatuses = [
  "draft",
  "submitted",
  "additional-information-required",
  "approved",
  "declined",
  "withdrawn",
] as const satisfies readonly PartnerApplicationStatus[];

export type CapabilityLevel = "in-house" | "outsourced" | "not-available";

export interface PartnerApplicationContext {
  applicationId: string;
  reference: string;
  submittedAt: string;
  schemaVersion: 1;
  status: PartnerApplicationStatus;
}

export interface PartnerApplicationReceipt {
  reference: string;
  companyName: string;
  primaryContactName: string;
  submittedAt: string;
  partnerTypes: PartnerType[];
}

export interface PartnerInternalReview {
  internalScore?: number;
  internalReviewer?: string;
  reviewNotes: string[];
  riskFlags: string[];
  missingDocuments: string[];
  recommendedNextAction?: string;
  assignedRegionalManager?: string;
}

export interface PartnerScoreFactor {
  id: string;
  label: string;
  weight: number;
  enabled: boolean;
  maximum: number;
}

export interface PartnerScoreResult {
  total: number;
  maximum: number;
  factors: Array<{ id: string; score: number; maximum: number }>;
  riskFlags: string[];
  note: string;
}
