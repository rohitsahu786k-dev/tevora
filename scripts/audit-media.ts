import { auditMedia } from "../src/lib/media/audit";

const issues = auditMedia();
issues.forEach((issue) =>
  console[issue.severity === "error" ? "error" : "warn"](
    `[${issue.severity}] ${issue.code} ${issue.assetId}: ${issue.message}`,
  ),
);
const errors = issues.filter((issue) => issue.severity === "error");
if (errors.length) {
  console.error(`Media audit failed with ${errors.length} error(s).`);
  process.exitCode = 1;
} else console.log(`Media audit passed with ${issues.length} warning(s).`);
