import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  out: "./migrations",
  schema: "./src/database/schema.ts",
  breakpoints: false,
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL as string,
  },
} satisfies Config;
