import dotenv from "dotenv";
import { resolve } from "path";

if (process.env.NODE_ENV !== "prod") {
  const configFile = resolve(__dirname, `.env.${process.env.NODE_ENV}`);
  dotenv.config({ path: configFile });
} else {
  dotenv.config();
}

const config = {
  DB_URL: process.env.DB_URL as string,
  WEB_APP_URL: process.env.WEB_APP_URL as string,
  PORT: process.env.PORT || 8000,
  HOST: process.env.HOST || "0.0.0.0",
};

export default config;
