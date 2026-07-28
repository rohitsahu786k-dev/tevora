"use server";

import { createHash } from "node:crypto";
import { redirect } from "next/navigation";
import { hasDatabaseConfig, getDatabase } from "@/lib/server/mongodb";
import { loginAccessSchema } from "@/lib/validation/login";
import { routes } from "@/lib/routes";

export async function requestLoginAccess(formData: FormData) {
  const payload = {
    workEmail: String(formData.get("workEmail") ?? ""),
    tevoraId: String(formData.get("tevoraId") ?? ""),
    company: String(formData.get("company") ?? ""),
  };
  const result = loginAccessSchema.safeParse(payload);
  if (!result.success) redirect(`${routes.login}?status=invalid` as never);
  if (!hasDatabaseConfig())
    redirect(`${routes.login}?status=database` as never);

  const reference = crypto.randomUUID();
  const submittedAt = new Date();
  const tevoraId = result.data.tevoraId.trim();
  const tevoraIdHash = createHash("sha256").update(tevoraId).digest("hex");
  try {
    const database = await getDatabase();
    await database.collection("resourceLoginRequests").insertOne({
      reference,
      submittedAt,
      workEmail: result.data.workEmail.toLowerCase(),
      tevoraIdHash,
      tevoraIdLast4: tevoraId.slice(-4),
      company: result.data.company,
      status: "pending-review",
      source: "website-login",
    });
  } catch {
    redirect(`${routes.login}?status=error` as never);
  }

  redirect(`${routes.login}?status=success&reference=${reference}` as never);
}
