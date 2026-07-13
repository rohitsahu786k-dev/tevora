import { describe, expect, it } from "vitest";
import { submitPartnerApplication } from "@/app/partners/apply/actions";
import {
  applicationOutcomeEmail,
  applicantConfirmationEmail,
} from "@/lib/partners/email-templates";
import { partnerApplicationAdapters } from "@/lib/integrations/partner-application";
import {
  defaultPartnerScoreConfiguration,
  scorePartnerApplication,
} from "@/lib/partners/scoring";
import {
  isPublicEmailDomain,
  partnerApplicationSchema,
  type PartnerApplicationInput,
} from "@/lib/validation/partner-application";
import {
  partnerApplicationStatuses,
  publicPartnerStatuses,
} from "@/types/partner";

function validApplication(): PartnerApplicationInput {
  const capability = {
    avDesign: "in-house",
    installation: "in-house",
    projectManagement: "in-house",
    cad: "in-house",
    bim: "outsourced",
    rackIntegration: "in-house",
    networking: "in-house",
    controlSystems: "in-house",
    displayIntegration: "in-house",
    videoConferencing: "in-house",
    furnitureInstallation: "outsourced",
    afterSalesSupport: "in-house",
  } as const;
  return {
    schemaVersion: 1,
    organisation: {
      legalCompanyName: "Example Integration Company",
      tradingName: "Example Integration",
      website: "https://example.com",
      yearEstablished: "2012",
      country: "India",
      stateProvince: "Maharashtra",
      city: "Mumbai",
      registeredOfficeAddress: "Example registered office address",
      employeeRange: "50–249",
      annualRevenueRange: "",
      companyRegistrationNumber: "",
      taxRegistrationNumber: "",
    },
    contact: {
      fullName: "Application Contact",
      jobTitle: "Director",
      workEmail: "contact@example.com",
      phone: "+91 00000 00000",
      mobile: "",
      preferredCommunication: "Email",
      linkedIn: "",
    },
    partnerInterest: {
      partnerTypes: ["av-integration-partner", "authorised-dealer"],
      primaryPartnerType: "av-integration-partner",
      relevance:
        "The organisation designs and delivers integrated AV environments.",
      productFamilies: ["presentation-stations", "display-stands"],
    },
    coverage: {
      countriesServed: "India",
      regionsServed: "West and South",
      citiesServed: "Mumbai, Pune, Bengaluru",
      offices: [{ city: "Mumbai", country: "India", function: "Head office" }],
      warehousingCapability: true,
      installationCapability: true,
      serviceCapability: true,
      customerSupportCapability: true,
      fieldSalesCoverage: true,
      salesPersonnel: 8,
      technicalPersonnel: 12,
      installationPersonnel: 10,
    },
    experience: {
      primaryIndustries: ["higher-education", "corporate"],
      secondaryIndustries: ["government"],
      yearsAv: 12,
      yearsFurniture: 3,
      yearsIntegration: 12,
      customerTypes: "Universities and corporate project teams",
      projectSizeRange: "Mid-sized projects",
      relevantProjectsAnnual: 20,
      productCategories: "Displays, collaboration and technical furniture",
      brandsRepresented: "",
    },
    technical: {
      ...capability,
      manufacturerCertifications: "",
      industryCertifications: "",
      consultantRegistrations: "",
      qualityCertifications: "",
      safetyCertifications: "",
    },
    commercial: {
      salesModel: "Direct consultative sales and project delivery",
      directSales: true,
      dealerNetwork: false,
      distributorNetwork: false,
      tenderParticipation: true,
      governmentProcurement: true,
      ecommerce: false,
      showroom: true,
      demonstrationFacility: true,
      stockholding: false,
      creditFinance: true,
      importCapability: true,
      exportCapability: false,
      motivation:
        "The portfolio complements our integrated AV project capability.",
      marketOpportunity:
        "Education and enterprise teams require coordinated furniture and technology.",
      firstYearPlan:
        "Train the team, identify suitable projects and develop an informed launch plan.",
      supportRequired: "Product training and configuration guidance.",
    },
    relationships: {
      avBrands: "",
      furnitureBrands: "",
      displayBrands: "",
      cameraConferencingBrands: "",
      controlConnectivityBrands: "",
      potentialConflict: false,
      conflictDetails: "",
      territorialCommitments: false,
      territorialDetails: "",
      disclosureConfirmed: true,
    },
    references: {
      projects: [
        {
          projectName: "Representative education project",
          sector: "higher-education",
          location: "Mumbai",
          valueRange: "Mid-sized",
          scope: "AV system design, supply, integration and support",
          integratedProducts: "Display and collaboration technology",
          completionYear: "2025",
          customerReferenceContact: "",
        },
      ],
      experienceSummary:
        "The organisation has relevant education and enterprise delivery experience.",
    },
    expectations: {
      preferredTerritory: "India",
      preferredIndustries: ["higher-education", "corporate"],
      preferredProductFamilies: ["presentation-stations"],
      launchTimeline: "6–12 months",
      trainingRequired: true,
      demonstrationProductsRequired: false,
      showroomDisplayPossible: true,
      localLanguageMarketingRequired: false,
      customProductsCommon: true,
      comments: "",
    },
    declarations: {
      accurate: true,
      authorised: true,
      contactPermission: true,
      verificationPermission: true,
      noGuarantee: true,
      separateAgreement: true,
      noPartnershipUntilApproved: true,
      privacyConsent: true,
      communicationConsent: true,
      documentProcessingConsent: true,
      marketingConsent: false,
    },
    website: "",
  };
}

