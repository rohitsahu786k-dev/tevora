import type {
  AspectRatioName,
  ImageFormat,
  MediaAsset,
  MediaCategory,
  ModelFormat,
  VideoFormat,
} from "@/types/media";

export const aspectRatios: Record<
  AspectRatioName,
  { width: number; height: number; ratio: number }
> = {
  "homepage-hero": { width: 16, height: 9, ratio: 16 / 9 },
  "product-family-hero": { width: 16, height: 9, ratio: 16 / 9 },
  "product-hero": { width: 4, height: 3, ratio: 4 / 3 },
  "product-tile": { width: 4, height: 3, ratio: 4 / 3 },
  "editorial-feature": { width: 3, height: 2, ratio: 3 / 2 },
  "portrait-story": { width: 4, height: 5, ratio: 4 / 5 },
  "finish-swatch": { width: 1, height: 1, ratio: 1 },
  "mobile-hero": { width: 4, height: 5, ratio: 4 / 5 },
};
export const mediaCategories: MediaCategory[] = [
  "product-cutout",
  "product-hero",
  "product-detail",
  "product-environment",
  "product-family-hero",
  "space-hero",
  "sector-hero",
  "project-media",
  "finish-swatch",
  "technical-diagram",
  "video",
  "360-sequence",
  "3d-poster",
];
export const supportedMediaFormats: {
  images: ImageFormat[];
  video: VideoFormat[];
  models: ModelFormat[];
} = {
  images: ["png", "jpg", "jpeg", "webp", "avif"],
  video: ["mp4", "webm"],
  models: ["glb", "usdz"],
};
const blur =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSIzMCI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZTVlNWUxIi8+PC9zdmc+";

function accessoryConcept(
  id: string,
  filename: string,
  alt: string,
): MediaAsset {
  return {
    id,
    category: "product-detail",
    kind: "image",
    src: `/media/accessories/${filename}`,
    alt,
    width: 1536,
    height: 1024,
    aspectRatio: "product-tile",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Accessory concept for planning product fit and integration details.",
    credit: "TEVORA concept visualisation",
  };
}

function presentationStationImage(
  id: string,
  filename: string,
  alt: string,
  width: number,
  height: number,
): MediaAsset {
  return {
    id,
    category: "product-detail",
    kind: "image",
    src: `/media/products/presentation-stations/${filename}`,
    alt,
    width,
    height,
    aspectRatio: "product-tile",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Product concept view for discussing form, equipment integration and project fit.",
    credit: "TEVORA concept visualisation",
  };
}

function learningFurnitureImage(
  id: string,
  filename: string,
  alt: string,
): MediaAsset {
  return {
    id,
    category: "product-detail",
    kind: "image",
    src: `/media/products/learning-furniture/${filename}`,
    alt,
    width: 1402,
    height: 1122,
    aspectRatio: "product-tile",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Product concept view for discussing form, equipment integration and project fit.",
    credit: "TEVORA concept visualisation",
  };
}

function displayStandImage(
  id: string,
  filename: string,
  alt: string,
  width = 1402,
  height = 1122,
): MediaAsset {
  return {
    id,
    category: "product-detail",
    kind: "image",
    src: `/media/products/display-stands/${filename}`,
    alt,
    width,
    height,
    aspectRatio: "product-tile",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Product concept view for discussing form, equipment integration and project fit.",
    credit: "TEVORA concept visualisation",
  };
}

function mobileAvCartImage(
  id: string,
  filename: string,
  alt: string,
): MediaAsset {
  return {
    id,
    category: "product-detail",
    kind: "image",
    src: `/media/products/mobile-av-carts/${filename}`,
    alt,
    width: 1122,
    height: 1402,
    aspectRatio: "product-tile",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Product concept view for discussing form, equipment integration and project fit.",
    credit: "TEVORA concept visualisation",
  };
}

function mediaWallImage(id: string, filename: string, alt: string): MediaAsset {
  return {
    id,
    category: "product-detail",
    kind: "image",
    src: `/media/products/media-walls-space-dividers/${filename}`,
    alt,
    width: 1402,
    height: 1122,
    aspectRatio: "product-tile",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Product concept view for discussing form, equipment integration and project fit.",
    credit: "TEVORA concept visualisation",
  };
}

