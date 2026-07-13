export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.SANITY_API_VERSION ?? "2026-07-13",
  token: process.env.SANITY_API_READ_TOKEN,
  studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "/studio",
};

export type CmsMode = "local" | "sanity";

export function getCmsMode(): CmsMode {
  const configured = process.env.CMS_MODE;
  if (configured && configured !== "local" && configured !== "sanity")
    throw new Error(`Unsupported CMS_MODE: ${configured}`);
  const mode = (configured ??
    (process.env.NODE_ENV === "development" ? "local" : "sanity")) as CmsMode;
  if (mode === "local" && process.env.NODE_ENV === "production")
    throw new Error(
      "CMS_MODE=local is disabled in production. Configure Sanity explicitly.",
    );
  if (mode === "sanity" && !sanityConfig.projectId)
    throw new Error("Sanity CMS mode requires NEXT_PUBLIC_SANITY_PROJECT_ID.");
  return mode;
}
