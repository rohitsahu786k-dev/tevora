import { z } from "zod";
const status = z.enum([
  "verified",
  "provisional",
  "requires-technical-review",
  "not-compatible",
]);
export const accessoryCompatibilityProfileSchema = z
  .object({
    accessoryId: z.string().min(1),
    compatibleProductIds: z.array(z.string().min(1)),
    compatibleProductFamilyIds: z.array(z.string().min(1)),
    incompatibleProductIds: z.array(z.string().min(1)),
    requiredBaseProduct: z.boolean(),
    requiredAccessoryIds: z.array(z.string().min(1)),
    excludedAccessoryIds: z.array(z.string().min(1)),
    supportedDisplayRange: z
      .object({
        minimum: z.string().nullable(),
        maximum: z.string().nullable(),
        unit: z.string().nullable(),
        verified: z.boolean(),
      })
      .nullable(),
    supportedDeviceTypes: z.array(z.string()),
    supportedVesaPatterns: z.array(z.string()),
    installationTypes: z.array(z.string()),
    modelSpecificRules: z.array(
      z.object({
        productId: z.string().min(1),
        model: z.string().min(1),
        status,
        note: z.string().min(1),
      }),
    ),
    status,
    notes: z.array(z.string()),
    dataStatus: z.enum(["placeholder", "verified"]),
  })
  .superRefine((profile, ctx) => {
    if (profile.dataStatus === "placeholder" && profile.status === "verified")
      ctx.addIssue({
        code: "custom",
        message: "Placeholder compatibility cannot be Verified",
      });
    if (
      profile.dataStatus === "placeholder" &&
      (profile.supportedDisplayRange ||
        profile.supportedDeviceTypes.length ||
        profile.supportedVesaPatterns.length ||
        profile.installationTypes.length ||
        profile.modelSpecificRules.length ||
        profile.incompatibleProductIds.length)
    )
      ctx.addIssue({
        code: "custom",
        message:
          "Placeholder compatibility cannot publish technical ranges, patterns, installation types, model rules or exclusions",
      });
  });
export function validateCompatibilityProfiles(profiles: unknown[]) {
  const parsed = z.array(accessoryCompatibilityProfileSchema).parse(profiles);
  const ids = parsed.map((profile) => profile.accessoryId);
  if (new Set(ids).size !== ids.length)
    throw new Error("Duplicate accessory compatibility profile");
  return parsed;
}
