"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Plus,
  Printer,
  Save,
  Trash2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useFieldArray,
  useForm,
  useWatch,
  type FieldPath,
} from "react-hook-form";
import { submitPartnerApplication } from "@/app/partners/apply/actions";
import {
  Checkbox,
  SelectControl,
  TextArea,
  TextField,
} from "@/components/forms/controls";
import { OnespaceMotionProvider } from "@/components/motion";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { productFamilies, sectors } from "@/content";
import { partnerTypeContent } from "@/content/partners";
import { partnerAnalytics } from "@/lib/analytics/partners";
import { motionTokens } from "@/lib/motion/tokens";
import { routes } from "@/lib/routes";
import {
  partnerApplicationSchema,
  type PartnerApplicationInput,
} from "@/lib/validation/partner-application";
import { cn } from "@/lib/utils";
import type { PartnerType } from "@/types/partner";

const STORAGE_KEY = "onespace-partner-application-limited-v1";
const stepDefinitions = [
  { title: "Organisation", short: "Company profile", field: "organisation" },
  { title: "Primary Contact", short: "Application contact", field: "contact" },
  {
    title: "Partner Type",
    short: "Programme interest",
    field: "partnerInterest",
  },
  { title: "Business Coverage", short: "Markets and teams", field: "coverage" },
  {
    title: "Market Experience",
    short: "Sectors and projects",
    field: "experience",
  },
  {
    title: "Technical Capability",
    short: "Delivery resources",
    field: "technical",
  },
  {
    title: "Commercial Capability",
    short: "Route to market",
    field: "commercial",
  },
  {
    title: "Brand Relationships",
    short: "Conflicts and commitments",
    field: "relationships",
  },
  { title: "References", short: "Projects and documents", field: "references" },
  {
    title: "Expectations",
    short: "Territory and launch",
    field: "expectations",
  },
  {
    title: "Declarations",
    short: "Consent and authority",
    field: "declarations",
  },
  { title: "Review & Submit", short: "Final confirmation", field: null },
] as const;

const capabilityFields = [
  ["avDesign", "AV system design"],
  ["installation", "Installation"],
  ["projectManagement", "Project management"],
  ["cad", "CAD"],
  ["bim", "BIM"],
  ["rackIntegration", "Rack integration"],
  ["networking", "Networking"],
  ["controlSystems", "Control systems"],
  ["displayIntegration", "Display integration"],
  ["videoConferencing", "Video conferencing"],
  ["furnitureInstallation", "Furniture installation"],
  ["afterSalesSupport", "After-sales support"],
] as const;

const commercialCapabilities = [
  ["directSales", "Direct sales"],
  ["dealerNetwork", "Dealer network"],
  ["distributorNetwork", "Distributor network"],
  ["tenderParticipation", "Tender participation"],
  ["governmentProcurement", "Government procurement capability"],
  ["ecommerce", "Ecommerce capability"],
  ["showroom", "Showroom availability"],
  ["demonstrationFacility", "Demonstration facility"],
  ["stockholding", "Stockholding capability"],
  ["creditFinance", "Credit and finance capability"],
  ["importCapability", "Import capability"],
  ["exportCapability", "Export capability"],
] as const;

const declarationFields = [
  ["accurate", "The information provided is accurate."],
  ["authorised", "I am authorised to apply for this organisation."],
  [
    "contactPermission",
    "ONESPACE may contact the organisation about this application.",
  ],
  [
    "verificationPermission",
    "ONESPACE may conduct reasonable business verification.",
  ],
  ["noGuarantee", "I understand submission does not guarantee approval."],
  [
    "separateAgreement",
    "Commercial terms require a separate written agreement.",
  ],
  [
    "noPartnershipUntilApproved",
    "No partnership exists until formally approved and documented.",
  ],
  [
    "privacyConsent",
    "I consent to processing under the applicable privacy policy.",
  ],
  ["communicationConsent", "I consent to application-related communications."],
  [
    "documentProcessingConsent",
    "I consent to secure processing of submitted documents.",
  ],
] as const;

