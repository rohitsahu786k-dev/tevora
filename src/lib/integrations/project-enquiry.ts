import type { ProjectEnquiryInput } from "@/lib/validation/contact";

type ProjectEnquiryDocument = { _id: string } & Record<string, unknown>;

export interface EnquiryContext {
  enquiryId: string;
  submittedAt: string;
}
export interface CrmAdapter {
  createEnquiry(
    input: ProjectEnquiryInput,
    context: EnquiryContext,
  ): Promise<void>;
}
export interface EnquiryDatabaseAdapter {
  create(input: ProjectEnquiryInput, context: EnquiryContext): Promise<void>;
}
export interface EmailAdapter {
  sendProjectEnquiry(
    input: ProjectEnquiryInput,
    context: EnquiryContext,
  ): Promise<void>;
}
export interface FileStorageAdapter {
  store(files: File[], context: EnquiryContext): Promise<void>;
}
export interface EnquiryAnalyticsAdapter {
  trackSubmitted(
    input: ProjectEnquiryInput,
    context: EnquiryContext,
  ): Promise<void>;
}
export interface SpamProtectionAdapter {
  verify(input: { honeypot: string }): Promise<boolean>;
}

export const projectEnquiryAdapters: {
  configured: boolean;
  database: EnquiryDatabaseAdapter;
  crm: CrmAdapter;
  email: EmailAdapter;
  files: FileStorageAdapter;
  analytics: EnquiryAnalyticsAdapter;
  spam: SpamProtectionAdapter;
} = {
  configured:
    process.env.NODE_ENV !== "test" &&
    process.env.PROJECT_ENQUIRY_DELIVERY_ENABLED === "true" &&
    Boolean(
      process.env.DATABASE_URL &&
      process.env.CLOUDINARY_URL &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD,
    ),
  database: {
    create: async (input, context) => {
      const { getDatabase } = await import("@/lib/server/mongodb");
      const database = await getDatabase();
      await database
        .collection<ProjectEnquiryDocument>("projectEnquiries")
        .insertOne({
          _id: context.enquiryId,
          ...context,
          input,
          createdAt: new Date(context.submittedAt),
          updatedAt: new Date(context.submittedAt),
        });
    },
  },
  crm: { createEnquiry: async () => undefined },
  email: {
    sendProjectEnquiry: async (input, context) => {
      const { sendEmail } = await import("@/lib/server/email");
      const to = process.env.INTERNAL_NOTIFICATION_EMAIL;
      if (!to)
        throw new Error("INTERNAL_NOTIFICATION_EMAIL is not configured.");
      await sendEmail({
        to,
        replyTo: input.workEmail,
        subject: `New ONESPACE project enquiry — ${input.projectName}`,
        text: [
          `Reference: ${context.enquiryId}`,
          `Project: ${input.projectName}`,
          `Company: ${input.company}`,
          `Contact: ${input.name} (${input.workEmail})`,
          `Location: ${input.location}`,
          `Sector: ${input.sector}`,
          `Space: ${input.space}`,
          `Product interest: ${input.productInterest}`,
          `Requirements: ${input.technologyRequirements}`,
          `Timeline: ${input.timeline}`,
        ].join("\n"),
      });
    },
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
        `onespace/submissions/enquiries/${context.enquiryId}`,
      );
      const database = await getDatabase();
      await database
        .collection<ProjectEnquiryDocument>("projectEnquiries")
        .updateOne(
          { _id: context.enquiryId },
          { $set: { files: storedFiles, updatedAt: new Date() } },
        );
    },
  },
  analytics: { trackSubmitted: async () => undefined },
  spam: { verify: async ({ honeypot }) => honeypot.length === 0 },
};
