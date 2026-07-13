import { z } from "zod";
import { partnerTypes } from "@/types/partner";

const required = (label: string, minimum = 2) =>
  z.string().trim().min(minimum, `Enter ${label}.`).max(500);
const optional = z.string().trim().max(1000);
const selection = (label: string) => z.string().min(1, `Select ${label}.`);
const capability = z.enum(["in-house", "outsourced", "not-available"]);

export const officeLocationSchema = z.object({
  city: required("the office city"),
  country: required("the office country"),
  function: optional,
});

export const projectReferenceSchema = z.object({
  projectName: required("the project name"),
  sector: selection("a sector"),
  location: required("the project location"),
  valueRange: optional,
  scope: required("the supplied scope", 5),
  integratedProducts: optional,
  completionYear: z.string().regex(/^$|^\d{4}$/, "Use a four-digit year."),
  customerReferenceContact: optional,
});

export const partnerApplicationSchema = z
  .object({
    schemaVersion: z.literal(1),
    organisation: z.object({
      legalCompanyName: required("the legal company name"),
      tradingName: optional,
      website: z.union([z.literal(""), z.url("Enter a valid website URL.")]),
      yearEstablished: z.string().regex(/^\d{4}$/, "Use a four-digit year."),
      country: required("the country"),
      stateProvince: optional,
      city: required("the city"),
      registeredOfficeAddress: required("the registered office address", 5),
      employeeRange: selection("an employee range"),
      annualRevenueRange: optional,
      companyRegistrationNumber: optional,
      taxRegistrationNumber: optional,
    }),
    contact: z.object({
      fullName: required("the primary contact name"),
      jobTitle: required("the job title"),
      workEmail: z.email("Enter a valid work email."),
      phone: required("a phone number", 5),
      mobile: optional,
      preferredCommunication: selection("a communication method"),
      linkedIn: z.union([z.literal(""), z.url("Enter a valid LinkedIn URL.")]),
    }),
    partnerInterest: z.object({
      partnerTypes: z
        .array(z.enum(partnerTypes))
        .min(1, "Select at least one partner type."),
      primaryPartnerType: z.enum(partnerTypes, {
        error: "Select the primary partner type.",
      }),
      relevance: required("why this partner type is relevant", 20),
      productFamilies: z
        .array(z.string())
        .min(1, "Select at least one product family."),
    }),
    coverage: z.object({
      countriesServed: required("the countries served"),
      regionsServed: optional,
      citiesServed: optional,
      offices: z.array(officeLocationSchema).max(10),
      warehousingCapability: z.boolean(),
      installationCapability: z.boolean(),
      serviceCapability: z.boolean(),
      customerSupportCapability: z.boolean(),
      fieldSalesCoverage: z.boolean(),
      salesPersonnel: z.number().int().min(0).max(100000),
      technicalPersonnel: z.number().int().min(0).max(100000),
      installationPersonnel: z.number().int().min(0).max(100000),
    }),
    experience: z.object({
      primaryIndustries: z
        .array(z.string())
        .min(1, "Select at least one primary industry."),
      secondaryIndustries: z.array(z.string()),
      yearsAv: z.number().int().min(0).max(150),
      yearsFurniture: z.number().int().min(0).max(150),
      yearsIntegration: z.number().int().min(0).max(150),
      customerTypes: required("the main customer types"),
      projectSizeRange: optional,
      relevantProjectsAnnual: z.number().int().min(0).max(100000),
      productCategories: required("the existing product categories"),
      brandsRepresented: optional,
    }),
    technical: z.object({
      avDesign: capability,
      installation: capability,
      projectManagement: capability,
      cad: capability,
      bim: capability,
      rackIntegration: capability,
      networking: capability,
      controlSystems: capability,
      displayIntegration: capability,
      videoConferencing: capability,
      furnitureInstallation: capability,
      afterSalesSupport: capability,
      manufacturerCertifications: optional,
      industryCertifications: optional,
      consultantRegistrations: optional,
      qualityCertifications: optional,
      safetyCertifications: optional,
    }),
    commercial: z.object({
      salesModel: required("the sales model"),
      directSales: z.boolean(),
      dealerNetwork: z.boolean(),
      distributorNetwork: z.boolean(),
      tenderParticipation: z.boolean(),
      governmentProcurement: z.boolean(),
      ecommerce: z.boolean(),
      showroom: z.boolean(),
      demonstrationFacility: z.boolean(),
      stockholding: z.boolean(),
      creditFinance: z.boolean(),
      importCapability: z.boolean(),
      exportCapability: z.boolean(),
      motivation: required(
        "why the organisation wants to represent TEVORA",
        30,
      ),
      marketOpportunity: required("the market opportunity", 30),
      firstYearPlan: required("the first-year plan", 30),
      supportRequired: required("the support required", 10),
    }),
    relationships: z.object({
      avBrands: optional,
      furnitureBrands: optional,
      displayBrands: optional,
      cameraConferencingBrands: optional,
      controlConnectivityBrands: optional,
      potentialConflict: z.boolean(),
      conflictDetails: optional,
      territorialCommitments: z.boolean(),
      territorialDetails: optional,
      disclosureConfirmed: z
        .boolean()
        .refine(Boolean, "Confirm the brand-relationship declaration."),
    }),
    references: z.object({
      projects: z.array(projectReferenceSchema).max(3),
      experienceSummary: required("a relevant experience summary", 20),
    }),
    expectations: z.object({
      preferredTerritory: required("the preferred territory"),
      preferredIndustries: z.array(z.string()).min(1, "Select an industry."),
      preferredProductFamilies: z
        .array(z.string())
        .min(1, "Select a product family."),
      launchTimeline: selection("a launch timeline"),
      trainingRequired: z.boolean(),
      demonstrationProductsRequired: z.boolean(),
      showroomDisplayPossible: z.boolean(),
      localLanguageMarketingRequired: z.boolean(),
      customProductsCommon: z.boolean(),
      comments: optional,
    }),
    declarations: z.object({
      accurate: z
        .boolean()
        .refine(Boolean, "Confirm the information is accurate."),
      authorised: z
        .boolean()
        .refine(Boolean, "Confirm you are authorised to apply."),
      contactPermission: z
        .boolean()
        .refine(Boolean, "Permission to contact is required."),
      verificationPermission: z
        .boolean()
        .refine(Boolean, "Business verification consent is required."),
      noGuarantee: z
        .boolean()
        .refine(
          Boolean,
          "Confirm that submission does not guarantee approval.",
        ),
      separateAgreement: z
        .boolean()
        .refine(
          Boolean,
          "Confirm commercial terms require a separate agreement.",
        ),
      noPartnershipUntilApproved: z
        .boolean()
        .refine(Boolean, "Confirm no partnership exists before approval."),
      privacyConsent: z
        .boolean()
        .refine(Boolean, "Privacy consent is required."),
      communicationConsent: z
        .boolean()
        .refine(Boolean, "Application communication consent is required."),
      documentProcessingConsent: z
        .boolean()
        .refine(Boolean, "Document processing consent is required."),
      marketingConsent: z.boolean(),
    }),
    website: z.string().max(0, "Unable to submit."),
  })
  .superRefine((value, context) => {
    if (
      !value.partnerInterest.partnerTypes.includes(
        value.partnerInterest.primaryPartnerType,
      )
    )
      context.addIssue({
        code: "custom",
        path: ["partnerInterest", "primaryPartnerType"],
        message: "The primary type must be one of the selected partner types.",
      });
    if (
      value.relationships.potentialConflict &&
      !value.relationships.conflictDetails
    )
      context.addIssue({
        code: "custom",
        path: ["relationships", "conflictDetails"],
        message: "Describe the potential conflict.",
      });
    if (
      value.relationships.territorialCommitments &&
      !value.relationships.territorialDetails
    )
      context.addIssue({
        code: "custom",
        path: ["relationships", "territorialDetails"],
        message: "Describe the territorial commitments.",
      });
  });

export type PartnerApplicationInput = z.infer<typeof partnerApplicationSchema>;

const publicEmailDomains = new Set([
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
]);

export function isPublicEmailDomain(email: string) {
  return publicEmailDomains.has(email.toLowerCase().split("@")[1] ?? "");
}
