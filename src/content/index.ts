import type {
  Accessory,
  AccessoryGroup,
  Product,
  ProductFamily,
  Project,
  Resource,
  Sector,
  Space,
} from "@/types/content";

const series = (...names: string[]) =>
  names.map((name) => ({
    name,
    slug: name.toLowerCase().replaceAll(" ", "-"),
  }));

const draftSeo = (title: string, description: string) => ({
  title,
  description,
  noIndex: true,
});
type FamilySeed = Pick<
  ProductFamily,
  "slug" | "title" | "summary" | "productTypes" | "series"
>;
const familyStatements: Record<string, string> = {
  "presentation-stations":
    "Use Presentation Stations when presenters need a reliable front-of-room position for controls, source devices, microphones, computers and hidden cable paths.",
  "display-stands":
    "Use Display Stands when a room needs a clean display position without depending on a simple wall mount or exposed equipment.",
  "mobile-av-carts":
    "Use Mobile AV Carts when displays, cameras and collaboration devices need to move between layouts, rooms or teaching modes.",
  "technology-credenzas":
    "Use Technology Credenzas when the room needs equipment storage that looks architectural, keeps hardware accessible and avoids visible cable clutter.",
  "collaboration-tables":
    "Use Collaboration Tables when meeting-room technology, participant devices and shared content need to be planned directly into the table.",
  "learning-furniture":
    "Use Learning Furniture when classrooms, labs and training rooms need flexible furniture with power, devices and teaching technology built in.",
  "interactive-kiosks":
    "Use Interactive Kiosks when a touchscreen or tablet needs a durable, branded and serviceable public-facing enclosure.",
  "room-control-scheduling":
    "Use Room Control & Scheduling products to place room controls and booking panels where people naturally enter, meet or present.",
  "av-equipment-enclosures":
    "Use AV Equipment Enclosures when hardware needs protection, ventilation, cable control and service access outside a traditional rack room.",
  "media-walls-space-dividers":
    "Use Media Walls & Space Dividers when display technology also needs to shape the room, divide space or support collaboration.",
  "technical-workstations":
    "Use Technical Workstations when operators need multiple screens, equipment access and a focused furniture layout for specialist work.",
};
const createFamily = (seed: FamilySeed): ProductFamily => ({
  ...seed,
  id: `family-${seed.slug}`,
  name: seed.title,
  shortDescription: seed.summary,
  longDescription: seed.summary,
  statement:
    familyStatements[seed.slug] ??
    `${seed.title} help project teams plan furniture around the technology, users and service access a room needs.`,
  heroMedia: null,
  thumbnailMedia: null,
  featuredProducts: [],
  supportedSpaces: [],
  supportedSectors: [],
  keyCapabilities: [],
  relatedFamilies: [],
  filterDefinitions: [],
  seo: draftSeo(seed.title, seed.summary),
  dataStatus: "placeholder",
});

