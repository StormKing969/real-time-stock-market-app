// Simple, dependency-free script to test MongoDB connectivity using Mongoose
// Usage: npm run test:db
// The script will try to load variables from .env.local or .env if present

import fs from "fs";
import path from "path";
import mongoose from "mongoose";

function loadEnv() {
  const cwd = process.cwd();
  const candidates = [path.join(cwd, ".env.local"), path.join(cwd, ".env")];
  for (const file of candidates) {
    try {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, "utf8");
        for (const rawLine of content.split(/\r?\n/)) {
          const line = rawLine.trim();
          if (!line || line.startsWith("#")) continue;
          const eqIdx = line.indexOf("=");
          if (eqIdx === -1) continue;
          const key = line.slice(0, eqIdx).trim();
          let value = line.slice(eqIdx + 1);
          // Strip surrounding quotes if present
          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            if (value.length >= 2) {
              value = value.slice(1, -1);
            } else {
              value = "";
            }
          }
          if (!(key in process.env)) {
            process.env[key] = value;
          }
        }
        // Stop at the first file found to mimic Next.js precedence
        break;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      // ignore parsing errors; we'll rely on process.env
    }
  }
}

async function main() {
  console.log("--- Database Connection Test ---");
  console.log(`Node: ${process.version}`);

  loadEnv();

  const uri = process.env.MONGODB_URI;
  const nodeEnv = process.env.NODE_ENV || "development";

  if (!uri) {
    console.error("ERROR: MONGODB_URI is not set.");
    console.error(
      "Set MONGODB_URI in .env.local or .env at the project root, or set it in your shell before running this script.",
    );
    process.exitCode = 1;
    return;
  }

  try {
    const start = Date.now();
    // Disable Mongoose buffering to surface connectivity issues immediately
    await mongoose.connect(uri, { bufferCommands: false });

    // Perform a ping via the underlying driver
    const db = mongoose.connection.db;
    if (!db) {
      return new Error("Database connection not established");
    }

    const admin = db.admin();
    const pingResult = await admin.ping();

    const duration = Date.now() - start;
    // Extract some connection info
    const { host, port, name: dbName } = mongoose.connection;

    console.log("SUCCESS: Connected to MongoDB.");
    console.log(`Environment: ${nodeEnv}`);
    if (host && port) {
      console.log(`Server: ${host}:${port}`);
    }
    console.log(`Database: ${dbName || "(default from URI)"}`);
    console.log(`Ping: ${JSON.stringify(pingResult)}`);
    console.log(`Time: ${duration} ms`);

    await mongoose.disconnect();
    console.log("Connection closed.");
  } catch (err) {
    console.error("FAILED to connect to MongoDB.");
    if (err instanceof Error) {
      console.error("Message:", err.message);

      if (err.cause) {
        console.error("Cause:", err.cause);
      }
    } else {
      console.error("Error:", err);
    }
    // For more details, uncomment the next line
    // console.error(err);
    process.exitCode = 1;
  }
}

main();