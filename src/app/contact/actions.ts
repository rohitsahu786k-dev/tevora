"use server";

import { projectEnquiryAdapters } from "@/lib/integrations/project-enquiry";
import { projectEnquirySchema } from "@/lib/validation/contact";

export type EnquiryActionResult =
  | { ok: true; reference: string }
  | { ok: false; message: string; errors?: Record<string, string[]> };

export async function submitProjectEnquiry(
  formData: FormData,
): Promise<EnquiryActionResult> {
  let payload: unknown;
  try {
    payload = JSON.parse(String(formData.get("payload") ?? ""));
  } catch {
    return {
      ok: false,
      message: "The submitted project data could not be read.",
    };
  }
  const result = projectEnquirySchema.safeParse(payload);
  if (!result.success)
    return {
      ok: false,
      message: "Review the highlighted fields.",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  const files = formData
    .getAll("files")
    .filter((item): item is File => item instanceof File && item.size > 0);
  if (files.length > 5)
    return { ok: false, message: "Attach no more than five files." };
  if (files.some((file) => file.size > 10 * 1024 * 1024))
    return { ok: false, message: "Each attachment must be 10 MB or smaller." };
  const accepted = new Set([
    "application/pdf",
    "image/png",
    "image/jpeg",
    "application/dwg",
    "application/dxf",
  ]);
  if (files.some((file) => file.type && !accepted.has(file.type)))
    return {
      ok: false,
      message: "One or more attachment types are not supported.",
    };
  if (
    process.env.PROJECT_ENQUIRY_DELIVERY_ENABLED !== "true" ||
    !projectEnquiryAdapters.configured
  )
    return {
      ok: false,
      message:
        "Online project enquiries are temporarily unavailable. Please contact TEVORA directly and we will help with your project.",
    };
  if (
    !(await projectEnquiryAdapters.spam.verify({
      honeypot: result.data.website,
    }))
  )
    return { ok: false, message: "The enquiry could not be submitted." };
  const context = {
    enquiryId: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };
  try {
    await projectEnquiryAdapters.database.create(result.data, context);
    await Promise.all([
      projectEnquiryAdapters.crm.createEnquiry(result.data, context),
      projectEnquiryAdapters.email.sendProjectEnquiry(result.data, context),
      projectEnquiryAdapters.files.store(files, context),
      projectEnquiryAdapters.analytics.trackSubmitted(result.data, context),
    ]);
  } catch {
    return {
      ok: false,
      message:
        "The enquiry could not be delivered. Please try again when project support is available.",
    };
  }
  return { ok: true, reference: context.enquiryId };
}
