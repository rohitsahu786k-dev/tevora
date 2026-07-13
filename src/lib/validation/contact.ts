import { z } from "zod";

export const projectEnquirySchema = z.object({
  projectName: z.string().min(2, "Enter a project name."),
  sector: z.string().min(1, "Select a sector."),
  space: z.string().min(1, "Select a space."),
  location: z.string().min(2, "Enter the project location."),
  productInterest: z.string().min(1, "Select or describe a product interest."),
  technologyRequirements: z
    .string()
    .min(10, "Describe the technology requirements."),
  projectStage: z.string().min(1, "Select the project stage."),
  quantity: z.string().max(50),
  timeline: z.string().min(1, "Select or describe the timeline."),
  name: z.string().min(2, "Enter your name."),
  company: z.string().min(2, "Enter your company."),
  workEmail: z.email("Enter a valid work email."),
  phone: z.string().max(50),
  role: z.string().min(2, "Enter your role."),
  consent: z.boolean().refine(Boolean, "Consent is required to submit."),
  website: z.string().max(0, "Unable to submit."),
});

export type ProjectEnquiryInput = z.infer<typeof projectEnquirySchema>;

// Backward-compatible aliases for any CMS or form adapter importing the
// original contact validation name.
export const contactSchema = projectEnquirySchema;
export type ContactInput = ProjectEnquiryInput;
