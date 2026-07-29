import { v2 as cloudinary } from "cloudinary";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

async function verifyMongoDB() {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error("DATABASE_URL is not configured.");
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DATABASE ?? "onespace");
    await database.command({ ping: 1 });
    await Promise.all([
      database
        .collection("partnerApplications")
        .createIndex({ reference: 1 }, { unique: true }),
      database
        .collection("partnerApplications")
        .createIndex({ "input.contact.workEmail": 1 }),
      database
        .collection("submissionRateLimits")
        .createIndex({ createdAt: 1 }, { expireAfterSeconds: 600 }),
      database.collection("projectEnquiries").createIndex({ createdAt: -1 }),
      database
        .collection("resourceLoginRequests")
        .createIndex({ reference: 1 }, { unique: true }),
      database
        .collection("resourceLoginRequests")
        .createIndex({ workEmail: 1, submittedAt: -1 }),
      database
        .collection("resourceAccessRequests")
        .createIndex({ reference: 1 }, { unique: true }),
      database
        .collection("resourceAccessRequests")
        .createIndex({ workEmail: 1, submittedAt: -1 }),
    ]);
  } finally {
    await client.close();
  }
}

async function verifyCloudinary() {
  const value = process.env.CLOUDINARY_URL;
  if (!value) throw new Error("CLOUDINARY_URL is not configured.");
  const credentials = new URL(value);
  cloudinary.config({
    cloud_name: credentials.hostname,
    api_key: decodeURIComponent(credentials.username),
    api_secret: decodeURIComponent(credentials.password),
    secure: true,
  });
  await cloudinary.api.ping();
}

async function verifySmtp() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD?.replaceAll(" ", "");
  if (!user || !pass) throw new Error("SMTP credentials are not configured.");
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass },
  });
  await transport.verify();
  transport.close();
}

async function main() {
  await verifyMongoDB();
  process.stdout.write("MongoDB: connected and indexes ready\n");
  await verifyCloudinary();
  process.stdout.write("Cloudinary: connected\n");
  await verifySmtp();
  process.stdout.write("SMTP: authenticated\n");
}

void main();
