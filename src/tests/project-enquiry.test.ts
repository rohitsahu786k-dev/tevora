import { describe, expect, it } from "vitest";
import { projects } from "@/content";
import { projectEnquirySchema } from "@/lib/validation/contact";

const validEnquiry = {
  projectName: "Learning space refresh",
  sector: "sector-higher-education",
  space: "space-classroom",
  location: "India",
  productInterest: "family-presentation-stations",
  technologyRequirements:
    "A project-supplied display and camera require review.",
  projectStage: "concept",
  quantity: "To be confirmed",
  timeline: "6-12-months",
  name: "Project User",
  company: "Example Practice",
  workEmail: "user@example.com",
  phone: "",
  role: "Architect",
  consent: true,
  website: "",
};

describe("projects and enquiry validation", () => {
  it("keeps placeholder projects free from client claims", () => {
    projects
      .filter((project) => project.dataStatus === "placeholder")
      .forEach((project) => {
        expect(project.clientDisplayName).toBeNull();
        expect(project.testimonial).toBeNull();
        expect(project.outcomes).toEqual([]);
      });
  });

  it("accepts a complete consented project enquiry", () => {
    expect(projectEnquirySchema.safeParse(validEnquiry).success).toBe(true);
  });

  it("rejects missing consent and honeypot content", () => {
    expect(
      projectEnquirySchema.safeParse({ ...validEnquiry, consent: false })
        .success,
    ).toBe(false);
    expect(
      projectEnquirySchema.safeParse({ ...validEnquiry, website: "spam" })
        .success,
    ).toBe(false);
  });
});
