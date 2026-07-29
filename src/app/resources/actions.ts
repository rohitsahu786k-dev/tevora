"use server";

import { hasDatabaseConfig, getDatabase } from "@/lib/server/mongodb";
import { resourceAccessSchema } from "@/lib/validation/resource-access";

export type ResourceAccessResult =
  | { ok: true; reference: string }
  | { ok: false; message: string; errors?: Record<string, string[]> };

export async function submitResourceAccessRequest(
  formData: FormData,
): Promise<ResourceAccessResult> {
  let payload: unknown;
  try {
    payload = JSON.parse(String(formData.get("payload") ?? ""));
  } catch {
    return {
      ok: false,
      message: "The submitted access request could not be read.",
    };
  }
  const result = resourceAccessSchema.safeParse(payload);
  if (!result.success)
    return {
      ok: false,
      message: "Review the highlighted fields.",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  if (!hasDatabaseConfig())
    return {
      ok: false,
      message:
        "The ONESPACE access database is not connected yet. Configure DATABASE_URL to save download access requests.",
    };

  const source = payload as { resourceId?: unknown; resourceTitle?: unknown };
  const reference = crypto.randomUUID();
  try {
    const database = await getDatabase();
    await database.collection("resourceAccessRequests").insertOne({
      reference,
      submittedAt: new Date(),
      resourceId:
        typeof source.resourceId === "string" ? source.resourceId : null,
      resourceTitle:
        typeof source.resourceTitle === "string" ? source.resourceTitle : null,
      name: result.data.name,
      company: result.data.company,
      workEmail: result.data.workEmail.toLowerCase(),
      country: result.data.country,
      role: result.data.role,
      projectType: result.data.projectType,
      status: "pending-review",
      source: "website-resource-gate",
    });
  } catch {
    return {
      ok: false,
      message:
        "The access request could not be saved. Please try again when access support is available.",
    };
  }

  return { ok: true, reference };
}
