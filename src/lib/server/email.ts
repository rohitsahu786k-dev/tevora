import "server-only";

import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | undefined;

function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD?.replaceAll(" ", "");
  if (!user || !pass) throw new Error("SMTP credentials are not configured.");
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass },
  });
  return transporter;
}

export async function sendEmail(options: {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}) {
  return getTransporter().sendMail({
    from: process.env.EMAIL_FROM ?? process.env.SMTP_USER,
    ...options,
  });
}

export async function verifyEmailConnection() {
  return getTransporter().verify();
}

export function hasEmailConfig() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}