function collaborationTableImage(
  id: string,
  filename: string,
  alt: string,
  width = 1402,
  height = 1122,
): MediaAsset {
  return {
    id,
    category: "product-detail",
    kind: "image",
    src: `/media/products/collaboration-tables/${filename}`,
    alt,
    width,
    height,
    aspectRatio: "product-tile",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Product concept view for discussing form, equipment integration and project fit.",
    credit: "TEVORA concept visualisation",
  };
}

function technicalWorkstationImage(
  id: string,
  filename: string,
  alt: string,
): MediaAsset {
  return {
    id,
    category: "product-detail",
    kind: "image",
    src: `/media/products/technical-workstations/${filename}`,
    alt,
    width: 1536,
    height: 1024,
    aspectRatio: "product-tile",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Product concept view for discussing form, equipment integration and project fit.",
    credit: "TEVORA concept visualisation",
  };
}

function technologyCredenzaImage(
  id: string,
  filename: string,
  alt: string,
): MediaAsset {
  return {
    id,
    category: "product-detail",
    kind: "image",
    src: `/media/products/technology-credenzas/${filename}`,
    alt,
    width: 1536,
    height: 1024,
    aspectRatio: "product-tile",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Product concept view for discussing form, equipment integration and project fit.",
    credit: "TEVORA concept visualisation",
  };
}

function avEquipmentEnclosureImage(
  id: string,
  filename: string,
  alt: string,
  width = 1536,
  height = 1024,
): MediaAsset {
  return {
    id,
    category: "product-detail",
    kind: "image",
    src: `/media/products/av-equipment-enclosures/${filename}`,
    alt,
    width,
    height,
    aspectRatio: "product-tile",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Product concept view for discussing form, equipment integration and project fit.",
    credit: "TEVORA concept visualisation",
  };
}

function roomControlImage(
  id: string,
  filename: string,
  alt: string,
  width: number,
  height: number,
): MediaAsset {
  return {
    id,
    category: "product-detail",
    kind: "image",
    src: `/media/products/room-control-scheduling/${filename}`,
    alt,
    width,
    height,
    aspectRatio: "product-tile",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Product concept view for discussing form, equipment integration and project fit.",
    credit: "TEVORA concept visualisation",
  };
}

function interactiveKioskImage(
  id: string,
  filename: string,
  alt: string,
  width: number,
  height: number,
): MediaAsset {
  return {
    id,
    category: "product-detail",
    kind: "image",
    src: `/media/products/interactive-kiosks/${filename}`,
    alt,
    width,
    height,
    aspectRatio: "product-tile",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Product concept view for discussing form, equipment integration and project fit.",
    credit: "TEVORA concept visualisation",
  };
}