const productFamilySeeds: FamilySeed[] = [
  {
    slug: "presentation-stations",
    title: "Presentation Stations",
    summary:
      "Presenter stations that bring room controls, AV equipment, power and cable routing into one organised furniture position.",
    productTypes: [
      "Lecterns",
      "Podiums",
      "Teaching stations",
      "Instructor desks",
      "Multimedia presentation desks",
      "Height-adjustable lecterns",
      "Accessible lecterns",
      "Compact presentation stations",
      "Wall-mounted presentation stations",
    ],
    series: series(
      "ARC",
      "ARC Pro",
      "LIFT",
      "LIFT Access",
      "PIVOT",
      "EDU Station",
    ),
  },
  {
    slug: "display-stands",
    title: "Display Stands",
    summary:
      "Freestanding and wall-supported display structures for cleaner screen, camera, speaker and device integration.",
    productTypes: [
      "Single-display stands",
      "Dual-display stands",
      "Large-format display stands",
      "Interactive-display stands",
      "Floor-to-wall display structures",
      "Video-conferencing stands",
    ],
    series: series("VISTA", "VISTA Duo", "VISTA XL", "FRAME", "FRAME Wall"),
  },
  {
    slug: "mobile-av-carts",
    title: "Mobile AV Carts",
    summary:
      "Mobile display and video-collaboration furniture for rooms that need shared technology to move with the activity.",
    productTypes: [
      "Single-display carts",
      "Dual-display carts",
      "Interactive-display carts",
      "Video-conferencing carts",
      "Classroom AV carts",
      "Mobile equipment carts",
    ],
    series: series("MOVE", "MOVE Pro", "MOVE Duo", "MOVE Edu", "MOVE XL"),
  },
  {
    slug: "technology-credenzas",
    title: "Technology Credenzas",
    summary:
      "Architectural credenzas that conceal AV and IT equipment while keeping ventilation, cabling and service access planned.",
    productTypes: [
      "AV credenzas",
      "Video-conferencing credenzas",
      "Display-support credenzas",
      "Rack-integrated credenzas",
      "Classroom credenzas",
      "Media cabinets",
    ],
    series: series(
      "NEXUS",
      "NEXUS Compact",
      "NEXUS Rack",
      "NEXUS Edu",
      "NEXUS Wall",
    ),
  },
  {
    slug: "collaboration-tables",
    title: "Collaboration Tables",
    summary:
      "Meeting and collaboration tables designed to integrate power, data, devices and shared room technology at the table.",
    productTypes: [
      "Boardroom tables",
      "Video-conference tables",
      "Huddle tables",
      "Collaboration tables",
      "Training tables",
      "Media-sharing tables",
      "Modular tables",
    ],
    series: series("FORUM", "CONVERGE", "HUDDLE", "LINK", "LINK Modular"),
  },
  {
    slug: "learning-furniture",
    title: "Learning Furniture",
    summary:
      "Teaching and learning furniture that supports demonstrations, student devices, group work and hybrid classroom technology.",
    productTypes: [
      "Teaching desks",
      "Instructor stations",
      "Demonstration desks",
      "Student collaboration tables",
      "Technology benches",
      "Hybrid-learning tables",
      "Flexible classroom furniture",
    ],
    series: series("EDU", "LEARN", "LAB", "FLEX", "FLEX Mobile"),
  },
  {
    slug: "interactive-kiosks",
    title: "Interactive Kiosks",
    summary:
      "Kiosk furniture for touchscreens, tablets and public interfaces used in wayfinding, booking, registration and self-service.",
    productTypes: [
      "Floor-standing kiosks",
      "Wall-mounted kiosks",
      "Tablet kiosks",
      "Touchscreen kiosks",
      "Registration kiosks",
      "Wayfinding kiosks",
      "Room-booking stands",
    ],
    series: series("TOUCH", "TOUCH Wall", "TOUCH Mini", "WAY", "CHECK"),
  },
  {
    slug: "room-control-scheduling",
    title: "Room Control & Scheduling",
    summary:
      "Mounts, stands and docks that give room controllers, scheduling panels and touch interfaces a clean physical location.",
    productTypes: [
      "Scheduler mounts",
      "Touch-controller stands",
      "Table-controller mounts",
      "Wall-controller enclosures",
      "Tablet docks",
      "Room-booking displays",
    ],
    series: series("PANEL", "PANEL Desk", "PANEL Wall", "SCHEDULE", "DOCK"),
  },
  {
    slug: "av-equipment-enclosures",
    title: "AV Equipment Enclosures",
    summary:
      "Secure equipment enclosures that organise AV, IT, control and computing hardware while supporting access and airflow.",
    productTypes: [
      "Rack cabinets",
      "Under-table racks",
      "Wall-mounted racks",
      "Mobile racks",
      "Codec enclosures",
      "Mini-PC enclosures",
      "Ventilated equipment cabinets",
    ],
    series: series(
      "CORE",
      "CORE Compact",
      "CORE Wall",
      "CORE Mobile",
      "CORE Rack",
    ),
  },
  {
    slug: "media-walls-space-dividers",
    title: "Media Walls & Space Dividers",
    summary:
      "Media walls and dividers that combine display support, collaboration surfaces and spatial separation in one structure.",
    productTypes: [
      "Display-integrated walls",
      "Mobile media walls",
      "Collaboration walls",
      "Acoustic dividers",
      "Portable partitions",
      "Video-conferencing walls",
    ],
    series: series(
      "MEDIAWALL",
      "MEDIAWALL Mobile",
      "BOUNDARY",
      "SHIFT",
      "FOCUS",
    ),
  },
  {
    slug: "technical-workstations",
    title: "Technical Workstations",
    summary:
      "Specialist workstations for monitoring, editing, production and analysis where equipment, screens and cables need order.",
    productTypes: [
      "Analyst desks",
      "Editing desks",
      "Monitoring desks",
      "Production desks",
      "Technical workstations",
      "Shared technology tables",
    ],
    series: series("ANALYST", "STUDIO", "MONITOR", "TECHDESK", "TECHDESK Pro"),
  },
];

export const productFamilies: ProductFamily[] =
  productFamilySeeds.map(createFamily);

export const accessoryGroups: AccessoryGroup[] = series(
  "Display Mounting",
  "Camera Mounting",
  "Soundbar Mounting",
  "Device Shelves",
  "Rack Integration",
  "Power",
  "Connectivity",
  "Cable Management",
  "Mobility",
  "Security",
  "Accessibility",
  "Equipment Cooling",
);

