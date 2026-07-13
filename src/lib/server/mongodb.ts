import "server-only";

import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const databaseName = process.env.MONGODB_DATABASE ?? "tevora";

declare global {
  var __tevoraMongoClient: Promise<MongoClient> | undefined;
}

function connect() {
  if (!uri) throw new Error("DATABASE_URL is not configured.");
  return new MongoClient(uri).connect();
}

export async function getDatabase() {
  const clientPromise =
    globalThis.__tevoraMongoClient ??
    (globalThis.__tevoraMongoClient = connect());
  return (await clientPromise).db(databaseName);
}

export function hasDatabaseConfig() {
  return Boolean(uri);
}
