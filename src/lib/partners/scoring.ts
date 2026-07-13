import type { PartnerApplicationInput } from "@/lib/validation/partner-application";
import type { PartnerScoreFactor, PartnerScoreResult } from "@/types/partner";

export const defaultPartnerScoreConfiguration: PartnerScoreFactor[] = [
  {
    id: "industry-experience",
    label: "Relevant industry experience",
    weight: 1,
    enabled: true,
    maximum: 10,
  },
  {
    id: "geographic-coverage",
    label: "Geographic coverage",
    weight: 1,
    enabled: true,
    maximum: 10,
  },
  {
    id: "technical-capability",
    label: "Technical capability",
    weight: 1.25,
    enabled: true,
    maximum: 10,
  },
  {
    id: "installation-capability",
    label: "Installation capability",
    weight: 1,
    enabled: true,
    maximum: 10,
  },
  {
    id: "project-experience",
    label: "Project experience",
    weight: 1,
    enabled: true,
    maximum: 10,
  },
  {
    id: "product-fit",
    label: "Product-category fit",
    weight: 1,
    enabled: true,
    maximum: 10,
  },
  {
    id: "showroom",
    label: "Showroom capability",
    weight: 0.5,
    enabled: true,
    maximum: 10,
  },
  {
    id: "service",
    label: "Service capability",
    weight: 1,
    enabled: true,
    maximum: 10,
  },
  {
    id: "strategic-sector",
    label: "Strategic-sector alignment",
    weight: 1,
    enabled: true,
    maximum: 10,
  },
  {
    id: "documentation",
    label: "Documentation completeness",
    weight: 0.75,
    enabled: true,
    maximum: 10,
  },
];

const capabilityValue = (value: string) =>
  value === "in-house" ? 10 : value === "outsourced" ? 6 : 0;

export function scorePartnerApplication(
  input: PartnerApplicationInput,
  configuration: PartnerScoreFactor[] = defaultPartnerScoreConfiguration,
): PartnerScoreResult {
  const inHouseTechnical = Object.values(input.technical)
    .filter((value): value is string => typeof value === "string")
    .slice(0, 12)
    .map(capabilityValue);
  const raw: Record<string, number> = {
    "industry-experience": Math.min(
      10,
      input.experience.yearsAv + input.experience.yearsIntegration,
    ),
    "geographic-coverage": Math.min(10, 4 + input.coverage.offices.length * 2),
    "technical-capability": inHouseTechnical.length
      ? inHouseTechnical.reduce<number>((sum, value) => sum + value, 0) /
        inHouseTechnical.length
      : 0,
    "installation-capability": capabilityValue(input.technical.installation),
    "project-experience": Math.min(
      10,
      input.references.projects.length * 3 +
        Math.min(4, input.experience.relevantProjectsAnnual / 5),
    ),
    "product-fit": Math.min(
      10,
      input.partnerInterest.productFamilies.length * 2,
    ),
    showroom:
      input.commercial.showroom || input.commercial.demonstrationFacility
        ? 10
        : 0,
    service:
      input.coverage.serviceCapability &&
      input.coverage.customerSupportCapability
        ? 10
        : 4,
    "strategic-sector": Math.min(
      10,
      input.experience.primaryIndustries.length * 2,
    ),
    documentation: input.references.projects.length > 0 ? 8 : 4,
  };
  const factors = configuration
    .filter((factor) => factor.enabled)
    .map((factor) => ({
      id: factor.id,
      score: Math.min(factor.maximum, (raw[factor.id] ?? 0) * factor.weight),
      maximum: factor.maximum * factor.weight,
    }));
  const riskFlags = [
    ...(input.relationships.potentialConflict
      ? ["potential-brand-conflict"]
      : []),
    ...(input.relationships.territorialCommitments
      ? ["existing-territorial-commitment"]
      : []),
  ];
  return {
    total: Math.round(factors.reduce((sum, factor) => sum + factor.score, 0)),
    maximum: Math.round(
      factors.reduce((sum, factor) => sum + factor.maximum, 0),
    ),
    factors,
    riskFlags,
    note: "This configurable score supports prioritisation only. It must never approve or reject an application without human review.",
  };
}