const seriesPositioning: Record<string, { summary: string; overview: string }> =
  {
    arc: {
      summary:
        "Compact presenter station for classrooms, meeting rooms and presentation spaces that need controls and AV equipment in one place.",
      overview:
        "A compact front-of-room station for presenters who need clear access to devices, controls and cable routing.",
    },
    "arc-pro": {
      summary:
        "Larger presenter station for rooms that need more equipment space, device access and room-control integration.",
      overview:
        "A wider presentation station for more complex teaching and meeting spaces.",
    },
    lift: {
      summary:
        "Height-adjustable presentation station for rooms where presenters need flexible working height and integrated technology.",
      overview:
        "A height-adjustable presenter position with room technology planned into the furniture.",
    },
    "lift-access": {
      summary:
        "Accessible height-adjustable station designed to support inclusive presenting, teaching and room-control use.",
      overview:
        "An accessible presenter station for projects where reach, height and usability are central requirements.",
    },
    pivot: {
      summary:
        "Presentation station for spaces that need a flexible presenter position and technology access from multiple directions.",
      overview:
        "A flexible station concept for changing presenter orientation and room layouts.",
    },
    "edu-station": {
      summary:
        "Instructor station for education spaces that need teaching technology, controls and equipment access in a single desk.",
      overview:
        "A teaching-focused station for classrooms, labs and learning environments.",
    },
    vista: {
      summary:
        "Single-display stand for rooms that need a clean freestanding display position with room for supporting devices.",
      overview:
        "A clean single-screen display structure for meeting, teaching and collaboration spaces.",
    },
    "vista-duo": {
      summary:
        "Dual-display stand for video meetings, training rooms and collaboration spaces that need two screens side by side.",
      overview:
        "A two-screen display structure for richer collaboration and presentation layouts.",
    },
    "vista-xl": {
      summary:
        "Large-format display stand for rooms that need a bigger screen presence and integrated equipment support.",
      overview:
        "A larger display-support format for high-impact meeting and presentation rooms.",
    },
    frame: {
      summary:
        "Floor-to-wall display structure for projects that need an architectural display feature with integrated routing.",
      overview:
        "An architectural display frame for rooms where the screen should feel built into the space.",
    },
    "frame-wall": {
      summary:
        "Wall-mounted display structure for cleaner screen, device and cable integration on existing walls.",
      overview:
        "A wall-based display solution that organises screen support and related devices.",
    },
    move: {
      summary:
        "Single-display mobile AV cart for flexible rooms, shared displays and simple collaboration setups.",
      overview:
        "A mobile display cart for moving shared technology where it is needed.",
    },
    "move-pro": {
      summary:
        "Mobile video-collaboration cart with space for display, camera, audio and supporting equipment.",
      overview:
        "A mobile collaboration platform for flexible teaching, training and meeting rooms.",
    },
    "move-duo": {
      summary:
        "Dual-display mobile cart for collaboration spaces that need two screens on a movable platform.",
      overview:
        "A mobile two-screen setup for richer meetings, monitoring or instruction.",
    },
    "move-edu": {
      summary:
        "Education-focused mobile cart for classrooms and training rooms using interactive or shared displays.",
      overview:
        "A classroom-ready mobile cart for teaching technology and flexible learning layouts.",
    },
    "move-xl": {
      summary:
        "Large mobile AV cart for bigger displays and rooms that need stronger visual presence.",
      overview:
        "A larger mobile display platform for training, events and collaborative rooms.",
    },
    nexus: {
      summary:
        "Technology credenza for hiding AV and IT hardware while keeping equipment accessible and ventilated.",
      overview:
        "An architectural credenza that keeps room technology organised and out of sight.",
    },
    "nexus-compact": {
      summary:
        "Compact technology credenza for smaller rooms that still need organised equipment storage.",
      overview:
        "A smaller credenza format for AV storage in rooms with limited space.",
    },
    "nexus-rack": {
      summary:
        "Rack-focused credenza for projects that need equipment bays inside furniture rather than exposed racks.",
      overview:
        "A furniture-led rack enclosure for room equipment and service access.",
    },
    "nexus-edu": {
      summary:
        "Classroom credenza for organising education technology, devices and supporting AV equipment.",
      overview:
        "A teaching-space credenza for storing and supporting classroom technology.",
    },
    "nexus-wall": {
      summary:
        "Wall-mounted credenza for keeping equipment organised where floor space is limited.",
      overview:
        "A wall-based equipment furniture solution for compact technology rooms.",
    },
    forum: {
      summary:
        "Boardroom and meeting table designed to integrate power, connectivity, AV equipment and cable routing.",
      overview:
        "A collaboration table for cleaner boardrooms and hybrid meeting spaces.",
    },
    converge: {
      summary:
        "Video-conference table shaped for meetings where camera sightlines, shared content and participant devices matter.",
      overview:
        "A meeting table format planned around hybrid collaboration technology.",
    },
    huddle: {
      summary:
        "Compact collaboration table for small meeting rooms, huddle spaces and quick team sessions.",
      overview:
        "A small-room table for focused collaboration and simple technology access.",
    },
    link: {
      summary:
        "Collaboration table for teamwork, training and device-supported group activity.",
      overview:
        "A flexible table for shared work, power access and room technology.",
    },
    "link-modular": {
      summary:
        "Modular collaboration table system for reconfigurable training, teamwork and meeting layouts.",
      overview: "A modular table format for rooms that change layout often.",
    },
    edu: {
      summary:
        "Teaching desk for instructors who need power, devices and presentation tools within reach.",
      overview: "A teaching-focused desk for classrooms and training spaces.",
    },
    learn: {
      summary:
        "Student collaboration table for group learning, device use and shared classroom activities.",
      overview:
        "A learning table for group work and technology-supported instruction.",
    },
    lab: {
      summary:
        "Technology bench for labs, demonstrations and hands-on learning environments.",
      overview:
        "A bench format for practical teaching and specialist classroom equipment.",
    },
    flex: {
      summary:
        "Flexible learning table for classrooms that need adaptable layouts and integrated power access.",
      overview:
        "A classroom table for changing teaching modes and group activities.",
    },
    "flex-mobile": {
      summary:
        "Mobile learning table for classrooms and training spaces that need quick layout changes.",
      overview: "A movable table format for flexible learning environments.",
    },
    touch: {
      summary:
        "Floor-standing touchscreen kiosk for self-service, information and public interaction points.",
      overview:
        "A freestanding kiosk enclosure for public-facing touch interfaces.",
    },
    "touch-wall": {
      summary:
        "Wall-mounted touchscreen kiosk for compact self-service or information points.",
      overview: "A wall-based kiosk for spaces where floor footprint matters.",
    },
    "touch-mini": {
      summary:
        "Compact tablet kiosk for check-in, sign-in, booking and simple interactive tasks.",
      overview:
        "A smaller tablet-based kiosk for lightweight public interactions.",
    },
    way: {
      summary:
        "Wayfinding kiosk for directories, maps and public navigation in campuses, offices and venues.",
      overview: "A tall kiosk format for wayfinding and information display.",
    },
    check: {
      summary:
        "Registration kiosk for visitor check-in, reception workflows and guided self-service.",
      overview:
        "A kiosk format for visitor registration and front-of-house workflows.",
    },
    panel: {
      summary:
        "Freestanding room-control stand for touch panels used near presenters, meeting tables or room entries.",
      overview: "A dedicated physical stand for room-control interfaces.",
    },
    "panel-desk": {
      summary:
        "Desk-mounted controller housing for meeting tables, lecterns and instructor positions.",
      overview:
        "A table-based control position for meeting and presentation rooms.",
    },
    "panel-wall": {
      summary:
        "Wall-mounted controller enclosure for clean room-control placement near doors or presentation zones.",
      overview: "A wall-based control-panel enclosure for room interfaces.",
    },
    schedule: {
      summary:
        "Room-scheduling panel enclosure for booking displays outside meeting rooms and shared spaces.",
      overview: "A scheduling display mount for room booking and availability.",
    },
    dock: {
      summary:
        "Tablet dock for shared control, booking or simple touchscreen interaction at a table or counter.",
      overview: "A compact tabletop dock for tablets and touch interfaces.",
    },
    core: {
      summary:
        "Equipment enclosure for securing AV, IT and control hardware while keeping cables and service access organised.",
      overview:
        "A secure enclosure for room technology and supporting hardware.",
    },
    "core-compact": {
      summary:
        "Compact equipment enclosure for small hardware sets, codecs, mini-PCs and local room devices.",
      overview: "A smaller enclosure for essential AV and IT equipment.",
    },
    "core-wall": {
      summary:
        "Wall-mounted equipment enclosure for hardware that needs to stay off the floor and close to room infrastructure.",
      overview: "A wall-based enclosure for compact equipment installations.",
    },
    "core-mobile": {
      summary:
        "Mobile equipment enclosure for hardware that needs to move with carts, training rooms or temporary setups.",
      overview: "A movable enclosure for AV and IT hardware.",
    },
    "core-rack": {
      summary:
        "Rack-style equipment enclosure for projects that need structured mounting, airflow and service access.",
      overview:
        "A rack-focused enclosure for organised equipment installations.",
    },
    mediawall: {
      summary:
        "Display-integrated wall product for rooms where media, furniture and architecture need to work together.",
      overview:
        "A media wall that makes display technology part of the room architecture.",
    },
    "mediawall-mobile": {
      summary:
        "Mobile media wall for flexible collaboration areas, training spaces and temporary presentation zones.",
      overview: "A movable display wall for spaces that change layout.",
    },
    boundary: {
      summary:
        "Space-divider system for creating zones while supporting collaboration and technology needs.",
      overview:
        "A divider product for shaping space without losing technology support.",
    },
    shift: {
      summary:
        "Mobile partition product for quickly changing room layouts and visual boundaries.",
      overview: "A movable divider for flexible spaces and temporary zones.",
    },
    focus: {
      summary:
        "Collaboration wall for focused teamwork areas that need shared display support and spatial definition.",
      overview:
        "A focused collaboration surface for teams and shared technology.",
    },
    analyst: {
      summary:
        "Technical workstation for analysts and operators working with multiple screens, devices and information sources.",
      overview:
        "A workstation for monitoring, analysis and specialist technology tasks.",
    },
    studio: {
      summary:
        "Technical workstation for editing, media production and studio environments.",
      overview:
        "A workstation for production teams that need equipment and display organisation.",
    },
    monitor: {
      summary:
        "Monitoring workstation for control, security, operations and continuous information review.",
      overview:
        "A workstation for rooms where people monitor information over long sessions.",
    },
    techdesk: {
      summary:
        "Technology desk for specialist work that needs devices, displays and cable routing in one furniture system.",
      overview: "A technical desk for focused equipment-heavy work.",
    },
    "techdesk-pro": {
      summary:
        "Advanced technical workstation for larger equipment sets, multi-display work and specialist operations.",
      overview:
        "A higher-capacity workstation for complex technical environments.",
    },
  };

