import "server-only";

import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const databaseName = process.env.MONGODB_DATABASE ?? "onespace";

declare global {
  var __onespaceMongoClient: Promise<MongoClient> | undefined;
}

function connect() {
  if (!uri) throw new Error("DATABASE_URL is not configured.");
  return new MongoClient(uri).connect();
}

export async function getDatabase() {
  const clientPromise =
    globalThis.__onespaceMongoClient ??
    (globalThis.__onespaceMongoClient = connect());
  return (await clientPromise).db(databaseName);
}

export function hasDatabaseConfig() {
  return Boolean(uri);
}
