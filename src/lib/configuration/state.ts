import { tevoraConfigurationSchema } from "@/lib/validation/configuration";
import {
  CONFIGURATION_VERSION,
  type TevoraConfigurationState,
} from "@/types/configuration";

export const CONFIGURATION_STORAGE_KEY = "tevora-configuration-v1";
export const CONFIGURATION_QUERY_KEY = "configuration";

export function createConfigurationState(seed?: {
  id?: string;
  updatedAt?: string;
}): TevoraConfigurationState {
  return {
    version: CONFIGURATION_VERSION,
    id:
      seed?.id ??
      globalThis.crypto?.randomUUID?.() ??
      `configuration-${Date.now()}`,
    updatedAt: seed?.updatedAt ?? new Date().toISOString(),
    mode: "find-product",
    finder: {
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

export const serialiseConfiguration = (state: TevoraConfigurationState) =>
  JSON.stringify(state);

export function parseConfiguration(value: string | null) {
  if (!value) return null;
  try {
    const result = tevoraConfigurationSchema.safeParse(JSON.parse(value));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function createConfigurationShareUrl(
  state: TevoraConfigurationState,
  baseUrl: string,
) {
  const url = new URL(baseUrl);
  url.searchParams.set(CONFIGURATION_QUERY_KEY, serialiseConfiguration(state));
  return url.toString();
}