export const products: Product[] = productFamilies.flatMap((family) =>
  family.series.map((item) => {
    const positioning = seriesPositioning[item.slug];
    const summary =
      positioning?.summary ??
      `${item.name} helps ${family.title.toLowerCase()} projects organise technology, furniture and service access in one planned product.`;
    return {
      id: `product-${item.slug}`,
      slug: item.slug,
      title: item.name,
      name: item.name,
      summary,
      family: family.slug,
      productFamily: family.id,
      series: item.name,
      model: null,
      descriptor: summary,
      overview:
        positioning?.overview ??
        `${item.name} gives project teams a clear starting point for ${family.title.toLowerCase()} requirements.`,
      useCases: [],
      heroMedia: null,
      gallery: [],
      featureStories: [],
      keyFeatures: [],
      technicalSpecifications: [],
      dimensions: null,
      equipmentCapacity: null,
      rackCapacity: null,
      displayCompatibility: [],
      vesaCompatibility: [],
      deviceCompatibility: [],
      cameraCompatibility: [],
      soundbarCompatibility: [],
      cableManagement: null,
      ventilation: null,
      cooling: null,
      serviceAccess: null,
      accessibility: null,
      mobility: null,
      heightAdjustment: null,
      powerAndData: null,
      finishes: [],
      variants: [],
      compatibleAccessories: [],
      supportedSpaces: [],
      supportedSectors: [],
      standards: [],
      certifications: [],
      sustainability: [],
      downloads: [],
      configurable: false,
      customisable: false,
      enquiryOnly: true,
      productStatus: "placeholder",
      seo: draftSeo(
        item.name,
        `${item.name} ${family.title.toLowerCase()} series.`,
      ),
      dataStatus: "placeholder",
      features: [],
    };
  }),
);

