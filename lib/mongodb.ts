import mongoose from "mongoose";

// Read the MongoDB connection string from environment variables.
// This module is intended to be used on the server only.

// Shape of the cached connection object stored on the global scope.
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Augment the global scope to include a typed cache for the Mongoose connection.
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// `globalThis` is shared across HMR (hot-module-replacement) reloads in Next.js.
// We attach the cache to it so that we do not create a new connection on every reload in development.
const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached: MongooseCache = globalForMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!globalForMongoose.mongooseCache) {
  globalForMongoose.mongooseCache = cached;
}

/**
 * Establishes and returns a cached Mongoose connection to the MongoDB instance
 * specified by the MONGODB_URI environment variable.
 *
 * The connection is cached to avoid creating multiple connections during hot
 * module reloads in development and acts as a singleton in production.
 * If a connection attempt fails, the internal connection promise is reset so
 * subsequent calls can retry; the original error is rethrown.
 *
 * @returns The connected `mongoose` module instance
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  // If a connection already exists, use it.
  if (cached.conn) {
    return cached.conn;
  }

  // Read the MongoDB URI lazily to avoid import-time crashes in builds/tests.
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Please define the MONGODB_URI environment variable in your environment (e.g. .env.local).",
    );
  }

  // If a connection promise does not exist yet, create one.
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri)
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection fails, reset the promise so that future calls can retry.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}