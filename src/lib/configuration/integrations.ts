import type { ConfigurationIntegrationAdapters } from "@/types/configuration";

// Server-owned adapters will be connected here. Secrets must remain in server-only
// modules and environment variables; this registry intentionally exposes no keys.
export const configurationIntegrations: ConfigurationIntegrationAdapters = {
  viewer3d: null,
  pricingEngine: null,
  boqEngine: null,
  recommendationEngine: null,
  crm: null,
  partnerAccounts: null,
  pdfGeneration: null,
  cadExport: null,
  cloudRendering: null,
};
