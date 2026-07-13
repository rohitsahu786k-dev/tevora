import type { Product } from "@/types/content";
import { productConceptMediaBySlug } from "@/content/media";

export interface ProductFeatureStory {
  title: string;
  explanation: string;
  topic: string;
  technicalNote?: string;
  media: string;
}
export interface ProductDetailContent {
  introduction: string;
  users: string;
  technology: string;
  problem: string;
  heroMedia: string;
  heroAlt: string;
  featureStories: ProductFeatureStory[];
}
const environment = "/media/home/technology-learning-hero.png";
const mobile = "/media/home/mobile-av-cart-story.png";
const moveProConcept =
  "/media/products/mobile-av-carts/move-pro-mobile-av-cart-concept.png";
const arcConcept = "/media/products/presentation-stations/arc-concept.png";
const forumConcept =
  "/media/products/collaboration-tables/forum-boardroom-table-concept.png";
const vistaConcept =
  "/media/products/display-stands/vista-single-display-stand-concept.png";
const nexusConcept =
  "/media/products/technology-credenzas/nexus-technology-credenza-concept.png";
const familyRepresentativeProduct: Record<string, string> = {
  "presentation-stations": "arc",
  "display-stands": "vista",
  "mobile-av-carts": "move",
  "technology-credenzas": "nexus",
  "collaboration-tables": "forum",
  "learning-furniture": "edu",
  "interactive-kiosks": "touch",
  "room-control-scheduling": "panel",
  "av-equipment-enclosures": "core",
  "media-walls-space-dividers": "mediawall",
  "technical-workstations": "analyst",
};
const details: Record<string, ProductDetailContent> = {
  arc: {
    introduction:
      "ARC is a presentation-station series for teaching, presenting and controlling room technology from a coordinated furniture position.",
    users:
      "Intended for educators, presenters and room operators working in teaching and presentation spaces.",
    technology:
      "The product architecture is intended to organise presentation, control and connected AV equipment; product-level equipment support remains subject to verification.",
    problem:
      "ARC provides a defined physical location for the presenter, user controls and supporting technology while keeping project infrastructure organised.",
    heroMedia: arcConcept,
    heroAlt:
      "Representative concept render of a compact graphite and light-oak ARC presentation station",
    featureStories: [
      {
        title: "Presentation technology at the point of use",
        topic: "Display integration",
        explanation:
          "The station establishes a clear presenter position in relation to the room display and audience.",
        technicalNote:
          "Display and control compatibility must be confirmed for each project.",
        media: arcConcept,
      },
      {
        title: "Equipment access",
        topic: "Serviceability",
        explanation:
          "The furniture concept considers how installed devices can be reached during integration and service.",
        media: arcConcept,
      },
      {
        title: "Cable routing",
        topic: "Cable management",
        explanation:
          "Planned pathways support an orderly transition between user devices, installed equipment and room infrastructure.",
        media: arcConcept,
      },
    ],
  },
  "move-pro": {
    introduction:
      "MOVE Pro is a mobile AV-cart series for flexible teaching, training, meeting and collaboration environments.",
    users:
      "Intended for education teams, workplace users and AV teams that need technology to move between positions or rooms.",
    technology:
      "The product format is intended to bring display, camera, audio and connected-device categories together on a mobile furniture structure.",
    problem:
      "MOVE Pro provides a coordinated mobile location for shared display and collaboration technology in spaces that cannot rely on one fixed installation.",
    heroMedia: moveProConcept,
    heroAlt:
      "Representative concept render of a graphite MOVE Pro video-collaboration cart with an oak shelf and ventilated equipment enclosure",
    featureStories: [
      {
        title: "Technology that moves with the room",
        topic: "Mobility",
        explanation:
          "A mobile furniture format allows shared technology to be repositioned as the space changes.",
        technicalNote:
          "Mobility configuration and installed equipment must be verified before use.",
        media: moveProConcept,
      },
      {
        title: "Camera and soundbar positions",
        topic: "AV integration",
        explanation:
          "The product architecture anticipates coordinated locations for collaboration peripherals around the display.",
        media: moveProConcept,
      },
      {
        title: "Contained equipment",
        topic: "Equipment access",
        explanation:
          "Supporting devices can be organised within the furniture footprint rather than distributed around the room.",
        media: moveProConcept,
      },
    ],
  },
  nexus: {
    introduction:
      "NEXUS is a technology-credenza series for concealing, organising and supporting AV, IT and video-collaboration equipment.",
    users:
      "Intended for project teams creating boardrooms, meeting rooms and presentation spaces with an architectural furniture requirement.",
    technology:
      "The credenza format is intended to coordinate equipment, display support, power, data and service access behind a calm architectural exterior.",
    problem:
      "NEXUS provides a furniture-led alternative to dispersed equipment storage while preserving an intentional room appearance.",
    heroMedia: nexusConcept,
    heroAlt:
      "Representative concept render of a long graphite and light-oak NEXUS technology credenza with four equipment bays",
    featureStories: [
      {
        title: "Equipment behind the architecture",
        topic: "Equipment housing",
        explanation:
          "The credenza format creates a defined zone for technology without allowing equipment to dominate the room.",
        media: nexusConcept,
      },
      {
        title: "Service access",
        topic: "Serviceability",
        explanation:
          "Access requirements are considered as part of the furniture arrangement for installation and ongoing support.",
        media: nexusConcept,
      },
      {
        title: "Ventilation planning",
        topic: "Ventilation",
        explanation:
          "Equipment heat and airflow requirements form part of project-level configuration and verification.",
        technicalNote:
          "Cooling requirements depend on the verified equipment schedule.",
        media: nexusConcept,
      },
    ],
  },
  vista: {
    introduction:
      "VISTA is a display-stand series for supporting display-led presentation and collaboration environments.",
    users:
      "Intended for meeting, education and shared spaces that require a freestanding display position.",
    technology:
      "The stand format is intended to coordinate the display with camera, audio and device-support categories.",
    problem:
      "VISTA creates a deliberate furniture structure for display technology where a wall-mounted installation is not appropriate.",
    heroMedia: vistaConcept,
    heroAlt:
      "Representative concept render of a fixed graphite VISTA single-display stand with an oak equipment shelf",
    featureStories: [
      {
        title: "Display-led architecture",
        topic: "Display integration",
        explanation:
          "The stand establishes the display as a considered part of the room rather than a separate equipment installation.",
        media: vistaConcept,
      },
      {
        title: "Collaboration peripherals",
        topic: "Camera and soundbar integration",
        explanation:
          "Related camera and audio positions can be considered around the central display arrangement.",
        media: vistaConcept,
      },
      {
        title: "Infrastructure routing",
        topic: "Cable management",
        explanation:
          "The furniture structure provides a route between mounted technology, supporting devices and room services.",
        media: vistaConcept,
      },
    ],
  },
  forum: {
    introduction:
      "FORUM is a collaboration-table series for hybrid meetings, boardrooms and technology-enabled group work.",
    users:
      "Intended for meeting participants, project teams and organisations combining in-room and remote collaboration.",
    technology:
      "The table format is intended to coordinate user connectivity, shared technology and room infrastructure at the meeting position.",
    problem:
      "FORUM brings people, devices and shared room technology into one planned collaboration setting.",
    heroMedia: forumConcept,
    heroAlt:
      "Representative concept render of a long graphite and light-oak FORUM technology-integrated boardroom table",
    featureStories: [
      {
        title: "Technology at the table",
        topic: "Power and connectivity",
        explanation:
          "The table creates an organised point for participant devices and shared meeting technology.",
        technicalNote:
          "Power and connectivity modules are selected during project configuration.",
        media: forumConcept,
      },
      {
        title: "Shared content",
        topic: "Display integration",
        explanation:
          "Furniture orientation and room technology can be considered together for equitable viewing and participation.",
        media: forumConcept,
      },
      {
        title: "Modular planning",
        topic: "Modular accessories",
        explanation:
          "The series framework prepares the table for different room formats and accessory categories.",
        media: forumConcept,
      },
    ],
  },
  "techdesk-pro": {
    introduction:
      "TECHDESK Pro is a technical-workstation series for monitoring, editing, analysing and specialist technology tasks.",
    users:
      "Intended for technical operators, analysts, editors and production teams working with multiple devices and information sources.",
    technology:
      "The workstation format is intended to organise user equipment, supporting hardware, cable routes and service requirements.",
    problem:
      "TECHDESK Pro creates a defined technical working position without presenting TEVORA as a control-room-only brand.",
    heroMedia: environment,
    heroAlt:
      "Refined technical furniture in a contemporary technology workspace",
    featureStories: [
      {
        title: "A structured technical position",
        topic: "Equipment integration",
        explanation:
          "The workstation organises user-facing technology and supporting devices around a focused working position.",
        media: environment,
      },
      {
        title: "Equipment and cable access",
        topic: "Serviceability",
        explanation:
          "Routing and access zones can be planned around the verified device schedule.",
        media: environment,
      },
      {
        title: "Adaptable accessories",
        topic: "Modular accessories",
        explanation:
          "Accessory categories extend the workstation for different user devices and project infrastructure.",
        media: environment,
      },
    ],
  },
};
export function getProductDetailContent(
  product: Product,
): ProductDetailContent {
  const concept = productConceptMediaBySlug[product.slug];
  const conceptImage = concept?.kind === "image" ? concept : null;
  const familyConcept =
    productConceptMediaBySlug[familyRepresentativeProduct[product.family]];
  const familyConceptImage =
    familyConcept?.kind === "image" ? familyConcept : null;
  const representativeMedia =
    conceptImage?.src ??
    familyConceptImage?.src ??
    (product.family === "mobile-av-carts" ? mobile : environment);
  const representativeAlt =
    conceptImage?.alt ??
    familyConceptImage?.alt ??
    `Representative technology-enabled environment for the ${product.name} series`;
  const editorialDetail = details[product.slug];

  if (editorialDetail) {
    return {
      ...editorialDetail,
      heroMedia: representativeMedia,
      heroAlt: representativeAlt,
    };
  }

  return {
    introduction: `${product.name} is a ${product.descriptor.toLowerCase()}. Detailed product information is being prepared for verification.`,
    users:
      "Intended users and applications will be confirmed with verified product content.",
    technology:
      "Supported technology categories and compatibility will be published following product verification.",
    problem:
      "The product problem statement is pending editorial and engineering verification.",
    heroMedia: representativeMedia,
    heroAlt: representativeAlt,
    featureStories: [
      {
        title: "Technology integration",
        topic: "Product development",
        explanation:
          "Product-specific integration details are pending verified engineering content.",
        media: representativeMedia,
      },
      {
        title: "Equipment access",
        topic: "Serviceability",
        explanation:
          "Product-specific access information is pending verified engineering content.",
        media: representativeMedia,
      },
      {
        title: "Modular accessories",
        topic: "Configuration",
        explanation:
          "Compatible accessory selections will be published after configuration validation.",
        media: representativeMedia,
      },
    ],
  };
}
export const representativeProductSlugs = Object.keys(details);
