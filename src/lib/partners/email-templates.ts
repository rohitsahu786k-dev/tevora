import { brandSettings } from "@/config/brand";
import { partnerTypeContent } from "@/content/partners";
import type { PartnerApplicationInput } from "@/lib/validation/partner-application";
import type { PartnerApplicationContext } from "@/types/partner";

const partnerNames = (input: PartnerApplicationInput) =>
  input.partnerInterest.partnerTypes.map(
    (id) => partnerTypeContent.find((type) => type.id === id)?.name ?? id,
  );

export function applicantConfirmationEmail(
  input: PartnerApplicationInput,
  context: PartnerApplicationContext,
) {
  return {
    subject: `${brandSettings.brandName} Partner Application Received`,
    text: [
      `Hello ${input.contact.fullName},`,
      `Your application for ${input.organisation.legalCompanyName} has been received.`,
      `Application reference: ${context.reference}`,
      `Partner types: ${partnerNames(input).join(", ")}`,
      "Our team will review the company profile, market coverage and strategic fit before deciding whether to progress the application or request more information.",
      "Submission does not create a dealership, distribution, agency, exclusivity or partnership agreement.",
      brandSettings.contactDetails.email,
    ].join("\n\n"),
  };
}

export function internalNotificationEmail(
  input: PartnerApplicationInput,
  context: PartnerApplicationContext,
) {
  return {
    subject: `New ${brandSettings.brandName} Partner Application — ${input.organisation.legalCompanyName}`,
    text: [
      `Company: ${input.organisation.legalCompanyName}`,
      `Country: ${input.organisation.country}`,
      `Partner type: ${partnerNames(input).join(", ")}`,
      `Primary contact: ${input.contact.fullName} (${input.contact.workEmail})`,
      `Key capabilities: ${Object.entries(input.technical)
        .filter(([, value]) => value === "in-house")
        .map(([key]) => key)
        .join(", ")}`,
      `Application reference: ${context.reference}`,
      `Internal review: [partner administration URL to be configured]`,
    ].join("\n"),
  };
}

export function additionalInformationEmail(
  applicantName: string,
  reference: string,
  requestedItems: string[],
) {
  return {
    subject: `${brandSettings.brandName} Partner Application — Additional Information`,
    text: `Hello ${applicantName},\n\nTo continue reviewing application ${reference}, please provide:\n\n${requestedItems.map((item) => `- ${item}`).join("\n")}\n\nThis request does not indicate approval.`,
  };
}

export function applicationOutcomeEmail(
  outcome: "discussion" | "additional-review" | "waitlisted" | "declined",
  applicantName: string,
  reference: string,
) {
  const directions = {
    discussion:
      "We would like to progress the application to a capability discussion.",
    "additional-review":
      "The application remains under review while we assess programme and regional requirements.",
    waitlisted:
      "The application has been placed on the programme waitlist pending market requirements.",
    declined:
      "The application will not progress at this time. This decision does not create or end any commercial agreement.",
  };
  return {
    subject: `${brandSettings.brandName} Partner Application Update`,
    text: `Hello ${applicantName},\n\n${directions[outcome]}\n\nApplication reference: ${reference}`,
    requiresHumanApproval: true,
  };
}
