import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import config from "@/config";
import { resolve } from "path";

const pool = new Pool({
  connectionString: config.DB_URL,
  ssl: false,
});

export const db = drizzle(pool);

export const migrateDb = async () => {
  await migrate(db, {
    migrationsFolder: resolve(__dirname, "../migrations"),
  });
};