export const accessories: Accessory[] = accessoryGroups.map((group) => ({
  id: `accessory-${group.slug}`,
  slug: group.slug,
  title: group.name,
  name: group.name,
  summary: `${group.name} accessories help adapt TEVORA products to the equipment, room layout and user workflow of each project.`,
  group: group.slug,
  accessoryGroup: group.slug,
  series: null,
  model: null,
  descriptor: `${group.name} accessory group`,
  description: `${group.name} options help project teams solve practical integration needs such as mounting, access, routing, movement and serviceability. Final compatibility is confirmed during project review.`,
  heroMedia: null,
  gallery: [],
  specifications: [],
  compatibilityRules: [],
  compatibleProducts: [],
  requiredProducts: [],
  requiredAccessories: [],
  excludedAccessories: [],
  downloads: [],
  seo: draftSeo(group.name, `${group.name} accessories for TEVORA products.`),
  dataStatus: "placeholder",
}));

type SpaceSeed = { name: string; slug: string; group: string; summary: string };
const spaceGroupContent: Record<
  string,
  {
    primaryUsers: string[];
    activities: string[];
    technologyRequirements: string[];
    designPriorities: string[];
  }
> = {
  "Education Spaces": {
    primaryUsers: [
      "Educators",
      "Learners",
      "Education technology teams",
      "AV and IT support",
    ],
    activities: [
      "Teaching and presentation",
      "Demonstration",
      "Discussion and group learning",
      "Hybrid participation",
    ],
    technologyRequirements: [
      "Presentation displays",
      "Content input and control",
      "Camera and audio categories",
      "Power, data and cable pathways",
    ],
    designPriorities: [
      "Clear sightlines",
      "Inclusive user access",
      "Flexible teaching formats",
      "Safe service access",
    ],
  },
  "Corporate Spaces": {
    primaryUsers: [
      "Employees",
      "Meeting participants",
      "Presenters",
      "Workplace technology teams",
    ],
    activities: [
      "Meetings and presentation",
      "Video collaboration",
      "Teamwork and content sharing",
      "Training and briefing",
    ],
    technologyRequirements: [
      "Shared displays",
      "Video-collaboration equipment",
      "User connectivity and control",
      "Power, data and equipment access",
    ],
    designPriorities: [
      "Equitable participation",
      "Architectural coordination",
      "Flexible room use",
      "Maintainable technology",
    ],
  },
  "Specialist Spaces": {
    primaryUsers: [
      "Technical operators",
      "Specialist teams",
      "Supervisors",
      "AV, IT and facilities support",
    ],
    activities: [
      "Monitoring and analysis",
      "Technical production",
      "Operational coordination",
      "Specialist training and proceedings",
    ],
    technologyRequirements: [
      "User-facing displays and devices",
      "Equipment and rack accommodation",
      "Control interfaces",
      "Resilient cable, power and service routes",
    ],
    designPriorities: [
      "Operator focus",
      "Equipment access",
      "Information visibility",
      "Serviceability and future change",
    ],
  },
  "Public and Self-Service Spaces": {
    primaryUsers: [
      "Visitors",
      "Members of the public",
      "Front-of-house teams",
      "Facilities and service teams",
    ],
    activities: [
      "Registration and check-in",
      "Information access",
      "Wayfinding",
      "Room booking and self-service",
    ],
    technologyRequirements: [
      "Touch or display interfaces",
      "Device security",
      "Power and connectivity",
      "Service access",
    ],
    designPriorities: [
      "Clear interaction",
      "Inclusive reach and approach",
      "Durability",
      "Simple maintenance",
    ],
  },
};
const createSpace = (seed: SpaceSeed): Space => ({
  id: `space-${seed.slug}`,
  name: seed.name,
  slug: seed.slug,
  title: seed.name,
  summary: seed.summary,
  group: seed.group,
  description: `${seed.summary} Product selection and integration requirements are developed around the activities, users and technology in the space.`,
  primaryUsers: spaceGroupContent[seed.group]?.primaryUsers ?? [],
  activities: spaceGroupContent[seed.group]?.activities ?? [],
  designPriorities: spaceGroupContent[seed.group]?.designPriorities ?? [],
  technologyRequirements:
    spaceGroupContent[seed.group]?.technologyRequirements ?? [],
  recommendedFamilies: [],
  recommendedProducts: [],
  recommendedAccessories: [],
  relatedSectors: [],
  heroMedia: null,
  resources: [],
  seo: draftSeo(`${seed.name} — ${seed.group}`, seed.summary),
  dataStatus: "placeholder",
});
const spaceSeeds: SpaceSeed[] = [
  {
    name: "Lecture Theatre",
    slug: "lecture-theatre",
    group: "Education Spaces",
    summary:
      "Large teaching space for structured presentation, demonstration and audience engagement.",
  },
  {
    name: "Classroom",
    slug: "classroom",
    group: "Education Spaces",
    summary:
      "General teaching space supporting instruction, display and classroom collaboration.",
  },
  {
    name: "Seminar Room",
    slug: "seminar-room",
    group: "Education Spaces",
    summary:
      "Discussion-led learning space for smaller groups, presentation and shared content.",
  },
  {
    name: "Teaching Laboratory",
    slug: "teaching-laboratory",
    group: "Education Spaces",
    summary:
      "Specialist learning environment for practical teaching, demonstration and technical equipment.",
  },
  {
    name: "Training Room",
    slug: "education-training-room",
    group: "Education Spaces",
    summary:
      "Education-focused training space for instruction, practice and flexible learning formats.",
  },
  {
    name: "Library",
    slug: "library",
    group: "Education Spaces",
    summary:
      "Shared study environment supporting information access, collaboration and digital resources.",
  },
  {
    name: "Collaborative Learning Space",
    slug: "collaborative-learning-space",
    group: "Education Spaces",
    summary:
      "Flexible learning space for group work, content sharing and hybrid participation.",
  },
  {
    name: "Auditorium",
    slug: "auditorium",
    group: "Education Spaces",
    summary:
      "Large audience venue for presentation, performance, teaching and public communication.",
  },
  {
    name: "Faculty Presentation Room",
    slug: "faculty-presentation-room",
    group: "Education Spaces",
    summary:
      "Dedicated academic presentation space for teaching preparation, review and communication.",
  },
  {
    name: "Boardroom",
    slug: "boardroom",
    group: "Corporate Spaces",
    summary:
      "Formal decision-making space for executive meetings, presentation and video collaboration.",
  },
  {
    name: "Conference Room",
    slug: "conference-room",
    group: "Corporate Spaces",
    summary:
      "Meeting space for presentation, discussion and in-room or remote collaboration.",
  },
  {
    name: "Huddle Room",
    slug: "huddle-room",
    group: "Corporate Spaces",
    summary:
      "Compact meeting space for small-team discussion and video collaboration.",
  },
  {
    name: "Training Room",
    slug: "corporate-training-room",
    group: "Corporate Spaces",
    summary:
      "Workplace training space for instruction, workshops and flexible participation.",
  },
  {
    name: "Town Hall",
    slug: "town-hall",
    group: "Corporate Spaces",
    summary:
      "Organisation-wide communication space for presentations, broadcasts and audience engagement.",
  },
  {
    name: "Collaboration Space",
    slug: "collaboration-space",
    group: "Corporate Spaces",
    summary:
      "Flexible workplace setting for teamwork, content sharing and hybrid collaboration.",
  },
  {
    name: "Executive Briefing Centre",
    slug: "executive-briefing-centre",
    group: "Corporate Spaces",
    summary:
      "High-touch presentation and meeting environment for strategic customer and executive engagement.",
  },
  {
    name: "Innovation Lab",
    slug: "innovation-lab",
    group: "Corporate Spaces",
    summary:
      "Adaptable environment for ideation, demonstration, prototyping and collaborative work.",
  },
  {
    name: "Reception",
    slug: "reception",
    group: "Corporate Spaces",
    summary:
      "Front-of-house environment for welcome, information, registration and wayfinding.",
  },
  {
    name: "Control Room",
    slug: "control-room",
    group: "Specialist Spaces",
    summary:
      "Operational space for continuous monitoring, coordination and control.",
  },
  {
    name: "Command Centre",
    slug: "command-centre",
    group: "Specialist Spaces",
    summary:
      "Coordinated operational environment for decision-making, response and situational awareness.",
  },
  {
    name: "Security Operations Centre",
    slug: "security-operations-centre",
    group: "Specialist Spaces",
    summary:
      "Specialist environment for security monitoring, investigation and coordinated response.",
  },
  {
    name: "Network Operations Centre",
    slug: "network-operations-centre",
    group: "Specialist Spaces",
    summary:
      "Technical environment for network monitoring, analysis and service management.",
  },
  {
    name: "Broadcast Studio",
    slug: "broadcast-studio",
    group: "Specialist Spaces",
    summary:
      "Production environment for broadcast, recording, editing and media communication.",
  },
  {
    name: "Simulation Room",
    slug: "simulation-room",
    group: "Specialist Spaces",
    summary:
      "Immersive specialist space for training, rehearsal and scenario-based learning.",
  },
  {
    name: "Courtroom",
    slug: "courtroom",
    group: "Specialist Spaces",
    summary:
      "Formal civic environment for proceedings, evidence presentation and remote participation.",
  },
  {
    name: "Council Chamber",
    slug: "council-chamber",
    group: "Specialist Spaces",
    summary:
      "Public decision-making space for debate, presentation, voting and broadcasting.",
  },
  {
    name: "Emergency Operations Centre",
    slug: "emergency-operations-centre",
    group: "Specialist Spaces",
    summary:
      "Resilient coordination environment for incident management and multi-agency response.",
  },
  {
    name: "Visitor Registration",
    slug: "visitor-registration",
    group: "Public and Self-Service Spaces",
    summary:
      "Arrival point for visitor check-in, registration and access workflows.",
  },
  {
    name: "Wayfinding Point",
    slug: "wayfinding-point",
    group: "Public and Self-Service Spaces",
    summary:
      "Public information point supporting orientation and destination guidance.",
  },
  {
    name: "Digital Information Point",
    slug: "digital-information-point",
    group: "Public and Self-Service Spaces",
    summary:
      "Accessible public interface for digital information and service content.",
  },
  {
    name: "Self-Service Zone",
    slug: "self-service-zone",
    group: "Public and Self-Service Spaces",
    summary:
      "Dedicated area for independent transactions, information and service access.",
  },
  {
    name: "Room Scheduling Point",
    slug: "room-scheduling-point",
    group: "Public and Self-Service Spaces",
    summary:
      "Room-side interface for availability, booking and meeting-space orientation.",
  },
];
export const spaces: Space[] = spaceSeeds.map(createSpace);