export const mediaAssets = {
  homepageHero: {
    id: "homepage-learning-hero",
    category: "space-hero",
    kind: "image",
    src: "/media/home/technology-learning-hero.png",
    alt: "Technology-enabled university collaboration space with an integrated presentation station, display and flexible learning furniture",
    width: 1672,
    height: 941,
    aspectRatio: "homepage-hero",
    focalPoint: { x: 0.62, y: 0.5 },
    mobileFocalPoint: { x: 0.66, y: 0.5 },
    blurDataURL: blur,
    caption: "Technology-enabled learning environment.",
    credit: "TEVORA",
  },
  educationSpaceEnvironment: {
    id: "education-technology-space-environment",
    category: "space-hero",
    kind: "image",
    src: "/media/spaces/education-technology-space.png",
    alt: "Modern education technology space with presentation station, display stand, mobile AV cart, learning furniture and AV enclosure",
    width: 1586,
    height: 992,
    aspectRatio: "homepage-hero",
    focalPoint: { x: 0.5, y: 0.52 },
    mobileFocalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Education technology space with integrated TEVORA product families.",
    credit: "Generated TEVORA application visual",
  },
  corporateSpaceEnvironment: {
    id: "corporate-meeting-space-environment",
    category: "space-hero",
    kind: "image",
    src: "/media/spaces/corporate-meeting-space.png",
    alt: "Modern corporate meeting room with collaboration table, display, technology credenza, room control panel and AV enclosure",
    width: 1586,
    height: 992,
    aspectRatio: "homepage-hero",
    focalPoint: { x: 0.54, y: 0.5 },
    mobileFocalPoint: { x: 0.58, y: 0.5 },
    blurDataURL: blur,
    caption: "Corporate meeting space with integrated TEVORA product families.",
    credit: "Generated TEVORA application visual",
  },
  specialistSpaceEnvironment: {
    id: "specialist-operations-space-environment",
    category: "space-hero",
    kind: "image",
    src: "/media/spaces/specialist-operations-space.png",
    alt: "Specialist operations room with technical workstations, media wall, technology credenza, AV racks and acoustic dividers",
    width: 1586,
    height: 992,
    aspectRatio: "homepage-hero",
    focalPoint: { x: 0.55, y: 0.5 },
    mobileFocalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Specialist operations space with integrated TEVORA product families.",
    credit: "Generated TEVORA application visual",
  },
  publicSelfServiceSpaceEnvironment: {
    id: "public-self-service-space-environment",
    category: "space-hero",
    kind: "image",
    src: "/media/spaces/public-self-service-space.png",
    alt: "Premium public self-service area with interactive kiosk, wayfinding display, scheduling panel and AV equipment enclosure",
    width: 1586,
    height: 992,
    aspectRatio: "homepage-hero",
    focalPoint: { x: 0.52, y: 0.5 },
    mobileFocalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption:
      "Public self-service space with integrated TEVORA product families.",
    credit: "Generated TEVORA application visual",
  },
  mobileAvStory: {
    id: "mobile-av-cart-story",
    category: "product-environment",
    kind: "image",
    src: "/media/home/mobile-av-cart-story.png",
    alt: "Graphite mobile AV cart with integrated display, camera and soundbar in a flexible teaching space",
    width: 1448,
    height: 1086,
    aspectRatio: "product-hero",
    focalPoint: { x: 0.5, y: 0.5 },
    blurDataURL: blur,
    caption: "Mobile AV furniture application.",
    credit: "TEVORA",
  },
  arcConcept: presentationStationImage(
    "arc-presentation-station-concept",
    "ARC.png",
    "Concept render of a compact ARC presentation station",
    1122,
    1402,
  ),
  arcProConcept: presentationStationImage(
    "arc-pro-presentation-station-concept",
    "ARC pro.png",
    "Concept render of a wide ARC Pro multimedia presentation station",
    1122,
    1402,
  ),
  liftConcept: presentationStationImage(
    "lift-presentation-station-concept",
    "LIFT.png",
    "Concept render of a height-adjustable LIFT presentation station",
    1122,
    1402,
  ),
  liftAccessConcept: presentationStationImage(
    "lift-access-presentation-station-concept",
    "LIFT Access.png",
    "Concept render of an accessible height-adjustable LIFT Access presentation station",
    1122,
    1402,
  ),
  pivotConcept: presentationStationImage(
    "pivot-presentation-station-concept",
    "PIVOT.png",
    "Concept render of a PIVOT presentation station",
    1402,
    1122,
  ),
  eduStationConcept: presentationStationImage(
    "edu-instructor-station-concept",
    "EDU Station.png",
    "Concept render of an EDU multimedia instructor station",
    1402,
    1122,
  ),
  eduTeachingDeskConcept: learningFurnitureImage(
    "edu-teaching-desk-concept",
    "EDU.png",
    "Concept render of an EDU technology-ready teaching desk",
  ),
  learnCollaborationTableConcept: learningFurnitureImage(
    "learn-collaboration-table-concept",
    "LEARN.png",
    "Concept render of a LEARN collaboration table",
  ),
  labTechnologyBenchConcept: learningFurnitureImage(
    "lab-technology-bench-concept",
    "LAB.png",
    "Concept render of a LAB technology teaching bench",
  ),
  flexLearningTableConcept: learningFurnitureImage(
    "flex-learning-table-concept",
    "FLEX.png",
    "Concept render of a FLEX learning table",
  ),
  flexMobileConcept: learningFurnitureImage(
    "flex-mobile-learning-table-concept",
    "FLEX Mobile.png",
    "Concept render of a mobile FLEX learning table",
  ),
  moveCartConcept: mobileAvCartImage(
    "move-mobile-av-cart-concept",
    "MOVE.png",
    "Concept render of a compact MOVE single-display mobile AV cart",
  ),
  moveProCartConcept: mobileAvCartImage(
    "move-pro-mobile-av-cart-concept",
    "MOVE Pro.png",
    "Concept render of a MOVE Pro video-collaboration cart",
  ),
  moveDuoCartConcept: mobileAvCartImage(
    "move-duo-mobile-av-cart-concept",
    "MOVE Duo.png",
    "Concept render of a MOVE Duo dual-display mobile AV cart",
  ),
  moveEduCartConcept: mobileAvCartImage(
    "move-edu-mobile-av-cart-concept",
    "MOVE EDU.png",
    "Concept render of a MOVE Edu interactive-display cart",
  ),
  moveXlCartConcept: mobileAvCartImage(
    "move-xl-mobile-av-cart-concept",
    "MOVE XL.png",
    "Concept render of a large-format MOVE XL mobile AV cart",
  ),
  nexusCredenzaConcept: technologyCredenzaImage(
    "nexus-technology-credenza-concept",
    "NEXUS.png",
    "Concept render of a NEXUS technology credenza",
  ),
  nexusCompactCredenzaConcept: technologyCredenzaImage(
    "nexus-compact-credenza-concept",
    "NEXUS Compact.png",
    "Concept render of a NEXUS Compact technology credenza",
  ),
  nexusRackCredenzaConcept: technologyCredenzaImage(
    "nexus-rack-credenza-concept",
    "NEXUS Rack.png",
    "Concept render of a NEXUS Rack technology credenza",
  ),
  nexusEduCredenzaConcept: technologyCredenzaImage(
    "nexus-edu-credenza-concept",
    "NEXUS EDU.png",
    "Concept render of a NEXUS Edu classroom technology credenza",
  ),
  nexusWallCredenzaConcept: technologyCredenzaImage(
    "nexus-wall-credenza-concept",
    "NEXUS WALL.png",
    "Concept render of a wall-mounted NEXUS Wall technology credenza",
  ),
  coreEnclosureConcept: avEquipmentEnclosureImage(
    "core-equipment-enclosure-concept",
    "CORE.png",
    "Concept render of a CORE AV equipment enclosure",
  ),
  coreCompactEnclosureConcept: avEquipmentEnclosureImage(
    "core-compact-enclosure-concept",
    "CORE Compact.png",
    "Concept render of a CORE Compact equipment enclosure",
  ),
  coreWallEnclosureConcept: avEquipmentEnclosureImage(
    "core-wall-enclosure-concept",
    "CORE Wall.png",
    "Concept render of a wall-mounted CORE Wall equipment enclosure",
  ),
  coreMobileEnclosureConcept: avEquipmentEnclosureImage(
    "core-mobile-enclosure-concept",
    "CORE Mobile.png",
    "Concept render of a mobile CORE Mobile equipment enclosure",
  ),
  coreRackEnclosureConcept: avEquipmentEnclosureImage(
    "core-rack-enclosure-concept",
    "CORE Rack.png",
    "Concept render of a CORE Rack equipment enclosure",
    1024,
    1536,
  ),
  panelControllerStandConcept: roomControlImage(
    "panel-controller-stand-concept",
    "PANEL.png",
    "Concept render of a freestanding PANEL touch-controller stand",
    1024,
    1536,
  ),
  panelDeskControllerConcept: roomControlImage(
    "panel-desk-controller-concept",
    "PANEL Desk.png",
    "Concept render of a PANEL Desk touch-controller housing",
    1536,
    1024,
  ),
  panelWallControllerConcept: roomControlImage(
    "panel-wall-controller-concept",
    "PANEL Wall.png",
    "Concept render of a wall-mounted PANEL Wall touch-controller enclosure",
    1536,
    1024,
  ),
  scheduleRoomPanelConcept: roomControlImage(
    "schedule-room-panel-concept",
    "SCHEDULE.png",
    "Concept render of a SCHEDULE room-panel enclosure",
    1122,
    1402,
  ),
  dockTabletConcept: roomControlImage(
    "dock-tablet-dock-concept",
    "DOCK-updated.png",
    "Concept render of a DOCK tabletop enclosure",
    1254,
    1254,
  ),
  mediawallConcept: mediaWallImage(
    "mediawall-display-wall-concept",
    "MEDIAWALL.png",
    "Concept render of a MEDIAWALL display-integrated wall",
  ),
  mediawallMobileConcept: mediaWallImage(
    "mediawall-mobile-concept",
    "MEDIAWALL Mobile.png",
    "Concept render of a mobile MEDIAWALL",
  ),
  boundaryDividerConcept: mediaWallImage(
    "boundary-space-divider-concept",
    "BOUNDARY.png",
    "Concept render of BOUNDARY space-divider modules",
  ),
  shiftPartitionConcept: mediaWallImage(
    "shift-mobile-partition-concept",
    "SHIFT.png",
    "Concept render of SHIFT partition modules",
  ),
  focusCollaborationWallConcept: mediaWallImage(
    "focus-collaboration-wall-concept",
    "FOCUS.png",
    "Concept render of a FOCUS display-integrated collaboration wall",
  ),
  vistaDisplayStandConcept: displayStandImage(
    "vista-single-display-stand-concept",
    "VISTA.png",
    "Concept render of a VISTA single-display stand",
  ),
  vistaDuoDisplayStandConcept: displayStandImage(
    "vista-duo-display-stand-concept",
    "VISTA Duo.png",
    "Concept render of a VISTA Duo dual-display stand",
  ),
  vistaXlDisplayStandConcept: displayStandImage(
    "vista-xl-display-stand-concept",
    "VISTA XL.png",
    "Concept render of a large-format VISTA XL display stand",
  ),
  frameDisplayStructureConcept: displayStandImage(
    "frame-floor-to-wall-display-structure-concept",
    "FRAME.png",
    "Concept render of a FRAME display structure",
    1395,
    1127,
  ),
  frameWallDisplayStructureConcept: displayStandImage(
    "frame-wall-display-structure-concept",
    "FRAME Wall.png",
    "Concept render of a wall-mounted FRAME Wall display structure",
  ),
  forumTableConcept: collaborationTableImage(
    "forum-boardroom-table-concept",
    "FORUM.png",
    "Concept render of a FORUM technology-integrated boardroom table",
    1536,
    1024,
  ),
  convergeTableConcept: collaborationTableImage(
    "converge-video-conference-table-concept",
    "CONVERGE.png",
    "Concept render of a CONVERGE video-conference table",
  ),
  huddleTableConcept: collaborationTableImage(
    "huddle-table-concept",
    "HUDDLE.png",
    "Concept render of a HUDDLE technology-ready table",
  ),
  linkTableConcept: collaborationTableImage(
    "link-table-concept",
    "LINK.png",
    "Concept render of a LINK collaboration table",
  ),
  linkModularTableConcept: collaborationTableImage(
    "link-modular-table-concept",
    "LINK MODULAR.png",
    "Concept render of LINK Modular collaboration-table modules",
    1536,
    1024,
  ),
  touchKioskConcept: interactiveKioskImage(
    "touch-floor-kiosk-concept",
    "TOUCH.png",
    "Concept render of a floor-standing TOUCH interactive kiosk",
    1024,
    1536,
  ),
  touchWallKioskConcept: interactiveKioskImage(
    "touch-wall-kiosk-concept",
    "TOUCH Wall.png",
    "Concept render of a wall-mounted TOUCH Wall kiosk",
    1402,
    1122,
  ),
  touchMiniKioskConcept: interactiveKioskImage(
    "touch-mini-kiosk-concept",
    "TOUCH Mini.png",
    "Concept render of a compact TOUCH Mini tablet kiosk",
    1235,
    1274,
  ),
  wayKioskConcept: interactiveKioskImage(
    "way-wayfinding-kiosk-concept",
    "WAY.png",
    "Concept render of a tall WAY wayfinding kiosk",
    1024,
    1536,
  ),
  checkKioskConcept: interactiveKioskImage(
    "check-registration-kiosk-concept",
    "CHECK.png",
    "Concept render of a CHECK visitor-registration kiosk",
    1122,
    1402,
  ),
  analystWorkstationConcept: technicalWorkstationImage(
    "analyst-technical-workstation-concept",
    "ANALYST.png",
    "Representative concept render of an ANALYST technical workstation",
  ),
  studioWorkstationConcept: technicalWorkstationImage(
    "studio-technical-workstation-concept",
    "STUDIO.png",
    "Representative concept render of a STUDIO technical workstation",
  ),
  monitorWorkstationConcept: technicalWorkstationImage(
    "monitor-technical-workstation-concept",
    "MONITOR.png",
    "Representative concept render of a MONITOR technical workstation",
  ),
  techdeskWorkstationConcept: technicalWorkstationImage(
    "techdesk-technical-workstation-concept",
    "TECHDESK.png",
    "Representative concept render of a TECHDESK technical workstation",
  ),
  techdeskProWorkstationConcept: technicalWorkstationImage(
    "techdesk-pro-technical-workstation-concept",
    "TECHDESK Pro.png",
    "Representative concept render of a TECHDESK Pro technical workstation",
  ),
  displayMountingAccessoryConcept: accessoryConcept(
    "display-mounting-accessory-concept",
    "Display Mounting.png",
    "Representative graphite display-mounting accessory kit with rails and adjustable arms",
  ),
  cameraMountingAccessoryConcept: accessoryConcept(
    "camera-mounting-accessory-concept",
    "Camera Mounting.png",
    "Representative graphite camera-mounting accessory kit with rail and adjustable shelves",
  ),
  soundbarMountingAccessoryConcept: accessoryConcept(
    "soundbar-mounting-accessory-concept",
    "Soundbar Mounting.png",
    "Representative graphite soundbar-mounting accessory kit with adjustable brackets",
  ),
  deviceShelvesAccessoryConcept: accessoryConcept(
    "device-shelves-accessory-concept",
    "Device Shelves.png",
    "Representative family of graphite device shelves with ventilation and cable pass-through details",
  ),
  rackIntegrationAccessoryConcept: accessoryConcept(
    "rack-integration-accessory-concept",
    "Rack Integration.png",
    "Representative empty graphite rack-integration frame with removable panels and service tray",
  ),
  powerAccessoryConcept: accessoryConcept(
    "power-accessory-concept",
    "Power.png",
    "Representative furniture-integrated power-module housings with blank faceplates",
  ),
  connectivityAccessoryConcept: accessoryConcept(
    "connectivity-accessory-concept",
    "Connectivity.png",
    "Representative furniture-integrated connectivity housings with interchangeable blank faceplates",
  ),
  cableManagementAccessoryConcept: accessoryConcept(
    "cable-management-accessory-concept",
    "Cable Management.png",
    "Representative graphite cable-management kit with tray, cable spine, channels and clips",
  ),
  mobilityAccessoryConcept: accessoryConcept(
    "mobility-accessory-concept",
    "Mobility.png",
    "Representative graphite mobility kit with castors, stabilising feet and an oak push handle",
  ),
  securityAccessoryConcept: accessoryConcept(
    "security-accessory-concept",
    "Security.png",
    "Representative graphite physical-security accessory kit with panel latches and retention modules",
  ),
  accessibilityAccessoryConcept: accessoryConcept(
    "accessibility-accessory-concept",
    "Accessibility.png",
    "Representative human-centred furniture accessory concepts with extended handles, shelves and tactile edge details",
  ),
  equipmentCoolingAccessoryConcept: accessoryConcept(
    "equipment-cooling-accessory-concept",
    "Equipment Cooling.png",
    "Representative graphite equipment-cooling accessory set with ventilation, intake and fan-module housings",
  ),
} satisfies Record<string, MediaAsset>;

