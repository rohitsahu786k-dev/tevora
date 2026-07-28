import { accessories, productFamilies, products } from "@/content";
import { accessoryToProducts } from "@/content/relationships";
import type { AccessoryCompatibilityProfile } from "@/types/compatibility";

export const compatibilityProfiles: AccessoryCompatibilityProfile[] =
  accessories.map((accessory) => {
    const productSlugs = accessoryToProducts[accessory.slug] ?? [];
    const compatibleProducts = products.filter((product) =>
      productSlugs.includes(product.slug),
    );
    const familyIds = [
      ...new Set(compatibleProducts.map((product) => product.productFamily)),
    ];
    return {
      accessoryId: accessory.id,
      compatibleProductIds: compatibleProducts.map((product) => product.id),
      compatibleProductFamilyIds: familyIds,
      incompatibleProductIds: [],
      requiredBaseProduct: true,
      requiredAccessoryIds: [],
      excludedAccessoryIds: [],
      supportedDisplayRange: null,
      supportedDeviceTypes: [],
      supportedVesaPatterns: [],
      installationTypes: [],
      modelSpecificRules: [],
      status: "provisional",
      notes: [
        "Confirm final fit against the selected product, equipment and installation conditions.",
      ],
      dataStatus: "placeholder",
    };
  });
export const compatibilityProfileByAccessoryId = Object.fromEntries(
  compatibilityProfiles.map((profile) => [profile.accessoryId, profile]),
);
export const compatibilityFamilyNames = Object.fromEntries(
  productFamilies.map((family) => [family.id, family.name]),
);