type SectorSeed = { name: string; slug: string; summary: string };
const sectorChallenges: Record<string, string[]> = {
  "higher-education": [
    "Supporting different teaching formats",
    "Coordinating room technology across estates",
    "Providing maintainable access for support teams",
  ],
  schools: [
    "Balancing simple operation with flexible teaching",
    "Protecting and organising shared technology",
    "Supporting different classroom activities",
  ],
  corporate: [
    "Creating equitable hybrid meetings",
    "Coordinating furniture with workplace technology",
    "Planning for equipment change and service",
  ],
  government: [
    "Supporting formal communication and public participation",
    "Coordinating secure technology environments",
    "Maintaining dependable access and service",
  ],
  healthcare: [
    "Supporting clinical, teaching and administrative users",
    "Coordinating technology in varied room types",
    "Planning clear service and maintenance access",
  ],
  hospitality: [
    "Combining guest experience with event technology",
    "Supporting changing room uses",
    "Keeping equipment visually controlled",
  ],
  "public-spaces": [
    "Making digital services clear and approachable",
    "Protecting public-facing devices",
    "Providing inclusive physical access",
  ],
  "broadcast-media": [
    "Organising specialist production technology",
    "Supporting focused technical workflows",
    "Planning equipment access and cable routes",
  ],
  "control-command": [
    "Maintaining information visibility",
    "Supporting continuous specialist operation",
    "Coordinating equipment, access and future change",
  ],
  "training-centres": [
    "Supporting instruction, practice and assessment",
    "Changing between presentation and group formats",
    "Managing shared technology",
  ],
  "events-venues": [
    "Supporting different event formats",
    "Coordinating presentation and production equipment",
    "Planning rapid service access",
  ],
  "houses-of-worship": [
    "Supporting presentation, communication and media",
    "Integrating technology respectfully into the space",
    "Enabling operation by varied user teams",
  ],
};
const createSector = (seed: SectorSeed): Sector => ({
  id: `sector-${seed.slug}`,
  name: seed.name,
  slug: seed.slug,
  title: seed.name,
  summary: seed.summary,
  description: `${seed.summary} Recommendations remain project-specific and are coordinated with the relevant design and technology teams.`,
  challenges: sectorChallenges[seed.slug] ?? [],
  typicalSpaces: [],
  recommendedFamilies: [],
  recommendedProducts: [],
  projects: [],
  heroMedia: null,
  resources: [],
  seo: draftSeo(seed.name, seed.summary),
  dataStatus: "placeholder",
});
export const sectors: Sector[] = [
  {
    name: "Higher Education",
    slug: "higher-education",
    summary:
      "Technology-furniture applications for universities and other tertiary learning environments.",
  },
  {
    name: "Schools",
    slug: "schools",
    summary:
      "Technology-furniture applications for primary and secondary education.",
  },
  {
    name: "Corporate",
    slug: "corporate",
    summary:
      "Technology-furniture applications for workplaces, meetings and organisational communication.",
  },
  {
    name: "Government",
    slug: "government",
    summary:
      "Technology-furniture applications for civic, administrative and public-service environments.",
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    summary:
      "Technology-furniture applications for clinical, administrative, teaching and communication spaces.",
  },
  {
    name: "Hospitality",
    slug: "hospitality",
    summary:
      "Technology-furniture applications for guest, conference, event and service environments.",
  },
  {
    name: "Public Spaces",
    slug: "public-spaces",
    summary:
      "Technology-furniture applications for information, wayfinding and self-service in shared environments.",
  },
  {
    name: "Broadcast & Media",
    slug: "broadcast-media",
    summary:
      "Technology-furniture applications for production, editing, monitoring and media communication.",
  },
  {
    name: "Control & Command",
    slug: "control-command",
    summary:
      "Specialist technology furniture for operational monitoring, coordination and command environments.",
  },
  {
    name: "Training Centres",
    slug: "training-centres",
    summary:
      "Technology-furniture applications for professional instruction, rehearsal and skills development.",
  },
  {
    name: "Events & Venues",
    slug: "events-venues",
    summary:
      "Technology-furniture applications for presentation, production and audience-facing venues.",
  },
  {
    name: "Houses of Worship",
    slug: "houses-of-worship",
    summary:
      "Technology-furniture applications for worship, community communication and media production.",
  },
].map(createSector);
export const projects: Project[] = [
  {
    id: "project-example",
    slug: "example-project",
    title: "Example Project",
    summary: "Project content placeholder.",
    projectName: "Placeholder Project",
    clientDisplayName: null,
    location: null,
    projectType: null,
    sector: "sector-corporate",
    spaces: ["space-boardroom"],
    challenge: "Placeholder content — no client or project claim.",
    approach: "Placeholder content — approach to be confirmed.",
    technologyRequirements: [],
    productsUsed: ["product-forum"],
    accessoriesUsed: [],
    outcomes: [],
    gallery: [],
    testimonial: null,
    completionDate: null,
    seo: draftSeo("Unpublished Project", "Unpublished project record."),
    dataStatus: "placeholder",
  },
];

