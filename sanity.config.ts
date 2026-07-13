"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const singletonTypes = new Set([
  "brandSettings",
  "homepage",
  "companyPage",
  "designSupportPage",
  "footer",
  "seoDefaults",
]);
const singletonItem = (S: StructureBuilder, type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type));

export default defineConfig({
  name: "tevora",
  title: "TEVORA Content Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "replace-me",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            singletonItem(S, "brandSettings", "Brand settings"),
            singletonItem(S, "homepage", "Homepage"),
            singletonItem(S, "companyPage", "Company page"),
            singletonItem(S, "designSupportPage", "Design support page"),
            singletonItem(S, "footer", "Footer"),
            singletonItem(S, "seoDefaults", "SEO defaults"),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.has(item.getId() ?? ""),
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: "2026-07-13" }),
  ],
  document: {
    newDocumentOptions: (items) =>
      items.filter((item) => !singletonTypes.has(item.templateId)),
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(
            ({ action }) => action !== "duplicate" && action !== "delete",
          )
        : actions,
  },
  scheduledPublishing: { enabled: true },
});
