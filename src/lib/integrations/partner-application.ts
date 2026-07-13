import type { PartnerApplicationInput } from "@/lib/validation/partner-application";
import type {
  PartnerApplicationContext,
  PartnerApplicationReceipt,
  PartnerInternalReview,
  PartnerScoreResult,
} from "@/types/partner";
import {
  applicantConfirmationEmail,
  internalNotificationEmail,
} from "@/lib/partners/email-templates";

type PartnerApplicationDocument = {
  _id: string;
  reference?: string;
  submittedAt?: string;
  input?: unknown;
} & Record<string, unknown>;

export interface PartnerApplicationDatabaseAdapter {
  create(
    input: PartnerApplicationInput,
    context: PartnerApplicationContext,
    review: PartnerInternalReview,
    score: PartnerScoreResult,
  ): Promise<void>;
  getReceipt(reference: string): Promise<PartnerApplicationReceipt | null>;
  findDuplicate(input: PartnerApplicationInput): Promise<string | null>;
}
export interface PartnerDraftAdapter {
  saveEncryptedDraft(input: unknown, ownerToken: string): Promise<string>;
  loadEncryptedDraft(draftId: string, ownerToken: string): Promise<unknown>;
}
export interface PartnerFileStorageAdapter {
  store(files: File[], context: PartnerApplicationContext): Promise<void>;
  deleteForApplication(applicationId: string): Promise<void>;
}
export interface AntivirusAdapter {
  scan(files: File[]): Promise<{ safe: boolean; rejectedFiles: string[] }>;
}
export interface PartnerCrmAdapter {
  createPartnerLead(
    input: PartnerApplicationInput,
    context: PartnerApplicationContext,
  ): Promise<void>;
}
export interface PartnerEmailAdapter {
  sendApplicantConfirmation(
    input: PartnerApplicationInput,
    context: PartnerApplicationContext,
  ): Promise<void>;
  sendInternalNotification(
    input: PartnerApplicationInput,
    context: PartnerApplicationContext,
  ): Promise<void>;
}
export interface WorkflowNotificationAdapter {
  notifyRegionalTeam(
    input: PartnerApplicationInput,
    context: PartnerApplicationContext,
  ): Promise<void>;
}
export interface RegionalAssignmentAdapter {
  assign(country: string, partnerTypes: string[]): Promise<string | undefined>;
}
export interface PartnerPdfAdapter {
  createApplicationSummary(
    input: PartnerApplicationInput,
    context: PartnerApplicationContext,
  ): Promise<Uint8Array | null>;
}
export interface PartnerAuditAdapter {
  record(
    event: string,
    context: PartnerApplicationContext,
    metadata?: Record<string, unknown>,
  ): Promise<void>;
}
export interface PartnerConsentAdapter {
  record(
    input: PartnerApplicationInput["declarations"],
    context: PartnerApplicationContext,
  ): Promise<void>;
}
export interface PartnerRateLimitAdapter {
  check(key: string): Promise<boolean>;
}
export interface PartnerSpamAdapter {
  verify(input: { honeypot: string; token?: string }): Promise<boolean>;
}

interface PartnerApplicationAdapterSet {
  configured: boolean;
  database: PartnerApplicationDatabaseAdapter;
  drafts: PartnerDraftAdapter;
  files: PartnerFileStorageAdapter;
  antivirus: AntivirusAdapter;
  crm: PartnerCrmAdapter;
  email: PartnerEmailAdapter;
  workflow: WorkflowNotificationAdapter;
  region: RegionalAssignmentAdapter;
  pdf: PartnerPdfAdapter;
  audit: PartnerAuditAdapter;
  consent: PartnerConsentAdapter;
  rateLimit: PartnerRateLimitAdapter;
  spam: PartnerSpamAdapter;
}

const unavailable = async () => {
  throw new Error("Partner application integration is not configured.");
};

const configured =
  process.env.NODE_ENV !== "test" &&
  process.env.PARTNER_APPLICATION_DELIVERY_ENABLED === "true" &&
  Boolean(
    process.env.DATABASE_URL &&
    process.env.CLOUDINARY_URL &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD,
  );