describe("partner application validation", () => {
  it("accepts a complete multi-type application", () => {
    expect(partnerApplicationSchema.safeParse(validApplication()).success).toBe(
      true,
    );
  });

  it("requires the primary type to be among selected types", () => {
    const input = validApplication();
    input.partnerInterest.primaryPartnerType = "distribution-partner";
    expect(partnerApplicationSchema.safeParse(input).success).toBe(false);
  });

  it("requires details when a brand conflict is disclosed", () => {
    const input = validApplication();
    input.relationships.potentialConflict = true;
    expect(partnerApplicationSchema.safeParse(input).success).toBe(false);
  });

  it("accepts but identifies public email domains for internal review", () => {
    const input = validApplication();
    input.contact.workEmail = "applicant@gmail.com";
    expect(partnerApplicationSchema.safeParse(input).success).toBe(true);
    expect(isPublicEmailDomain(input.contact.workEmail)).toBe(true);
  });
});

describe("partner review architecture", () => {
  it("contains all internal statuses and limits public statuses", () => {
    expect(partnerApplicationStatuses).toHaveLength(13);
    expect(publicPartnerStatuses).not.toContain("commercial-review");
    expect(publicPartnerStatuses).not.toContain("territory-review");
  });

  it("creates a configurable advisory score without an approval decision", () => {
    const result = scorePartnerApplication(validApplication());
    expect(result.total).toBeGreaterThan(0);
    expect(result.total).toBeLessThanOrEqual(result.maximum);
    expect(result.note).toContain("never approve or reject");
    const disabled = defaultPartnerScoreConfiguration.map((factor) => ({
      ...factor,
      enabled: false,
    }));
    expect(scorePartnerApplication(validApplication(), disabled).maximum).toBe(
      0,
    );
  });

  it("marks outcome emails as requiring human approval", () => {
    expect(
      applicationOutcomeEmail(
        "discussion",
        "Applicant",
        "TVP-20260713-ABCDEF12",
      ).requiresHumanApproval,
    ).toBe(true);
    expect(
      applicantConfirmationEmail(validApplication(), {
        applicationId: "id",
        reference: "TVP-20260713-ABCDEF12",
        submittedAt: new Date().toISOString(),
        schemaVersion: 1,
        status: "submitted",
      }).subject,
    ).toContain("Partner Application Received");
  });

  it("fails closed when secure delivery is not configured", async () => {
    const data = new FormData();
    data.set("payload", JSON.stringify(validApplication()));
    const result = await submitPartnerApplication(data);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toContain("not yet configured");
  });

  it("retains a securely stored submission when CRM and email adapters fail", async () => {
    const original = {
      configured: partnerApplicationAdapters.configured,
      database: { ...partnerApplicationAdapters.database },
      files: { ...partnerApplicationAdapters.files },
      consent: { ...partnerApplicationAdapters.consent },
      crm: { ...partnerApplicationAdapters.crm },
      email: { ...partnerApplicationAdapters.email },
    };
    try {
      partnerApplicationAdapters.configured = true;
      partnerApplicationAdapters.database.findDuplicate = async () => null;
      partnerApplicationAdapters.database.create = async () => undefined;
      partnerApplicationAdapters.files.store = async () => undefined;
      partnerApplicationAdapters.consent.record = async () => undefined;
      partnerApplicationAdapters.crm.createPartnerLead = async () => {
        throw new Error("CRM unavailable");
      };
      partnerApplicationAdapters.email.sendApplicantConfirmation = async () => {
        throw new Error("Email unavailable");
      };
      partnerApplicationAdapters.email.sendInternalNotification = async () => {
        throw new Error("Email unavailable");
      };
      const data = new FormData();
      data.set("payload", JSON.stringify(validApplication()));
      const result = await submitPartnerApplication(data);
      expect(result.ok).toBe(true);
    } finally {
      partnerApplicationAdapters.configured = original.configured;
      Object.assign(partnerApplicationAdapters.database, original.database);
      Object.assign(partnerApplicationAdapters.files, original.files);
      Object.assign(partnerApplicationAdapters.consent, original.consent);
      Object.assign(partnerApplicationAdapters.crm, original.crm);
      Object.assign(partnerApplicationAdapters.email, original.email);
    }
  });
});
