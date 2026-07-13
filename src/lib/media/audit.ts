import { statSync, existsSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import {
  aspectRatios,
  mediaAssets,
  supportedMediaFormats,
} from "@/content/media";
import type { MediaAsset } from "@/types/media";

export type MediaAuditIssue = {
  severity: "error" | "warning";
  code:
    | "missing-file"
    | "missing-alt"
    | "duplicate-source"
    | "oversized-file"
    | "incorrect-aspect-ratio"
    | "broken-reference"
    | "unsupported-format";
  assetId: string;
  message: string;
};
const MAX_SOURCE_BYTES = 2.5 * 1024 * 1024;
const RATIO_TOLERANCE = 0.03;
const allFormats = [
  ...supportedMediaFormats.images,
  ...supportedMediaFormats.video,
  ...supportedMediaFormats.models,
];

export function auditMedia(
  assets: MediaAsset[] = Object.values(mediaAssets),
  publicRoot = join(process.cwd(), "public"),
) {
  const issues: MediaAuditIssue[] = [];
  const sources = new Map<string, string>();
  for (const asset of assets) {
    if (!asset.alt.trim())
      issues.push(
        issue("error", "missing-alt", asset, "Alt text is required."),
      );
    for (const [label, reference] of [
      ["source", asset.src],
      ["mobile source", asset.mobileSrc],
      ["poster", asset.poster],
    ] as const) {
      if (!reference) continue;
      const path = join(publicRoot, reference.replace(/^\//, ""));
      if (!existsSync(path))
        issues.push(
          issue(
            "error",
            label === "source" ? "missing-file" : "broken-reference",
            asset,
            `${label} does not exist: ${reference}`,
          ),
        );
      else if (statSync(path).size > MAX_SOURCE_BYTES)
        issues.push(
          issue(
            "warning",
            "oversized-file",
            asset,
            `${reference} exceeds 2.5 MB.`,
          ),
        );
    }
    const extension = extname(asset.src).slice(1).toLowerCase();
    if (!allFormats.includes(extension as never))
      issues.push(
        issue(
          "error",
          "unsupported-format",
          asset,
          `Unsupported extension: ${extension}`,
        ),
      );
    const previous = sources.get(asset.src);
    if (previous)
      issues.push(
        issue(
          "warning",
          "duplicate-source",
          asset,
          `Source is already registered by ${previous}.`,
        ),
      );
    else sources.set(asset.src, asset.id);
    const actual = asset.width / asset.height;
    const expected = aspectRatios[asset.aspectRatio].ratio;
    if (Math.abs(actual - expected) / expected > RATIO_TOLERANCE)
      issues.push(
        issue(
          "error",
          "incorrect-aspect-ratio",
          asset,
          `Declared dimensions ${asset.width}×${asset.height} do not match ${asset.aspectRatio}.`,
        ),
      );
    const diskPath = join(publicRoot, asset.src.replace(/^\//, ""));
    if (existsSync(diskPath) && extension === "png") {
      const dimensions = readPngDimensions(diskPath);
      if (
        dimensions &&
        (dimensions.width !== asset.width || dimensions.height !== asset.height)
      )
        issues.push(
          issue(
            "error",
            "broken-reference",
            asset,
            `Declared dimensions do not match the PNG header (${dimensions.width}×${dimensions.height}).`,
          ),
        );
    }
  }
  return issues;
}
function issue(
  severity: MediaAuditIssue["severity"],
  code: MediaAuditIssue["code"],
  asset: MediaAsset,
  message: string,
): MediaAuditIssue {
  return { severity, code, assetId: asset.id, message };
}
function readPngDimensions(path: string) {
  const buffer = readFileSync(path);
  if (buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG")
    return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}