const defaults: PartnerApplicationInput = {
  schemaVersion: 1,
  organisation: {
    legalCompanyName: "",
    tradingName: "",
    website: "",
    yearEstablished: "",
    country: "",
    stateProvince: "",
    city: "",
    registeredOfficeAddress: "",
    employeeRange: "",
    annualRevenueRange: "",
    companyRegistrationNumber: "",
    taxRegistrationNumber: "",
  },
  contact: {
    fullName: "",
    jobTitle: "",
    workEmail: "",
    phone: "",
    mobile: "",
    preferredCommunication: "",
    linkedIn: "",
  },
  partnerInterest: {
    partnerTypes: [],
    primaryPartnerType: "authorised-dealer",
    relevance: "",
    productFamilies: [],
  },
  coverage: {
    countriesServed: "",
    regionsServed: "",
    citiesServed: "",
    offices: [],
    warehousingCapability: false,
    installationCapability: false,
    serviceCapability: false,
    customerSupportCapability: false,
    fieldSalesCoverage: false,
    salesPersonnel: 0,
    technicalPersonnel: 0,
    installationPersonnel: 0,
  },
  experience: {
    primaryIndustries: [],
    secondaryIndustries: [],
    yearsAv: 0,
    yearsFurniture: 0,
    yearsIntegration: 0,
    customerTypes: "",
    projectSizeRange: "",
    relevantProjectsAnnual: 0,
    productCategories: "",
    brandsRepresented: "",
  },
  technical: {
    avDesign: "not-available",
    installation: "not-available",
    projectManagement: "not-available",
    cad: "not-available",
    bim: "not-available",
    rackIntegration: "not-available",
    networking: "not-available",
    controlSystems: "not-available",
    displayIntegration: "not-available",
    videoConferencing: "not-available",
    furnitureInstallation: "not-available",
    afterSalesSupport: "not-available",
    manufacturerCertifications: "",
    industryCertifications: "",
    consultantRegistrations: "",
    qualityCertifications: "",
    safetyCertifications: "",
  },
  commercial: {
    salesModel: "",
    directSales: false,
    dealerNetwork: false,
    distributorNetwork: false,
    tenderParticipation: false,
    governmentProcurement: false,
    ecommerce: false,
    showroom: false,
    demonstrationFacility: false,
    stockholding: false,
    creditFinance: false,
    importCapability: false,
    exportCapability: false,
    motivation: "",
    marketOpportunity: "",
    firstYearPlan: "",
    supportRequired: "",
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
    disclosureConfirmed: false,
  },
  references: { projects: [], experienceSummary: "" },
  expectations: {
    preferredTerritory: "",
    preferredIndustries: [],
    preferredProductFamilies: [],
    launchTimeline: "",
    trainingRequired: false,
    demonstrationProductsRequired: false,
    showroomDisplayPossible: false,
    localLanguageMarketingRequired: false,
    customProductsCommon: false,
    comments: "",
  },
  declarations: {
    accurate: false,
    authorised: false,
    contactPermission: false,
    verificationPermission: false,
    noGuarantee: false,
    separateAgreement: false,
    noPartnershipUntilApproved: false,
    privacyConsent: false,
    communicationConsent: false,
    documentProcessingConsent: false,
    marketingConsent: false,
  },
  website: "",
};

type LimitedDraft = Pick<PartnerApplicationInput, "schemaVersion"> & {
  step: number;
  partnerInterest?: Pick<
    PartnerApplicationInput["partnerInterest"],
    "partnerTypes" | "primaryPartnerType" | "productFamilies"
  >;
  experience?: Pick<
    PartnerApplicationInput["experience"],
    "primaryIndustries" | "secondaryIndustries"
  >;
  technical?: PartnerApplicationInput["technical"];
  expectations?: Pick<
    PartnerApplicationInput["expectations"],
    | "preferredIndustries"
    | "preferredProductFamilies"
    | "trainingRequired"
    | "demonstrationProductsRequired"
    | "showroomDisplayPossible"
    | "localLanguageMarketingRequired"
    | "customProductsCommon"
  >;
};

