import type {
  AccessoryCompatibilityProfile,
  CompatibilityContext,
  CompatibilityResult,
  CompatibilityStatus,
} from "@/types/compatibility";

const label: Record<CompatibilityStatus, string> = {
  verified: "Verified",
  provisional: "Provisional",
  "requires-technical-review": "Requires technical review",
  "not-compatible": "Not compatible",
};
export const compatibilityStatusLabel = (status: CompatibilityStatus) =>
  label[status];
export function evaluateCompatibility(
  profile: AccessoryCompatibilityProfile,
  context: CompatibilityContext,
  allProfiles: AccessoryCompatibilityProfile[] = [],
): CompatibilityResult {
  const reasons = [...profile.notes];
  let status: CompatibilityStatus = profile.status;
  let canSelect = true;
  if (profile.requiredBaseProduct && !context.productId) {
    status = "requires-technical-review";
    canSelect = false;
    reasons.unshift("Select a base product before adding this accessory.");
  }
  if (
    context.productId &&
    profile.incompatibleProductIds.includes(context.productId)
  ) {
    status = "not-compatible";
    canSelect = false;
    reasons.unshift("An explicit product exclusion applies.");
  }
  const excludedSelected = profile.excludedAccessoryIds.filter((id) =>
    context.selectedAccessoryIds.includes(id),
  );
  if (excludedSelected.length) {
    status = "not-compatible";
    canSelect = false;
    reasons.unshift(
      "This accessory is excluded by another selected accessory.",
    );
  }
  const missingRequired = profile.requiredAccessoryIds.filter(
    (id) => !context.selectedAccessoryIds.includes(id),
  );
  if (missingRequired.length) {
    status = "requires-technical-review";
    canSelect = false;
    reasons.unshift("Required accessory components must be selected first.");
  }
  if (context.productId) {
    const modelRule = profile.modelSpecificRules.find(
      (rule) =>
        rule.productId === context.productId &&
        rule.model === context.productModel,
    );
    if (modelRule) {
      status = modelRule.status;
      canSelect = modelRule.status !== "not-compatible";
      reasons.unshift(modelRule.note);
    } else if (
      !profile.compatibleProductIds.includes(context.productId) &&
      (!context.productFamilyId ||
        !profile.compatibleProductFamilyIds.includes(context.productFamilyId))
    ) {
      status = "requires-technical-review";
      reasons.unshift(
        "No verified product or product-family relationship is published.",
      );
    }
  }
  const alternativeAccessoryIds =
    status === "not-compatible"
      ? allProfiles
          .filter(
            (candidate) =>
              candidate.accessoryId !== profile.accessoryId &&
              !candidate.incompatibleProductIds.includes(
                context.productId ?? "",
              ) &&
              (!context.productId ||
                candidate.compatibleProductIds.includes(context.productId) ||
                Boolean(
                  context.productFamilyId &&
                  candidate.compatibleProductFamilyIds.includes(
                    context.productFamilyId,
                  ),
                )),
          )
          .map((candidate) => candidate.accessoryId)
      : [];
  return {
    accessoryId: profile.accessoryId,
    status,
    canSelect,
    reasons: [...new Set(reasons)],
    requiredAccessoryIds: missingRequired,
    excludedAccessoryIds: excludedSelected,
    alternativeAccessoryIds,
  };
}
export function evaluateAccessorySelection(
  profiles: AccessoryCompatibilityProfile[],
  context: CompatibilityContext,
) {
  return Object.fromEntries(
    profiles.map((profile) => [
      profile.accessoryId,
      evaluateCompatibility(profile, context, profiles),
    ]),
  );
}
export function canAddAccessory(
  profile: AccessoryCompatibilityProfile,
  context: CompatibilityContext,
) {
  return evaluateCompatibility(profile, context).canSelect;
}
