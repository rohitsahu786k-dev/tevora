export const partnerAnalyticsEvents = [
  "partners_page_viewed",
  "partner_type_viewed",
  "partner_apply_started",
  "partner_step_completed",
  "partner_application_saved",
  "partner_application_resumed",
  "partner_file_uploaded",
  "partner_application_abandoned",
  "partner_application_submitted",
  "partner_application_error",
] as const;

export type PartnerAnalyticsEvent = (typeof partnerAnalyticsEvents)[number];

export interface PartnerAnalyticsProperties {
  step?: number;
  partnerTypeIds?: string[];
  countryCode?: string;
  fileCount?: number;
  applicationState?: "new" | "resumed";
  errorCategory?: string;
}

export interface PartnerAnalyticsAdapter {
  track(
    event: PartnerAnalyticsEvent,
    properties?: PartnerAnalyticsProperties,
  ): Promise<void>;
}

export const partnerAnalytics: PartnerAnalyticsAdapter = {
  track: async () => undefined,
};
