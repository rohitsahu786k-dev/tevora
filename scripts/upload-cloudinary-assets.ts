import { readdir, writeFile } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { v2 as cloudinary } from "cloudinary";

const publicRoot = join(process.cwd(), "public");
const outputPath = join(
  process.cwd(),
  "src",
  "content",
  "cloudinary-assets.json",
);
const credentials = process.env.CLOUDINARY_URL;

if (!credentials) throw new Error("CLOUDINARY_URL is not configured.");
const parsed = new URL(credentials);
cloudinary.config({
  cloud_name: parsed.hostname,
  api_key: decodeURIComponent(parsed.username),
  api_secret: decodeURIComponent(parsed.password),
  secure: true,
});

async function filesUnder(path: string): Promise<string[]> {
  const entries = await readdir(path, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => entry.name !== ".DS_Store")
      .map((entry) => {
        const fullPath = join(path, entry.name);
        return entry.isDirectory() ? filesUnder(fullPath) : [fullPath];
      }),
  );
  return nested.flat();
}

async function main() {
  const files = await filesUnder(publicRoot);
  const manifest: Record<string, string> = {};

  for (const [index, file] of files.entries()) {
    const localPath = `/${relative(publicRoot, file).split(sep).join("/")}`;
    const publicId = `tevora${localPath.slice(0, -extname(localPath).length)}`;
    const result = await cloudinary.uploader.upload(file, {
      public_id: publicId,
      resource_type: "image",
      overwrite: true,
      invalidate: true,
    });
    manifest[localPath] = result.secure_url;
    process.stdout.write(`\rUploaded ${index + 1}/${files.length}`);
  }

  await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  process.stdout.write(`\nWrote ${outputPath}\n`);
}

void main();
