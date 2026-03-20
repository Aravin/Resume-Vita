import { appConfig } from "../config";
import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${appConfig.db.username}:${appConfig.db.password}@${appConfig.db.host}/${appConfig.db.name}?retryWrites=true&w=majority`;

/** Options tuned for Cloud Run / short-lived instances + Atlas idle timeouts */
const clientOptions = {
  maxPoolSize: 10,
  minPoolSize: 0,
  serverSelectionTimeoutMS: 10_000,
  socketTimeoutMS: 45_000,
  maxIdleTimeMS: 60_000,
} as const;

let client: MongoClient | null = null;

function isRecoverableDriverError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const name = (err as Error).name;
  return (
    name === "MongoTopologyClosedError" ||
    name === "MongoNotConnectedError" ||
    name === "MongoNetworkError" ||
    name === "MongoServerSelectionError"
  );
}

async function destroyClient(): Promise<void> {
  if (!client) return;
  try {
    await client.close();
  } catch {
    /* ignore close errors on dead topology */
  }
  client = null;
}

/**
 * Returns a connected MongoClient. Recreates the client when the topology was
 * closed (common on Cloud Run after idle / freeze, or when Atlas drops idle sockets).
 */
export async function getMongoClient(): Promise<MongoClient> {
  if (!client) {
    client = new MongoClient(uri, clientOptions);
  }

  try {
    await client.connect();
    await client.db(appConfig.db.name ?? "resumevita").command({ ping: 1 });
    return client;
  } catch (err) {
    if (!isRecoverableDriverError(err)) {
      throw err;
    }
    await destroyClient();
    client = new MongoClient(uri, clientOptions);
    await client.connect();
    await client.db(appConfig.db.name ?? "resumevita").command({ ping: 1 });
    return client;
  }
}

/** Best-effort close on Cloud Run scale-down */
process.once("SIGTERM", async () => {
  await destroyClient();
});