export const productConceptMediaBySlug: Partial<Record<string, MediaAsset>> = {
  arc: mediaAssets.arcConcept,
  "arc-pro": mediaAssets.arcProConcept,
  lift: mediaAssets.liftConcept,
  "lift-access": mediaAssets.liftAccessConcept,
  pivot: mediaAssets.pivotConcept,
  "edu-station": mediaAssets.eduStationConcept,
  edu: mediaAssets.eduTeachingDeskConcept,
  learn: mediaAssets.learnCollaborationTableConcept,
  lab: mediaAssets.labTechnologyBenchConcept,
  flex: mediaAssets.flexLearningTableConcept,
  "flex-mobile": mediaAssets.flexMobileConcept,
  move: mediaAssets.moveCartConcept,
  "move-pro": mediaAssets.moveProCartConcept,
  "move-duo": mediaAssets.moveDuoCartConcept,
  "move-edu": mediaAssets.moveEduCartConcept,
  "move-xl": mediaAssets.moveXlCartConcept,
  nexus: mediaAssets.nexusCredenzaConcept,
  "nexus-compact": mediaAssets.nexusCompactCredenzaConcept,
  "nexus-rack": mediaAssets.nexusRackCredenzaConcept,
  "nexus-edu": mediaAssets.nexusEduCredenzaConcept,
  "nexus-wall": mediaAssets.nexusWallCredenzaConcept,
  core: mediaAssets.coreEnclosureConcept,
  "core-compact": mediaAssets.coreCompactEnclosureConcept,
  "core-wall": mediaAssets.coreWallEnclosureConcept,
  "core-mobile": mediaAssets.coreMobileEnclosureConcept,
  "core-rack": mediaAssets.coreRackEnclosureConcept,
  panel: mediaAssets.panelControllerStandConcept,
  "panel-desk": mediaAssets.panelDeskControllerConcept,
  "panel-wall": mediaAssets.panelWallControllerConcept,
  schedule: mediaAssets.scheduleRoomPanelConcept,
  dock: mediaAssets.dockTabletConcept,
  mediawall: mediaAssets.mediawallConcept,
  "mediawall-mobile": mediaAssets.mediawallMobileConcept,
  boundary: mediaAssets.boundaryDividerConcept,
  shift: mediaAssets.shiftPartitionConcept,
  focus: mediaAssets.focusCollaborationWallConcept,
  vista: mediaAssets.vistaDisplayStandConcept,
  "vista-duo": mediaAssets.vistaDuoDisplayStandConcept,
  "vista-xl": mediaAssets.vistaXlDisplayStandConcept,
  frame: mediaAssets.frameDisplayStructureConcept,
  "frame-wall": mediaAssets.frameWallDisplayStructureConcept,
  forum: mediaAssets.forumTableConcept,
  converge: mediaAssets.convergeTableConcept,
  huddle: mediaAssets.huddleTableConcept,
  link: mediaAssets.linkTableConcept,
  "link-modular": mediaAssets.linkModularTableConcept,
  touch: mediaAssets.touchKioskConcept,
  "touch-wall": mediaAssets.touchWallKioskConcept,
  "touch-mini": mediaAssets.touchMiniKioskConcept,
  way: mediaAssets.wayKioskConcept,
  check: mediaAssets.checkKioskConcept,
  analyst: mediaAssets.analystWorkstationConcept,
  studio: mediaAssets.studioWorkstationConcept,
  monitor: mediaAssets.monitorWorkstationConcept,
  techdesk: mediaAssets.techdeskWorkstationConcept,
  "techdesk-pro": mediaAssets.techdeskProWorkstationConcept,
};

export const accessoryConceptMediaBySlug: Partial<Record<string, MediaAsset>> =
  {
    "display-mounting": mediaAssets.displayMountingAccessoryConcept,
    "camera-mounting": mediaAssets.cameraMountingAccessoryConcept,
    "soundbar-mounting": mediaAssets.soundbarMountingAccessoryConcept,
    "device-shelves": mediaAssets.deviceShelvesAccessoryConcept,
    "rack-integration": mediaAssets.rackIntegrationAccessoryConcept,
    power: mediaAssets.powerAccessoryConcept,
    connectivity: mediaAssets.connectivityAccessoryConcept,
    "cable-management": mediaAssets.cableManagementAccessoryConcept,
    mobility: mediaAssets.mobilityAccessoryConcept,
    security: mediaAssets.securityAccessoryConcept,
    accessibility: mediaAssets.accessibilityAccessoryConcept,
    "equipment-cooling": mediaAssets.equipmentCoolingAccessoryConcept,
  };

export function findMediaAsset(src: string) {
  return (Object.values(mediaAssets) as MediaAsset[]).find(
    (asset) => asset.src === src || asset.mobileSrc === src,
  );
}
