import { z } from "zod";

export const loginAccessSchema = z.object({
  workEmail: z.email("Enter the email linked to your TEVORA account."),
  tevoraId: z.string().min(4, "Enter your TEVORA-issued ID."),
  company: z.string().min(2, "Enter your company."),
});

export type LoginAccessInput = z.infer<typeof loginAccessSchema>;
