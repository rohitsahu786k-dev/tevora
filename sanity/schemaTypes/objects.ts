import { defineArrayMember, defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "canonicalUrl", type: "url" }),
    defineField({ name: "noIndex", type: "boolean", initialValue: false }),
    defineField({ name: "socialImage", type: "imageWithAlt" }),
  ],
});
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image with alt text",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "caption", type: "string" }),
  ],
  validation: (rule) => rule.required(),
});
export const video = defineType({
  name: "video",
  title: "Video",
  type: "object",
  fields: [
    defineField({ name: "file", type: "file" }),
    defineField({ name: "externalUrl", type: "url" }),
    defineField({ name: "poster", type: "imageWithAlt" }),
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "transcript", type: "text" }),
    defineField({ name: "autoplay", type: "boolean", initialValue: false }),
  ],
  validation: (rule) =>
    rule.custom((value) =>
      value?.file || value?.externalUrl ? true : "Add a file or external URL.",
    ),
});
export const downloadableFile = defineType({
  name: "downloadableFile",
  title: "Downloadable file",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "asset",
      type: "file",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "format",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "fileSize", type: "string" }),
    defineField({ name: "revision", type: "string" }),
    defineField({
      name: "language",
      type: "string",
      initialValue: "en",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "accessLevel",
      type: "string",
      options: { list: ["public", "registered", "restricted"] },
      initialValue: "public",
      validation: (rule) => rule.required(),
    }),
  ],
});
export const specificationItem = defineType({
  name: "specificationItem",
  title: "Specification item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "value",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "unit", type: "string" }),
    defineField({ name: "note", type: "text" }),
    defineField({ name: "verified", type: "boolean", initialValue: false }),
  ],
});
export const specificationGroup = defineType({
  name: "specificationGroup",
  title: "Specification group",
  type: "object",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "specificationItem" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
export const featureStory = defineType({
  name: "featureStory",
  title: "Feature story",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "portableText",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "media", type: "gallery" }),
    defineField({ name: "technicalNote", type: "text" }),
  ],
});
export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "style",
      type: "string",
      options: { list: ["primary", "secondary", "text"] },
      initialValue: "primary",
    }),
  ],
});
export const quote = defineType({
  name: "quote",
  title: "Quote",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "attribution", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "organisation", type: "string" }),
  ],
});
export const metric = defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "value",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "unit", type: "string" }),
    defineField({ name: "verified", type: "boolean", initialValue: false }),
  ],
});
export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({ type: "imageWithAlt" }),
        defineArrayMember({ type: "video" }),
      ],
    }),
  ],
});
export const finishSwatch = defineType({
  name: "finishSwatch",
  title: "Finish swatch",
  type: "object",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "code", type: "string" }),
    defineField({ name: "swatch", type: "imageWithAlt" }),
    defineField({ name: "description", type: "text" }),
  ],
});
export const compatibilityRule = defineType({
  name: "compatibilityRule",
  title: "Compatibility rule",
  type: "object",
  fields: [
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          "verified",
          "provisional",
          "requires-technical-review",
          "not-compatible",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "notes",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "installationType", type: "string" }),
    defineField({ name: "model", type: "string" }),
    defineField({
      name: "requiredAccessories",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "accessory" }],
          options: { disableNew: true },
        }),
      ],
    }),
    defineField({
      name: "excludedAccessories",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "accessory" }],
          options: { disableNew: true },
        }),
      ],
    }),
  ],
});
const relationship = (name: string, title: string, to: string) =>
  defineType({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "target",
        type: "reference",
        to: [{ type: to }],
        options: { disableNew: true },
        validation: (rule) => rule.required(),
      }),
      defineField({ name: "relationship", type: "string" }),
      defineField({ name: "note", type: "text" }),
    ],
  });
export const productRelationship = relationship(
  "productRelationship",
  "Product relationship",
  "product",
);
export const accessoryRelationship = relationship(
  "accessoryRelationship",
  "Accessory relationship",
  "accessory",
);
export const spaceRelationship = relationship(
  "spaceRelationship",
  "Space relationship",
  "space",
);
export const sectorRelationship = relationship(
  "sectorRelationship",
  "Sector relationship",
  "sector",
);
export const portableText = defineType({
  name: "portableText",
  title: "Portable text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                validation: (rule) => rule.required(),
              }),
              defineField({
                name: "newWindow",
                type: "boolean",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "imageWithAlt" }),
  ],
});

export const reusableObjects = [
  seo,
  imageWithAlt,
  video,
  downloadableFile,
  specificationItem,
  specificationGroup,
  featureStory,
  cta,
  quote,
  metric,
  gallery,
  finishSwatch,
  compatibilityRule,
  productRelationship,
  accessoryRelationship,
  spaceRelationship,
  sectorRelationship,
  portableText,
];
