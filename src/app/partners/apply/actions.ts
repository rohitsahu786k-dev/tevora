"use server";

import { partnerAnalytics } from "@/lib/analytics/partners";
import { partnerApplicationAdapters } from "@/lib/integrations/partner-application";
import { scorePartnerApplication } from "@/lib/partners/scoring";
import {
  isPublicEmailDomain,
  partnerApplicationSchema,
} from "@/lib/validation/partner-application";
import type { PartnerApplicationContext } from "@/types/partner";

export type PartnerApplicationActionResult =
  | { ok: true; reference: string }
  | {
      ok: false;
      message: string;
      errors?: Record<string, string[]>;
      duplicateReference?: string;
    };

const acceptedFiles = new Map([
  ["application/pdf", ["pdf"]],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ["docx"],
  ],
  [
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ["pptx"],
  ],
  ["image/jpeg", ["jpg", "jpeg"]],
  ["image/png", ["png"]],
]);

async function hashRateLimitKey(value: string) {
  const bytes = new TextEncoder().encode(value.toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function referenceNumber(date = new Date()) {
  const day = date.toISOString().slice(0, 10).replaceAll("-", "");
  return `TVP-${day}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

function fieldErrors(error: {
  issues: Array<{ path: PropertyKey[]; message: string }>;
}) {
  return error.issues.reduce<Record<string, string[]>>((errors, issue) => {
    const path = issue.path.join(".");
    errors[path] = [...(errors[path] ?? []), issue.message];
    return errors;
  }, {});
}

export async function submitPartnerApplication(
  formData: FormData,
): Promise<PartnerApplicationActionResult> {
  let payload: unknown;
  try {
    payload = JSON.parse(String(formData.get("payload") ?? ""));
  } catch {
    return {
      ok: false,
      message: "The submitted application could not be read.",
    };
  }

  const parsed = partnerApplicationSchema.safeParse(payload);
  if (!parsed.success) {
    await partnerAnalytics.track("partner_application_error", {
      errorCategory: "validation",
    });
    return {
      ok: false,
      message: "Review the highlighted application sections.",
      errors: fieldErrors(parsed.error),
    };
  }

  if (!partnerApplicationAdapters.configured)
    return {
      ok: false,
      message:
        "Partner applications are temporarily unavailable online. Your entered information remains in the form and has not been submitted.",
    };

  const input = parsed.data;
  const rateKey = await hashRateLimitKey(input.contact.workEmail);
  if (!(await partnerApplicationAdapters.rateLimit.check(rateKey)))
    return {
      ok: false,
      message: "This application cannot be submitted again at the moment.",
    };
  if (
    !(await partnerApplicationAdapters.spam.verify({
      honeypot: input.website,
      token: String(formData.get("spamToken") ?? ""),
    }))
  )
    return { ok: false, message: "The application could not be submitted." };

  const files = formData
    .getAll("files")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (files.length > 12)
    return { ok: false, message: "Attach no more than twelve documents." };
  if (files.some((file) => file.size > 15 * 1024 * 1024))
    return { ok: false, message: "Each document must be 15 MB or smaller." };
  const invalidFile = files.find((file) => {
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    return !acceptedFiles.get(file.type)?.includes(extension);
  });
  if (invalidFile)
    return {
      ok: false,
      message: "Documents must be PDF, DOCX, PPTX, JPG or PNG files.",
    };
  const scan = await partnerApplicationAdapters.antivirus.scan(files);
  if (!scan.safe)
    return {
      ok: false,
      message: "One or more documents could not pass the security scan.",
    };

  const duplicateReference =
    await partnerApplicationAdapters.database.findDuplicate(input);
  if (duplicateReference)
    return {
      ok: false,
      message:
        "A potentially matching application already exists. Contact the partner team before submitting another application.",
      duplicateReference,
    };

  const submittedAt = new Date().toISOString();
  const context: PartnerApplicationContext = {
    applicationId: crypto.randomUUID(),
    reference: referenceNumber(new Date(submittedAt)),
    submittedAt,
    schemaVersion: 1,
    status: "submitted",
  };
  const score = scorePartnerApplication(input);
  const assignedRegionalManager =
    await partnerApplicationAdapters.region.assign(
      input.organisation.country,
      input.partnerInterest.partnerTypes,
    );
  const review = {
    reviewNotes: [],
    riskFlags: [
      ...score.riskFlags,
      ...(isPublicEmailDomain(input.contact.workEmail)
        ? ["public-email-domain-review"]
        : []),
    ],
    missingDocuments: [],
    recommendedNextAction: "Human initial business review",
    assignedRegionalManager,
  };

  try {
    await partnerApplicationAdapters.database.create(
      input,
      context,
      review,
      score,
    );
    await partnerApplicationAdapters.files.store(files, context);
    await partnerApplicationAdapters.consent.record(
      input.declarations,
      context,
    );
  } catch {
    await partnerApplicationAdapters.audit.record(
      "submission-failed",
      context,
      {
        stage: "secure-persistence",
      },
    );
    return {
      ok: false,
      message:
        "The application could not be stored securely. No confirmation has been issued; please try again later.",
    };
  }

  const integrations = await Promise.allSettled([
    partnerApplicationAdapters.crm.createPartnerLead(input, context),
    partnerApplicationAdapters.email.sendApplicantConfirmation(input, context),
    partnerApplicationAdapters.email.sendInternalNotification(input, context),
    partnerApplicationAdapters.workflow.notifyRegionalTeam(input, context),
    partnerApplicationAdapters.pdf.createApplicationSummary(input, context),
    partnerAnalytics.track("partner_application_submitted", {
      partnerTypeIds: input.partnerInterest.partnerTypes,
    }),
  ]);
  const failedIntegrations = integrations
    .map((result, index) => (result.status === "rejected" ? index : -1))
    .filter((index) => index >= 0);
  await partnerApplicationAdapters.audit.record(
    "application-submitted",
    context,
    {
      integrationFailures: failedIntegrations,
      fileCount: files.length,
    },
  );
  return { ok: true, reference: context.reference };
}
