import "server-only";

import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

let configured = false;

function configureCloudinary() {
  if (configured) return;
  const value = process.env.CLOUDINARY_URL;
  if (!value) throw new Error("CLOUDINARY_URL is not configured.");
  const credentials = new URL(value);
  cloudinary.config({
    cloud_name: credentials.hostname,
    api_key: decodeURIComponent(credentials.username),
    api_secret: decodeURIComponent(credentials.password),
    secure: true,
  });
  configured = true;
}

export type StoredFile = {
  originalName: string;
  contentType: string;
  bytes: number;
  publicId: string;
  resourceType: string;
  url: string;
};

function safeName(value: string) {
  return (
    value
      .replace(/\.[^.]+$/, "")
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "file"
  );
}

async function uploadBuffer(
  file: File,
  folder: string,
  index: number,
): Promise<UploadApiResponse> {
  configureCloudinary();
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: `${String(index + 1).padStart(2, "0")}-${safeName(file.name)}`,
        resource_type: "auto",
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) reject(error ?? new Error("Upload failed."));
        else resolve(result);
      },
    );
    stream.end(buffer);
  });
}

export async function storeFiles(files: File[], folder: string) {
  return Promise.all(
    files.map(async (file, index): Promise<StoredFile> => {
      const result = await uploadBuffer(file, folder, index);
      return {
        originalName: file.name,
        contentType: file.type,
        bytes: result.bytes,
        publicId: result.public_id,
        resourceType: result.resource_type,
        url: result.secure_url,
      };
    }),
  );
}

export async function deleteFolderResources(folder: string) {
  configureCloudinary();
  await Promise.all([
    cloudinary.api.delete_resources_by_prefix(folder, {
      resource_type: "image",
    }),
    cloudinary.api.delete_resources_by_prefix(folder, { resource_type: "raw" }),
  ]);
  await cloudinary.api.delete_folder(folder).catch(() => undefined);
}

export function hasCloudinaryConfig() {
  return Boolean(process.env.CLOUDINARY_URL);
}
