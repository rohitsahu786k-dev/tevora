import { z } from "zod";
import { CONFIGURATION_VERSION } from "@/types/configuration";

const answerSchema = z.enum(["", "yes", "no", "unsure"]);

export const productFinderSchema = z.object({
  sector: z.string(),
  space: z.string(),
  activity: z.string().max(200),
  users: z.string().max(200),
  displaySize: z.string().max(100),
  displayQuantity: z.string().max(50),
  camera: z.string().max(200),
  soundbar: z.string().max(200),
  controlDevice: z.string().max(200),
  computingDevices: z.string().max(300),
  rackEquipment: answerSchema,
  mobility: answerSchema,
  heightAdjustment: answerSchema,
  accessibility: answerSchema,
  concealedStorage: answerSchema,
  serviceAccess: z.string(),
  cadBimRequired: answerSchema,
  projectStage: z.string(),
  projectLocation: z.string().max(200),
});

export const productConfigurationSchema = z.object({
  productSlug: z.string(),
  model: z.string().max(100),
  displayConfiguration: z.string().max(200),
  deviceConfiguration: z.string().max(300),
  cameraConfiguration: z.string().max(200),
  soundbarConfiguration: z.string().max(200),
  rackConfiguration: z.string().max(200),
  finish: z.string().max(100),
  mobility: z.string().max(100),
  accessorySlugs: z.array(z.string()),
});

export const tevoraConfigurationSchema = z.object({
  version: z.literal(CONFIGURATION_VERSION),
  id: z.string().min(1),
  updatedAt: z.iso.datetime(),
  mode: z.enum([
    "find-product",
    "configure-product",
    "design-space",
    "build-requirement",
    "upload-layout",
    "request-proposal",
  ]),
  finder: productFinderSchema,
  configuration: productConfigurationSchema,
});

export type ProductFinderInput = z.infer<typeof productFinderSchema>;
