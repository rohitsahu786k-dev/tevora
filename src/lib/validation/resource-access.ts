import { z } from "zod";

export const resourceAccessSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  company: z.string().min(2, "Enter your company."),
  workEmail: z.email("Enter a valid work email."),
  country: z.string().min(2, "Enter your country."),
  role: z.string().min(2, "Select your role."),
  projectType: z.string().min(2, "Select a project type."),
});

export type ResourceAccessInput = z.infer<typeof resourceAccessSchema>;
