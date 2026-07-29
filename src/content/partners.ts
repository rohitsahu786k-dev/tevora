import type { PartnerType } from "@/types/partner";

export interface PartnerTypeContent {
  id: PartnerType;
  name: string;
  description: string;
  idealOrganisation: string;
  capabilities: string;
  customerBase: string;
}

export const partnerTypeContent: PartnerTypeContent[] = [
  {
    id: "authorised-dealer",
    name: "Authorised Dealer",
    description:
      "For organisations that sell ONESPACE products and manage customer relationships within an approved territory or market.",
    idealOrganisation: "Established technology or specialist furniture dealer",
    capabilities:
      "Consultative selling, account development and project coordination",
    customerBase: "Education, enterprise, public-sector and specialist buyers",
  },
  {
    id: "av-integration-partner",
    name: "AV Integration Partner",
    description:
      "For AV integrators who design, supply and deploy complete meeting, education, collaboration and specialist technology environments.",
    idealOrganisation: "AV and unified-communications integrator",
    capabilities: "System design, installation, commissioning and support",
    customerBase: "End users, consultants, contractors and project teams",
  },
  {
    id: "distribution-partner",
    name: "Distribution Partner",
    description:
      "For regional or national distributors with logistics, stockholding and channel-development capability.",
    idealOrganisation: "Value-added or specialist regional distributor",
    capabilities:
      "Channel development, logistics, stockholding and partner support",
    customerBase: "Dealers, integrators and approved resellers",
  },
  {
    id: "design-specification-partner",
    name: "Design & Specification Partner",
    description:
      "For architects, consultants, designers and technical specialists who specify ONESPACE products in projects.",
    idealOrganisation:
      "Independent design, architecture or consultancy practice",
    capabilities: "Space planning, specification and technical coordination",
    customerBase: "Clients, design teams and delivery partners",
  },
  {
    id: "education-solutions-partner",
    name: "Education Solutions Partner",
    description:
      "For organisations focused on universities, schools, lecture theatres, classrooms and learning environments.",
    idealOrganisation: "Education technology or learning-space specialist",
    capabilities:
      "Education workflows, campus delivery and stakeholder coordination",
    customerBase: "Universities, colleges, schools and training providers",
  },
  {
    id: "specialist-solutions-partner",
    name: "Specialist Solutions Partner",
    description:
      "For organisations working in control rooms, command centres, broadcast, simulation, government, healthcare and public-sector environments.",
    idealOrganisation: "Specialist technical-project organisation",
    capabilities:
      "Complex integration, controlled delivery and specialist support",
    customerBase: "Government, healthcare, broadcast and operational teams",
  },
  {
    id: "technology-alliance-partner",
    name: "Technology Alliance Partner",
    description:
      "For AV, display, camera, control, connectivity or software manufacturers interested in product compatibility and joint solutions.",
    idealOrganisation: "Technology manufacturer or platform provider",
    capabilities:
      "Product engineering, compatibility validation and joint enablement",
    customerBase: "Shared integrators, consultants and end-user markets",
  },
];

export const partnerBenefits = [
  "Distinctive technology-furniture portfolio",
  "Products built for AV integration",
  "Design and engineering support",
  "Product configuration assistance",
  "CAD, BIM and technical resources",
  "Project-specific guidance",
  "Customisation support",
  "Sales and presentation materials",
  "Training resources",
  "Lead collaboration where appropriate",
  "Access to new sectors and project opportunities",
];

export const partnerRequirements = [
  "Relevant industry experience",
  "Strong local-market understanding",
  "Technical capability",
  "Project-delivery experience",
  "Ethical business practices",
  "Customer-support capability",
  "Suitable sales coverage",
  "Ability to represent a premium brand",
  "Commitment to product learning",
  "Appropriate business registrations",
];

export const partnerJourney = [
  "Submit your application",
  "Initial business review",
  "Capability discussion",
  "Market and territory assessment",
  "Commercial and technical alignment",
  "Approval and onboarding",
  "Training and launch",
];

export const partnerSupport = [
  "Product training",
  "Technical documentation",
  "CAD and BIM resources",
  "Product configuration support",
  "Proposal assistance",
  "Marketing assets",
  "Sample and finish support",
  "Project-registration process",
  "Installation guidance",
  "Product updates",
];

export const partnerAudiences = [
  "AV integrators",
  "Dealers",
  "Distributors",
  "Architects",
  "AV consultants",
  "Education solution providers",
  "Technology consultants",
  "Specialist project companies",
  "Display and collaboration partners",
];

export const partnerFaqs = [
  {
    title: "Who can apply?",
    content:
      "Established organisations with relevant market, project, design, technical or distribution capability may apply. Each application is reviewed for business capability and strategic fit.",
  },
  {
    title: "Can a company apply for more than one partner type?",
    content:
      "Yes. Select every relevant type and identify the primary area of interest. ONESPACE may discuss a different programme fit during review.",
  },
  {
    title: "Is there an application fee?",
    content:
      "There is currently no application fee. Any commercial requirements would be discussed before an agreement is made.",
  },
  {
    title: "Does applying guarantee approval?",
    content:
      "No. Submission begins a review and does not create any dealership, distribution, agency or partnership relationship.",
  },
  {
    title: "Are territories exclusive?",
    content:
      "No exclusivity policy is promised. Territory and market arrangements, where applicable, require separate written agreement.",
  },
  {
    title: "Is product training provided?",
    content:
      "Training may be included depending on partner type, region, programme level and final agreement.",
  },
  {
    title: "Can partners request product customisation?",
    content:
      "Approved partners may discuss project-specific requirements. Feasibility, validation, lead time and commercial terms are assessed separately.",
  },
  {
    title: "How are project opportunities handled?",
    content:
      "Project collaboration may be available where appropriate. Registration, ownership and lead-handling are agreed through the regional partner process.",
  },
  {
    title: "Can international companies apply?",
    content:
      "Yes. Regional availability and programme readiness are considered during review and may vary by market.",
  },
  {
    title: "What happens after submitting the application?",
    content:
      "ONESPACE reviews the organisation, coverage, capabilities and strategic fit before deciding whether to request information or progress to a discussion. No response time is promised.",
  },
];