/** Records approved for public project storytelling. */
export const publishedProjects = projects.filter(
  (project) => project.dataStatus === "verified",
);
const resourceSeeds: Array<{
  title: string;
  slug: string;
  resourceType: Resource["resourceType"];
  fileFormat: string;
  accessLevel?: Resource["accessLevel"];
  productFamily?: string;
  product?: string;
  sectors?: string[];
  spaces?: string[];
}> = [
  {
    title: "Presentation Stations Overview Brochure",
    slug: "product-brochure",
    resourceType: "product-brochure",
    fileFormat: "PDF",
    productFamily: "family-presentation-stations",
    sectors: ["sector-higher-education", "sector-corporate"],
    spaces: ["space-lecture-theatre", "space-boardroom"],
  },
  {
    title: "ARC Product Data Sheet",
    slug: "product-data-sheet",
    resourceType: "product-data-sheet",
    fileFormat: "PDF",
    productFamily: "family-presentation-stations",
    product: "product-arc",
  },
  {
    title: "Technology Credenza Specification Template",
    slug: "technical-specification",
    resourceType: "technical-specification",
    fileFormat: "PDF",
    accessLevel: "registered",
    productFamily: "family-technology-credenzas",
    product: "product-nexus",
  },
  {
    title: "VISTA Display Stand CAD Drawing",
    slug: "cad-drawing",
    resourceType: "cad",
    fileFormat: "DWG",
    accessLevel: "registered",
    productFamily: "family-display-stands",
    product: "product-vista",
  },
  {
    title: "ARC Presentation Station BIM Object",
    slug: "bim-object",
    resourceType: "bim",
    fileFormat: "BIM",
    accessLevel: "registered",
    productFamily: "family-presentation-stations",
    product: "product-arc",
  },
  {
    title: "FORUM Collaboration Table Revit Family",
    slug: "revit-family",
    resourceType: "revit",
    fileFormat: "RVT",
    accessLevel: "registered",
    productFamily: "family-collaboration-tables",
    product: "product-forum",
  },
  {
    title: "MOVE Pro STEP Model",
    slug: "step-model",
    resourceType: "step",
    fileFormat: "STEP",
    accessLevel: "registered",
    productFamily: "family-mobile-av-carts",
    product: "product-move-pro",
  },
  {
    title: "Mobile AV Cart Installation Guide",
    slug: "installation-guide",
    resourceType: "installation-guide",
    fileFormat: "PDF",
    productFamily: "family-mobile-av-carts",
  },
  {
    title: "TEVORA Finish Card",
    slug: "finish-card",
    resourceType: "finish-card",
    fileFormat: "PDF",
  },
  {
    title: "Materials and Sustainability Information",
    slug: "sustainability-document",
    resourceType: "sustainability-document",
    fileFormat: "PDF",
  },
  {
    title: "Product Certification Register",
    slug: "certification-document",
    resourceType: "certification",
    fileFormat: "PDF",
    accessLevel: "restricted",
  },
  {
    title: "Technology Furniture Planning Guide",
    slug: "planning-guide",
    resourceType: "planning-guide",
    fileFormat: "PDF",
    sectors: ["sector-higher-education", "sector-corporate"],
    spaces: ["space-classroom", "space-conference-room"],
  },
  {
    title: "Technology Furniture Product Introduction",
    slug: "product-video",
    resourceType: "video",
    fileFormat: "MP4",
  },
  {
    title: "Product Image Library",
    slug: "product-image",
    resourceType: "product-image",
    fileFormat: "JPG",
  },
];

export const resources: Resource[] = resourceSeeds.map((seed) => ({
  id: `resource-${seed.slug}`,
  slug: seed.slug,
  title: `${seed.title} — Placeholder`,
  summary: `Placeholder ${seed.title.toLowerCase()} record. No verified file is currently published.`,
  kind: seed.resourceType === "planning-guide" ? "guide" : "download",
  resourceType: seed.resourceType,
  productFamily: seed.productFamily ?? null,
  product: seed.product ?? null,
  accessory: null,
  sectors: seed.sectors ?? [],
  spaces: seed.spaces ?? [],
  file: null,
  fileFormat: seed.fileFormat,
  fileSize: null,
  revision: null,
  language: "en",
  lastUpdated: null,
  accessLevel: seed.accessLevel ?? "public",
  seo: draftSeo(seed.title, `${seed.title} resource record.`),
  dataStatus: "placeholder",
}));

/** Resources with verified metadata and a real downloadable file. */
export const publishedResources = resources.filter(
  (resource) => resource.dataStatus === "verified" && resource.file,
);