export const partnerApplicationAdapters: PartnerApplicationAdapterSet = {
  configured,
  database: {
    create: async (input, context, review, score) => {
      const { getDatabase } = await import("@/lib/server/mongodb");
      const database = await getDatabase();
      await database
        .collection<PartnerApplicationDocument>("partnerApplications")
        .insertOne({
          _id: context.applicationId,
          ...context,
          input,
          review,
          score,
          createdAt: new Date(context.submittedAt),
          updatedAt: new Date(context.submittedAt),
        });
    },
    getReceipt: async (reference) => {
      const { getDatabase } = await import("@/lib/server/mongodb");
      const database = await getDatabase();
      const application = await database
        .collection<PartnerApplicationDocument>("partnerApplications")
        .findOne({ reference });
      if (!application) return null;
      const input = application.input as PartnerApplicationInput;
      return {
        reference: String(application.reference),
        companyName: input.organisation.legalCompanyName,
        primaryContactName: input.contact.fullName,
        submittedAt: String(application.submittedAt),
        partnerTypes: input.partnerInterest.partnerTypes,
      };
    },
    findDuplicate: async (input) => {
      const { getDatabase } = await import("@/lib/server/mongodb");
      const database = await getDatabase();
      const application = await database
        .collection<PartnerApplicationDocument>("partnerApplications")
        .findOne(
          {
            $or: [
              {
                "input.contact.workEmail":
                  input.contact.workEmail.toLowerCase(),
              },
              {
                "input.organisation.legalCompanyName":
                  input.organisation.legalCompanyName,
              },
            ],
          },
          { projection: { reference: 1 } },
        );
      return application ? String(application.reference) : null;
    },
  },
  drafts: {
    saveEncryptedDraft: unavailable,
    loadEncryptedDraft: unavailable,
  },
  files: {
    store: async (files, context) => {
      if (files.length === 0) return;
      const [{ storeFiles }, { getDatabase }] = await Promise.all([
        import("@/lib/server/cloudinary"),
        import("@/lib/server/mongodb"),
      ]);
      const storedFiles = await storeFiles(
        files,
        `tevora/submissions/partner/${context.applicationId}`,
      );
      const database = await getDatabase();
      await database
        .collection<PartnerApplicationDocument>("partnerApplications")
        .updateOne(
          { _id: context.applicationId },
          { $set: { files: storedFiles, updatedAt: new Date() } },
        );
    },
    deleteForApplication: async (applicationId) => {
      const [{ deleteFolderResources }, { getDatabase }] = await Promise.all([
        import("@/lib/server/cloudinary"),
        import("@/lib/server/mongodb"),
      ]);
      await deleteFolderResources(
        `tevora/submissions/partner/${applicationId}`,
      );
      const database = await getDatabase();
      await database
        .collection<PartnerApplicationDocument>("partnerApplications")
        .updateOne(
          { _id: applicationId },
          { $unset: { files: "" }, $set: { updatedAt: new Date() } },
        );
    },
  },
  antivirus: {
    scan: async () => ({ safe: true, rejectedFiles: [] }),
  },
  crm: { createPartnerLead: async () => undefined },
  email: {
    sendApplicantConfirmation: async (input, context) => {
      const { sendEmail } = await import("@/lib/server/email");
      await sendEmail({
        to: input.contact.workEmail,
        ...applicantConfirmationEmail(input, context),
      });
    },
    sendInternalNotification: async (input, context) => {
      const { sendEmail } = await import("@/lib/server/email");
      const to = process.env.INTERNAL_NOTIFICATION_EMAIL;
      if (!to)
        throw new Error("INTERNAL_NOTIFICATION_EMAIL is not configured.");
      await sendEmail({
        to,
        replyTo: input.contact.workEmail,
        ...internalNotificationEmail(input, context),
      });
    },
  },
  workflow: { notifyRegionalTeam: async () => undefined },
  region: { assign: async () => undefined },
  pdf: { createApplicationSummary: async () => null },
  audit: {
    record: async (event, context, metadata) => {
      if (process.env.NODE_ENV === "test") return;
      const { getDatabase } = await import("@/lib/server/mongodb");
      const database = await getDatabase();
      await database.collection("partnerApplicationAudit").insertOne({
        event,
        applicationId: context.applicationId,
        reference: context.reference,
        metadata: metadata ?? {},
        createdAt: new Date(),
      });
    },
  },
  consent: {
    record: async (declarations, context) => {
      const { getDatabase } = await import("@/lib/server/mongodb");
      const database = await getDatabase();
      await database
        .collection<PartnerApplicationDocument>("partnerApplications")
        .updateOne(
          { _id: context.applicationId },
          {
            $set: {
              consent: { declarations, recordedAt: new Date() },
              updatedAt: new Date(),
            },
          },
        );
    },
  },
  rateLimit: {
    check: async (key) => {
      if (process.env.NODE_ENV === "test") return true;
      const { getDatabase } = await import("@/lib/server/mongodb");
      const database = await getDatabase();
      const collection = database.collection("submissionRateLimits");
      const recent = await collection.findOne({
        key,
        createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
      });
      if (recent) return false;
      await collection.insertOne({ key, createdAt: new Date() });
      return true;
    },
  },
  spam: {
    verify: async ({ honeypot }) => honeypot.length === 0,
  },
};
