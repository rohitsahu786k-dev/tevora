import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "replace-me",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
  typegen: {
    path: "./src/**/*.{ts,tsx}",
    schema: "./sanity/extract.json",
    generates: "./src/types/sanity.generated.ts",
    overloadClientMethods: true,
    formatGeneratedCode: true,
  },
});
