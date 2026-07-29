import { onespaceConfigurationSchema } from "@/lib/validation/configuration";
import {
  CONFIGURATION_VERSION,
  type OnespaceConfigurationState,
} from "@/types/configuration";

export const CONFIGURATION_STORAGE_KEY = "onespace-configuration-v1";
export const CONFIGURATION_QUERY_KEY = "configuration";

export function createConfigurationState(seed?: {
  id?: string;
  updatedAt?: string;
}): OnespaceConfigurationState {
  return {
    version: CONFIGURATION_VERSION,
    id:
      seed?.id ??
      globalThis.crypto?.randomUUID?.() ??
      `configuration-${Date.now()}`,
    updatedAt: seed?.updatedAt ?? new Date().toISOString(),
    mode: "find-product",
    finder: {
      productFamily: "",
      sector: "",
      space: "",
      activity: "",
      users: "",
      displaySize: "",
      displayQuantity: "",
      camera: "",
      soundbar: "",
      controlDevice: "",
      computingDevices: "",
      rackEquipment: "",
      mobility: "",
      heightAdjustment: "",
      accessibility: "",
      concealedStorage: "",
      serviceAccess: "",
      cadBimRequired: "",
      projectStage: "",
      projectLocation: "",
    },
    configuration: {
      productSlug: "",
      model: "",
      displayConfiguration: "",
      deviceConfiguration: "",
      cameraConfiguration: "",
      soundbarConfiguration: "",
      rackConfiguration: "",
      finish: "",
      mobility: "",
      accessorySlugs: [],
    },
  };
}

export const serialiseConfiguration = (state: OnespaceConfigurationState) =>
  JSON.stringify(state);

export function parseConfiguration(value: string | null) {
  if (!value) return null;
  try {
    const result = onespaceConfigurationSchema.safeParse(JSON.parse(value));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function createConfigurationShareUrl(
  state: OnespaceConfigurationState,
  baseUrl: string,
) {
  const url = new URL(baseUrl);
  url.searchParams.set(CONFIGURATION_QUERY_KEY, serialiseConfiguration(state));
  return url.toString();
}