export function PartnerApplicationForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>(
    {},
  );
  const form = useForm<PartnerApplicationInput>({
    resolver: zodResolver(partnerApplicationSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });
  const {
    register,
    control,
    trigger,
    getValues,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = form;
  const offices = useFieldArray({ control, name: "coverage.offices" });
  const projects = useFieldArray({ control, name: "references.projects" });
  const selectedTypes =
    useWatch({ control, name: "partnerInterest.partnerTypes" }) ?? [];
  const hasConflict = useWatch({
    control,
    name: "relationships.potentialConflict",
  });
  const hasTerritoryCommitments = useWatch({
    control,
    name: "relationships.territorialCommitments",
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const draft = JSON.parse(raw) as LimitedDraft;
          if (draft.schemaVersion === 1) {
            reset({
              ...defaults,
              partnerInterest: {
                ...defaults.partnerInterest,
                ...draft.partnerInterest,
              },
              experience: { ...defaults.experience, ...draft.experience },
              technical: { ...defaults.technical, ...draft.technical },
              expectations: {
                ...defaults.expectations,
                ...draft.expectations,
              },
            });
            setStep(Math.min(draft.step, stepDefinitions.length - 1));
            setStatus(
              "A limited, non-sensitive draft was restored on this device.",
            );
            void partnerAnalytics.track("partner_application_resumed", {
              applicationState: "resumed",
            });
          }
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
      const requested = search.get("type") as PartnerType | null;
      if (
        requested &&
        partnerTypeContent.some((type) => type.id === requested)
      ) {
        setValue("partnerInterest.partnerTypes", [requested]);
        setValue("partnerInterest.primaryPartnerType", requested);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [reset, search, setValue]);

  function focusErrorSummary() {
    document.getElementById("partner-application-status")?.focus();
  }

  function saveLimitedDraft() {
    const value = getValues();
    const draft: LimitedDraft = {
      schemaVersion: 1,
      step,
      partnerInterest: {
        partnerTypes: value.partnerInterest.partnerTypes,
        primaryPartnerType: value.partnerInterest.primaryPartnerType,
        productFamilies: value.partnerInterest.productFamilies,
      },
      experience: {
        primaryIndustries: value.experience.primaryIndustries,
        secondaryIndustries: value.experience.secondaryIndustries,
      },
      technical: value.technical,
      expectations: {
        preferredIndustries: value.expectations.preferredIndustries,
        preferredProductFamilies: value.expectations.preferredProductFamilies,
        trainingRequired: value.expectations.trainingRequired,
        demonstrationProductsRequired:
          value.expectations.demonstrationProductsRequired,
        showroomDisplayPossible: value.expectations.showroomDisplayPossible,
        localLanguageMarketingRequired:
          value.expectations.localLanguageMarketingRequired,
        customProductsCommon: value.expectations.customProductsCommon,
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setStatus(
      "Limited draft saved on this device. Contact, registration, revenue, relationship, reference and document data was not stored.",
    );
    void partnerAnalytics.track("partner_application_saved", {
      step: step + 1,
    });
  }

  async function next() {
    const definition = stepDefinitions[step];
    if (
      definition.field &&
      !(await trigger(definition.field, { shouldFocus: true }))
    ) {
      setStatus("Review the highlighted fields before continuing.");
      requestAnimationFrame(focusErrorSummary);
      return;
    }
    await partnerAnalytics.track("partner_step_completed", { step: step + 1 });
    setStep((current) => Math.min(current + 1, stepDefinitions.length - 1));
    window.scrollTo({
      top: 0,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  const submit = form.handleSubmit(async (input) => {
    setStatus("Submitting the application securely…");
    setServerErrors({});
    const data = new FormData();
    data.set("payload", JSON.stringify(input));
    files.forEach((file) => data.append("files", file));
    const result = await submitPartnerApplication(data);
    if (!result.ok) {
      setStatus(result.message);
      setServerErrors(result.errors ?? {});
      requestAnimationFrame(focusErrorSummary);
      return;
    }
    localStorage.removeItem(STORAGE_KEY);
    router.push(
      `${routes.partnerApplicationSuccess}?reference=${encodeURIComponent(result.reference)}` as never,
    );
  });

  return (
    <OnespaceMotionProvider>
      <form onSubmit={submit} noValidate>
        <div className="lg:grid lg:grid-cols-[15rem_1fr] lg:gap-12">
          <nav
            aria-label="Partner application progress"
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <p className="type-model text-accent">
              Step {step + 1} of {stepDefinitions.length}
            </p>
            <div className="bg-line mt-3 h-1" aria-hidden>
              <motion.div
                className="bg-accent h-full origin-left"
                animate={{ scaleX: (step + 1) / stepDefinitions.length }}
                transition={{ duration: motionTokens.duration.component }}
              />
            </div>
            <ol className="border-line mt-6 hidden border-t lg:block">
              {stepDefinitions.map((item, index) => (
                <li key={item.title} className="border-line border-b">
                  <button
                    type="button"
                    onClick={() => index < step && setStep(index)}
                    disabled={index > step}
                    aria-current={index === step ? "step" : undefined}
                    className={cn(
                      "min-h-14 w-full py-3 text-left text-xs",
                      index === step && "text-accent",
                      index > step && "opacity-45",
                    )}
                  >
                    <span className="mr-3 font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div>
            <div className="border-line border-t pt-5">
              <p className="type-eyebrow text-accent">
                {stepDefinitions[step].short}
              </p>
              <h2 className="type-h2 mt-4">{stepDefinitions[step].title}</h2>
            </div>
            <AnimatePresence>
              {(Object.keys(errors).length > 0 ||
                Object.keys(serverErrors).length > 0 ||
                status) && (
                <motion.div
                  id="partner-application-status"
                  tabIndex={-1}
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 1, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-accent bg-accent-light mt-6 border-l-2 p-4 text-sm outline-none"
                >
                  {status || "Review the highlighted fields."}
                  {Object.keys(serverErrors).length > 0 && (
                    <ul className="mt-2 list-disc pl-5">
                      {Object.entries(serverErrors)
                        .slice(0, 8)
                        .map(([field, messages]) => (
                          <li key={field}>{messages[0]}</li>
                        ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-9 min-h-[38rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 1, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{
                    duration: motionTokens.duration.component,
                    ease: motionTokens.easing.enter,
                  }}
                >
                  {step === 0 && (
                    <OrganisationStep
                      register={register}
                      errors={errors.organisation}
                    />
                  )}
                  {step === 1 && (
                    <ContactStep register={register} errors={errors.contact} />
                  )}
                  {step === 2 && (
                    <PartnerTypeStep
                      register={register}
                      selectedTypes={selectedTypes}
                      errors={errors.partnerInterest}
                    />
                  )}
                  {step === 3 && (
                    <CoverageStep
                      register={register}
                      fields={offices.fields}
                      append={offices.append}
                      remove={offices.remove}
                      errors={errors.coverage}
                    />
                  )}
                  {step === 4 && (
                    <ExperienceStep
                      register={register}
                      errors={errors.experience}
                    />
                  )}
                  {step === 5 && (
                    <TechnicalStep
                      register={register}
                      errors={errors.technical}
                    />
                  )}
                  {step === 6 && (
                    <CommercialStep
                      register={register}
                      errors={errors.commercial}
                    />
                  )}
                  {step === 7 && (
                    <RelationshipsStep
                      register={register}
                      errors={errors.relationships}
                      hasConflict={hasConflict}
                      hasTerritoryCommitments={hasTerritoryCommitments}
                    />
                  )}
                  {step === 8 && (
                    <ReferencesStep
                      register={register}
                      fields={projects.fields}
                      append={projects.append}
                      remove={projects.remove}
                      files={files}
                      setFiles={setFiles}
                      errors={errors.references}
                    />
                  )}
                  {step === 9 && (
                    <ExpectationsStep
                      register={register}
                      errors={errors.expectations}
                    />
                  )}
                  {step === 10 && (
                    <DeclarationsStep
                      register={register}
                      errors={errors.declarations}
                    />
                  )}
                  {step === 11 && (
                    <ReviewStep
                      value={getValues()}
                      fileCount={files.length}
                      edit={setStep}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="border-line mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
              <div className="flex gap-3">
                {step > 0 && (
                  <SecondaryButton
                    type="button"
                    onClick={() => setStep((current) => current - 1)}
                  >
                    <ArrowLeft aria-hidden className="size-4" /> Previous
                  </SecondaryButton>
                )}
                <SecondaryButton type="button" onClick={saveLimitedDraft}>
                  <Save aria-hidden className="size-4" /> Save limited draft
                </SecondaryButton>
              </div>
              {step < stepDefinitions.length - 1 ? (
                <PrimaryButton type="button" onClick={next}>
                  Save and continue{" "}
                  <ArrowRight aria-hidden className="size-4" />
                </PrimaryButton>
              ) : (
                <PrimaryButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting…" : "Submit application"}
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>
        <input
          {...register("website")}
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden="true"
        />
      </form>
    </OnespaceMotionProvider>
  );
}

type Register = ReturnType<typeof useForm<PartnerApplicationInput>>["register"];
type Errors = ReturnType<
  typeof useForm<PartnerApplicationInput>
>["formState"]["errors"];
const fieldError = (error: unknown) =>
  typeof error === "object" && error && "message" in error
    ? String((error as { message?: string }).message ?? "")
    : undefined;

function OrganisationStep({
  register,
  errors,
}: {
  register: Register;
  errors?: Errors["organisation"];
}) {
  return (
    <fieldset>
      <legend className="sr-only">Organisation information</legend>
      <p className="type-body-sm text-ink-muted">
        Sensitive commercial identifiers are optional at application stage.
      </p>
      <div className="mt-7 grid gap-7 sm:grid-cols-2">
        <TextField
          label="Legal company name"
          error={fieldError(errors?.legalCompanyName)}
          {...register("organisation.legalCompanyName")}
        />
        <TextField
          label="Trading name"
          {...register("organisation.tradingName")}
        />
        <TextField
          label="Website"
          type="url"
          error={fieldError(errors?.website)}
          {...register("organisation.website")}
        />
        <TextField
          label="Year established"
          inputMode="numeric"
          error={fieldError(errors?.yearEstablished)}
          {...register("organisation.yearEstablished")}
        />
        <TextField
          label="Country"
          autoComplete="country-name"
          error={fieldError(errors?.country)}
          {...register("organisation.country")}
        />
        <TextField
          label="State or province"
          {...register("organisation.stateProvince")}
        />
        <TextField
          label="City"
          error={fieldError(errors?.city)}
          {...register("organisation.city")}
        />
        <TextField
          label="Registered office address"
          error={fieldError(errors?.registeredOfficeAddress)}
          {...register("organisation.registeredOfficeAddress")}
        />
        <SelectControl
          label="Number of employees"
          error={fieldError(errors?.employeeRange)}
          {...register("organisation.employeeRange")}
        >
          <option value="">Select range</option>
          {["1–9", "10–49", "50–249", "250–999", "1,000+"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </SelectControl>
        <SelectControl
          label="Annual revenue range (optional)"
          {...register("organisation.annualRevenueRange")}
        >
          <option value="">Prefer not to provide</option>
          {["Under 1m", "1m–5m", "5m–25m", "25m–100m", "100m+"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </SelectControl>
        <TextField
          label="Company-registration number (optional)"
          {...register("organisation.companyRegistrationNumber")}
        />
        <TextField
          label="Tax-registration number (optional)"
          {...register("organisation.taxRegistrationNumber")}
        />
      </div>
    </fieldset>
  );
}

function ContactStep({
  register,
  errors,
}: {
  register: Register;
  errors?: Errors["contact"];
}) {
  return (
    <fieldset>
      <legend className="sr-only">Primary contact</legend>
      <p className="type-body-sm text-ink-muted">
        Use the person authorised to discuss this application. Public email
        domains are accepted but may be flagged for human verification.
      </p>
      <div className="mt-7 grid gap-7 sm:grid-cols-2">
        <TextField
          label="Full name"
          autoComplete="name"
          error={fieldError(errors?.fullName)}
          {...register("contact.fullName")}
        />
        <TextField
          label="Job title"
          error={fieldError(errors?.jobTitle)}
          {...register("contact.jobTitle")}
        />
        <TextField
          label="Work email"
          type="email"
          autoComplete="email"
          error={fieldError(errors?.workEmail)}
          {...register("contact.workEmail")}
        />
        <TextField
          label="Phone number"
          type="tel"
          autoComplete="tel"
          error={fieldError(errors?.phone)}
          {...register("contact.phone")}
        />
        <TextField
          label="Mobile number (optional)"
          type="tel"
          {...register("contact.mobile")}
        />
        <SelectControl
          label="Preferred communication method"
          error={fieldError(errors?.preferredCommunication)}
          {...register("contact.preferredCommunication")}
        >
          <option value="">Select method</option>
          <option>Email</option>
          <option>Phone</option>
          <option>Video call</option>
        </SelectControl>
        <TextField
          label="LinkedIn profile (optional)"
          type="url"
          error={fieldError(errors?.linkedIn)}
          {...register("contact.linkedIn")}
        />
      </div>
    </fieldset>
  );
}

function PartnerTypeStep({
  register,
  selectedTypes,
  errors,
}: {
  register: Register;
  selectedTypes: PartnerType[];
  errors?: Errors["partnerInterest"];
}) {
  return (
    <fieldset>
      <legend className="sr-only">Partner type</legend>
      <div className="bg-line border-line grid gap-px border sm:grid-cols-2">
        {partnerTypeContent.map((type) => (
          <div
            key={type.id}
            className="bg-surface hover:bg-accent-light min-h-36 p-5"
          >
            <Checkbox
              value={type.id}
              label={type.name}
              {...register("partnerInterest.partnerTypes")}
            />
            <p className="type-caption text-ink-muted mt-3">
              {type.description}
            </p>
          </div>
        ))}
      </div>
      {fieldError(errors?.partnerTypes) && (
        <p className="text-error mt-2 text-sm">
          {fieldError(errors?.partnerTypes)}
        </p>
      )}
      <div className="mt-8 grid gap-7">
        <SelectControl
          label="Primary partner type"
          error={fieldError(errors?.primaryPartnerType)}
          {...register("partnerInterest.primaryPartnerType")}
        >
          <option value="">Select primary type</option>
          {partnerTypeContent
            .filter((type) => selectedTypes.includes(type.id))
            .map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
        </SelectControl>
        <TextArea
          label="Why is this partner type relevant to the organisation?"
          error={fieldError(errors?.relevance)}
          {...register("partnerInterest.relevance")}
        />
        <CheckboxGrid
          legend="Product families of greatest interest"
          items={productFamilies.map((f) => ({ value: f.id, label: f.name }))}
          register={register("partnerInterest.productFamilies")}
          error={fieldError(errors?.productFamilies)}
        />
      </div>
    </fieldset>
  );
}

function CoverageStep({
  register,
  fields,
  append,
  remove,
  errors,
}: {
  register: Register;
  fields: Array<{ id: string }>;
  append: (value: { city: string; country: string; function: string }) => void;
  remove: (index: number) => void;
  errors?: Errors["coverage"];
}) {
  return (
    <fieldset>
      <legend className="sr-only">Business coverage</legend>
      <div className="grid gap-7 sm:grid-cols-2">
        <TextField
          label="Countries served"
          error={fieldError(errors?.countriesServed)}
          {...register("coverage.countriesServed")}
        />
        <TextField
          label="States or regions served"
          {...register("coverage.regionsServed")}
        />
        <TextField
          label="Cities served"
          {...register("coverage.citiesServed")}
        />
        <TextField
          label="Number of sales personnel"
          type="number"
          min="0"
          {...register("coverage.salesPersonnel", { valueAsNumber: true })}
        />
        <TextField
          label="Number of technical personnel"
          type="number"
          min="0"
          {...register("coverage.technicalPersonnel", { valueAsNumber: true })}
        />
        <TextField
          label="Number of installation personnel"
          type="number"
          min="0"
          {...register("coverage.installationPersonnel", {
            valueAsNumber: true,
          })}
        />
      </div>
      <CheckboxGrid
        legend="Operational coverage"
        items={[
          ["warehousingCapability", "Warehousing capability"],
          ["installationCapability", "Installation capability"],
          ["serviceCapability", "Service capability"],
          ["customerSupportCapability", "Customer-support capability"],
          ["fieldSalesCoverage", "Field-sales coverage"],
        ].map(([value, label]) => ({ value, label }))}
        pathPrefix="coverage"
        register={register}
      />
      <div className="mt-9">
        <div className="flex items-center justify-between">
          <h3 className="type-h4">Office locations</h3>
          <SecondaryButton
            type="button"
            onClick={() => append({ city: "", country: "", function: "" })}
          >
            <Plus aria-hidden className="size-4" /> Add office
          </SecondaryButton>
        </div>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border-line mt-4 grid gap-4 border p-5 sm:grid-cols-[1fr_1fr_1fr_auto]"
          >
            <TextField
              label="City"
              {...register(`coverage.offices.${index}.city`)}
            />
            <TextField
              label="Country"
              {...register(`coverage.offices.${index}.country`)}
            />
            <TextField
              label="Office function"
              {...register(`coverage.offices.${index}.function`)}
            />
            <button
              type="button"
              aria-label={`Remove office ${index + 1}`}
              onClick={() => remove(index)}
              className="min-h-12 px-3"
            >
              <Trash2 aria-hidden className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function ExperienceStep({
  register,
  errors,
}: {
  register: Register;
  errors?: Errors["experience"];
}) {
  const sectorItems = sectors.map((s) => ({ value: s.id, label: s.name }));
  return (
    <fieldset>
      <legend className="sr-only">Market experience</legend>
      <CheckboxGrid
        legend="Primary industries served"
        items={sectorItems}
        register={register("experience.primaryIndustries")}
        error={fieldError(errors?.primaryIndustries)}
      />
      <CheckboxGrid
        legend="Secondary industries served"
        items={sectorItems}
        register={register("experience.secondaryIndustries")}
      />
      <div className="mt-8 grid gap-7 sm:grid-cols-3">
        <TextField
          label="Years in AV"
          type="number"
          min="0"
          {...register("experience.yearsAv", { valueAsNumber: true })}
        />
        <TextField
          label="Years in furniture or interiors"
          type="number"
          min="0"
          {...register("experience.yearsFurniture", { valueAsNumber: true })}
        />
        <TextField
          label="Years in technology integration"
          type="number"
          min="0"
          {...register("experience.yearsIntegration", { valueAsNumber: true })}
        />
      </div>
      <div className="mt-7 grid gap-7 sm:grid-cols-2">
        <TextField
          label="Main customer types"
          error={fieldError(errors?.customerTypes)}
          {...register("experience.customerTypes")}
        />
        <SelectControl
          label="Typical project size range"
          {...register("experience.projectSizeRange")}
        >
          <option value="">Select range</option>
          <option>Small projects</option>
          <option>Mid-sized projects</option>
          <option>Large projects</option>
          <option>Mixed programme</option>
        </SelectControl>
        <TextField
          label="Annual number of relevant projects"
          type="number"
          min="0"
          {...register("experience.relevantProjectsAnnual", {
            valueAsNumber: true,
          })}
        />
        <TextField
          label="Existing product categories sold"
          error={fieldError(errors?.productCategories)}
          {...register("experience.productCategories")}
        />
        <TextArea
          label="Existing brands represented"
          className="sm:col-span-2"
          {...register("experience.brandsRepresented")}
        />
      </div>
    </fieldset>
  );
}

function TechnicalStep({
  register,
  errors,
}: {
  register: Register;
  errors?: Errors["technical"];
}) {
  return (
    <fieldset>
      <legend className="sr-only">Technical capability</legend>
      <div className="grid gap-5 sm:grid-cols-2">
        {capabilityFields.map(([field, label]) => (
          <SelectControl
            key={field}
            label={label}
            {...register(`technical.${field}`)}
          >
            <option value="in-house">In-house</option>
            <option value="outsourced">Outsourced</option>
            <option value="not-available">Not currently available</option>
          </SelectControl>
        ))}
      </div>
      <p className="type-body-sm text-ink-muted mt-10">
        Certifications are optional and are not represented as mandatory
        programme requirements.
      </p>
      <div className="mt-6 grid gap-7 sm:grid-cols-2">
        <TextArea
          label="Manufacturer certifications (optional)"
          {...register("technical.manufacturerCertifications")}
        />
        <TextArea
          label="Industry certifications (optional)"
          {...register("technical.industryCertifications")}
        />
        <TextArea
          label="Consultant registrations (optional)"
          {...register("technical.consultantRegistrations")}
        />
        <TextArea
          label="Quality certifications (optional)"
          {...register("technical.qualityCertifications")}
        />
        <TextArea
          label="Safety certifications (optional)"
          {...register("technical.safetyCertifications")}
        />
      </div>
      {errors && (
        <span className="sr-only">
          Technical section contains validation feedback.
        </span>
      )}
    </fieldset>
  );
}

function CommercialStep({
  register,
  errors,
}: {
  register: Register;
  errors?: Errors["commercial"];
}) {
  return (
    <fieldset>
      <legend className="sr-only">Commercial capability</legend>
      <TextArea
        label="Sales model"
        error={fieldError(errors?.salesModel)}
        {...register("commercial.salesModel")}
      />
      <CheckboxGrid
        legend="Route-to-market capabilities"
        items={commercialCapabilities.map(([value, label]) => ({
          value,
          label,
        }))}
        pathPrefix="commercial"
        register={register}
      />
      <div className="mt-8 grid gap-7">
        <TextArea
          label="Why does the organisation want to represent ONESPACE?"
          error={fieldError(errors?.motivation)}
          {...register("commercial.motivation")}
        />
        <TextArea
          label="What market opportunity does it see?"
          error={fieldError(errors?.marketOpportunity)}
          {...register("commercial.marketOpportunity")}
        />
        <TextArea
          label="What would its first-year plan look like?"
          error={fieldError(errors?.firstYearPlan)}
          {...register("commercial.firstYearPlan")}
        />
        <TextArea
          label="What support would it require from ONESPACE?"
          error={fieldError(errors?.supportRequired)}
          {...register("commercial.supportRequired")}
        />
      </div>
    </fieldset>
  );
}

function RelationshipsStep({
  register,
  errors,
  hasConflict,
  hasTerritoryCommitments,
}: {
  register: Register;
  errors?: Errors["relationships"];
  hasConflict: boolean;
  hasTerritoryCommitments: boolean;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Existing brand relationships</legend>
      <div className="grid gap-7 sm:grid-cols-2">
        <TextArea
          label="AV brands represented"
          {...register("relationships.avBrands")}
        />
        <TextArea
          label="Furniture brands represented"
          {...register("relationships.furnitureBrands")}
        />
        <TextArea
          label="Display brands represented"
          {...register("relationships.displayBrands")}
        />
        <TextArea
          label="Camera and conferencing brands represented"
          {...register("relationships.cameraConferencingBrands")}
        />
        <TextArea
          label="Control and connectivity brands represented"
          {...register("relationships.controlConnectivityBrands")}
        />
      </div>
      <div className="mt-8 space-y-4">
        <Checkbox
          label="A relationship may create a potential conflict"
          {...register("relationships.potentialConflict")}
        />
        {hasConflict && (
          <TextArea
            label="Potential conflict details"
            error={fieldError(errors?.conflictDetails)}
            {...register("relationships.conflictDetails")}
          />
        )}
        <Checkbox
          label="The organisation has territorial commitments with another brand"
          {...register("relationships.territorialCommitments")}
        />
        {hasTerritoryCommitments && (
          <TextArea
            label="Territorial commitment details"
            error={fieldError(errors?.territorialDetails)}
            {...register("relationships.territorialDetails")}
          />
        )}
        <div className="border-accent bg-accent-light border-l-2 p-5">
          <Checkbox
            label="The applicant is responsible for disclosing any current agreements that may affect its ability to represent ONESPACE."
            {...register("relationships.disclosureConfirmed")}
          />
        </div>
      </div>
    </fieldset>
  );
}

function ReferencesStep({
  register,
  fields,
  append,
  remove,
  files,
  setFiles,
  errors,
}: {
  register: Register;
  fields: Array<{ id: string }>;
  append: (value: {
    projectName: string;
    sector: string;
    location: string;
    valueRange: string;
    scope: string;
    integratedProducts: string;
    completionYear: string;
    customerReferenceContact: string;
  }) => void;
  remove: (index: number) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  errors?: Errors["references"];
}) {
  return (
    <fieldset>
      <legend className="sr-only">References and experience</legend>
      <TextArea
        label="Relevant experience summary"
        error={fieldError(errors?.experienceSummary)}
        {...register("references.experienceSummary")}
      />
      <div className="mt-9 flex items-center justify-between">
        <h3 className="type-h4">Project references — up to three</h3>
        <SecondaryButton
          type="button"
          disabled={fields.length >= 3}
          onClick={() =>
            append({
              projectName: "",
              sector: "",
              location: "",
              valueRange: "",
              scope: "",
              integratedProducts: "",
              completionYear: "",
              customerReferenceContact: "",
            })
          }
        >
          <Plus aria-hidden className="size-4" /> Add reference
        </SecondaryButton>
      </div>
      {fields.map((field, index) => (
        <fieldset key={field.id} className="border-line mt-5 border p-5">
          <legend className="type-model text-accent px-2">
            Project {index + 1}
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Project name"
              {...register(`references.projects.${index}.projectName`)}
            />
            <SelectControl
              label="Sector"
              {...register(`references.projects.${index}.sector`)}
            >
              <option value="">Select sector</option>
              {sectors.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </SelectControl>
            <TextField
              label="Location"
              {...register(`references.projects.${index}.location`)}
            />
            <SelectControl
              label="Approximate value range"
              {...register(`references.projects.${index}.valueRange`)}
            >
              <option value="">Prefer not to provide</option>
              <option>Small</option>
              <option>Mid-sized</option>
              <option>Large</option>
            </SelectControl>
            <TextArea
              label="Scope supplied"
              {...register(`references.projects.${index}.scope`)}
            />
            <TextArea
              label="Products or technology integrated"
              {...register(`references.projects.${index}.integratedProducts`)}
            />
            <TextField
              label="Completion year"
              {...register(`references.projects.${index}.completionYear`)}
            />
            <TextField
              label="Customer-reference contact (optional)"
              {...register(
                `references.projects.${index}.customerReferenceContact`,
              )}
            />
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm"
          >
            <Trash2 aria-hidden className="size-4" /> Remove reference
          </button>
        </fieldset>
      ))}
      <div className="border-line mt-10 border p-6">
        <label className="block">
          <span className="type-spec-label">Supporting documents</span>
          <span className="type-caption text-ink-muted mt-2 block">
            Company profile, portfolio, catalogue, certifications, registration
            documents, organisation chart or case studies. PDF, DOCX, PPTX, JPG
            or PNG; maximum 12 files, 15 MB each.
          </span>
          <input
            type="file"
            multiple
            accept=".pdf,.docx,.pptx,.jpg,.jpeg,.png"
            onChange={(event) => {
              const next = Array.from(event.target.files ?? []);
              setFiles(next);
              void partnerAnalytics.track("partner_file_uploaded", {
                fileCount: next.length,
              });
            }}
            className="mt-5 block min-h-12 w-full text-sm"
          />
        </label>
        {files.length > 0 && (
          <p className="mt-3 text-sm">
            <FileText aria-hidden className="mr-2 inline size-4" />
            {files.length} document{files.length === 1 ? "" : "s"} selected.
            Documents are held in memory only until submission.
          </p>
        )}
      </div>
    </fieldset>
  );
}

function ExpectationsStep({
  register,
  errors,
}: {
  register: Register;
  errors?: Errors["expectations"];
}) {
  return (
    <fieldset>
      <legend className="sr-only">Programme expectations</legend>
      <div className="grid gap-7 sm:grid-cols-2">
        <TextField
          label="Preferred territory"
          error={fieldError(errors?.preferredTerritory)}
          {...register("expectations.preferredTerritory")}
        />
        <SelectControl
          label="Expected launch timeline"
          error={fieldError(errors?.launchTimeline)}
          {...register("expectations.launchTimeline")}
        >
          <option value="">Select timeline</option>
          <option>Within 3 months</option>
          <option>3–6 months</option>
          <option>6–12 months</option>
          <option>More than 12 months</option>
          <option>Not yet determined</option>
        </SelectControl>
      </div>
      <CheckboxGrid
        legend="Preferred industries"
        items={sectors.map((s) => ({ value: s.id, label: s.name }))}
        register={register("expectations.preferredIndustries")}
        error={fieldError(errors?.preferredIndustries)}
      />
      <CheckboxGrid
        legend="Preferred product families"
        items={productFamilies.map((f) => ({ value: f.id, label: f.name }))}
        register={register("expectations.preferredProductFamilies")}
        error={fieldError(errors?.preferredProductFamilies)}
      />
      <CheckboxGrid
        legend="Programme requirements"
        items={[
          ["trainingRequired", "Training required"],
          ["demonstrationProductsRequired", "Demonstration products required"],
          ["showroomDisplayPossible", "Showroom display is possible"],
          [
            "localLanguageMarketingRequired",
            "Local-language marketing required",
          ],
          ["customProductsCommon", "Custom products commonly required"],
        ].map(([value, label]) => ({ value, label }))}
        pathPrefix="expectations"
        register={register}
      />
      <TextArea
        label="Additional comments (optional)"
        className="mt-8"
        {...register("expectations.comments")}
      />
    </fieldset>
  );
}

function DeclarationsStep({
  register,
  errors,
}: {
  register: Register;
  errors?: Errors["declarations"];
}) {
  return (
    <fieldset>
      <legend className="sr-only">Declarations and consent</legend>
      <p className="type-body-sm text-ink-muted">
        Mandatory application and processing consents are separate from optional
        marketing consent.
      </p>
      <div className="border-line mt-7 space-y-3 border-y py-5">
        {declarationFields.map(([field, label]) => (
          <div key={field}>
            <Checkbox
              label={`${label} (required)`}
              {...register(`declarations.${field}`)}
            />
            {fieldError(errors?.[field]) && (
              <p className="text-error ml-8 text-xs">
                {fieldError(errors?.[field])}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Checkbox
          label="I would like to receive optional partner and product marketing updates."
          {...register("declarations.marketingConsent")}
        />
        <p className="type-caption text-ink-muted mt-2">
          Optional. This choice does not affect application review.
        </p>
      </div>
    </fieldset>
  );
}

function ReviewStep({
  value,
  fileCount,
  edit,
}: {
  value: PartnerApplicationInput;
  fileCount: number;
  edit: (step: number) => void;
}) {
  const summaries = [
    ["Organisation", value.organisation.legalCompanyName, 0],
    [
      "Primary contact",
      `${value.contact.fullName} — ${value.contact.jobTitle}`,
      1,
    ],
    [
      "Partner types",
      value.partnerInterest.partnerTypes
        .map((id) => partnerTypeContent.find((t) => t.id === id)?.name)
        .join(", "),
      2,
    ],
    ["Coverage", value.coverage.countriesServed, 3],
    ["Market experience", value.experience.primaryIndustries.join(", "), 4],
    [
      "Technical capability",
      `${Object.values(value.technical).filter((v) => v === "in-house").length} in-house capabilities`,
      5,
    ],
    ["Commercial capability", value.commercial.salesModel, 6],
    [
      "Brand relationships",
      value.relationships.potentialConflict
        ? "Potential conflict disclosed"
        : "No potential conflict declared",
      7,
    ],
    [
      "References and documents",
      `${value.references.projects.length} project references; ${fileCount} documents`,
      8,
    ],
    ["Programme expectations", value.expectations.preferredTerritory, 9],
    ["Declarations", "Mandatory declarations confirmed", 10],
  ] as const;
  return (
    <section>
      <div className="flex flex-wrap justify-between gap-4">
        <p className="type-body-sm text-ink-muted max-w-2xl">
          Review the complete application before submission. Use Edit to return
          to a section. Sensitive data is not included in browser print metadata
          or analytics.
        </p>
        <SecondaryButton type="button" onClick={() => window.print()}>
          <Printer aria-hidden className="size-4" /> Print or save PDF
        </SecondaryButton>
      </div>
      <dl className="border-line mt-8 border-t">
        {summaries.map(([label, summary, target]) => (
          <div
            key={label}
            className="border-line grid gap-3 border-b py-5 sm:grid-cols-[12rem_1fr_auto]"
          >
            <dt className="type-spec-label text-ink-muted">{label}</dt>
            <dd className="text-sm">{summary || "Not provided"}</dd>
            <button
              type="button"
              onClick={() => edit(target)}
              className="motion-link min-h-11 text-sm font-semibold"
            >
              Edit
            </button>
          </div>
        ))}
      </dl>
      <div className="border-accent bg-accent-light mt-8 border-l-2 p-5">
        <p className="font-semibold">Submission notice</p>
        <p className="type-body-sm mt-2">
          Submitting this application begins ONESPACE’s review process. It does
          not create a dealership, distribution, agency, exclusivity or
          partnership agreement.
        </p>
      </div>
    </section>
  );
}

function CheckboxGrid({
  legend,
  items,
  register: registration,
  error,
  pathPrefix,
}: {
  legend: string;
  items: Array<{ value: string; label: string }>;
  error?: string;
  pathPrefix?: string;
  register: ReturnType<Register> | Register;
}) {
  const directRegistration =
    typeof registration === "function" ? undefined : registration;
  const fn =
    typeof registration === "function" ? (registration as Register) : undefined;
  return (
    <fieldset className="mt-8">
      <legend className="type-spec-label">{legend}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((item) => {
          const props =
            directRegistration ??
            (fn && pathPrefix
              ? fn(
                  `${pathPrefix}.${item.value}` as FieldPath<PartnerApplicationInput>,
                )
              : {});
          return (
            <Checkbox
              key={item.value}
              value={directRegistration ? item.value : undefined}
              label={item.label}
              {...props}
            />
          );
        })}
      </div>
      {error && <p className="text-error mt-2 text-sm">{error}</p>}
    </fieldset>
  );
}
