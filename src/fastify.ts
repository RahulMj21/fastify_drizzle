import Fastify from "fastify";
import cors from "@fastify/cors";
import { healthcheckRoutes, userRoutes } from "@/routes";
import config from "@/config";
import logger from "@/utils/logger";

const buildServer = () => {
  const fastify = Fastify({
    logger,
  });

  // register plugins
  fastify.register(cors, {
    origin: [config.WEB_APP_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  });

  // register routes
  fastify.register(healthcheckRoutes, { prefix: "/api/v1/healthcheck" });
  fastify.register(userRoutes, { prefix: "/api/v1/user" });

  return fastify;
};

export default buildServer;
