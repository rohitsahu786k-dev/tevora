"use server";

import { createHash } from "node:crypto";
import { redirect } from "next/navigation";
import { hasDatabaseConfig, getDatabase } from "@/lib/server/mongodb";
import { loginAccessSchema } from "@/lib/validation/login";
import { routes } from "@/lib/routes";

const demoLogin = {
  workEmail: "demo@onespace.design",
  onespaceId: "ONESPACE-DEMO-2026",
  company: "ONESPACE Demo",
};

export async function requestLoginAccess(formData: FormData) {
  const payload = {
    workEmail: String(formData.get("workEmail") ?? ""),
    onespaceId: String(formData.get("onespaceId") ?? ""),
    company: String(formData.get("company") ?? ""),
  };
  const result = loginAccessSchema.safeParse(payload);
  if (!result.success) redirect(`${routes.login}?status=invalid` as never);
  const isDemoLogin =
    result.data.workEmail.trim().toLowerCase() === demoLogin.workEmail &&
    result.data.onespaceId.trim().toUpperCase() === demoLogin.onespaceId &&
    result.data.company.trim().toLowerCase() ===
      demoLogin.company.toLowerCase();
  if (isDemoLogin) redirect(`${routes.resources}?login=demo` as never);
  if (!hasDatabaseConfig())
    redirect(`${routes.login}?status=database` as never);

  const reference = crypto.randomUUID();
  const submittedAt = new Date();
  const onespaceId = result.data.onespaceId.trim();
  const onespaceIdHash = createHash("sha256").update(onespaceId).digest("hex");
  try {
    const database = await getDatabase();
    await database.collection("resourceLoginRequests").insertOne({
      reference,
      submittedAt,
      workEmail: result.data.workEmail.toLowerCase(),
      onespaceIdHash,
      onespaceIdLast4: onespaceId.slice(-4),
      company: result.data.company,
      status: "pending-review",
      source: "website-login",
    });
  } catch {
    redirect(`${routes.login}?status=error` as never);
  }

  redirect(`${routes.login}?status=success&reference=${reference}` as never);
}
