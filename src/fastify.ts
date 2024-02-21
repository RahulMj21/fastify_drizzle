import Fastify from "fastify";
import cors from "@fastify/cors";
import { healthcheckRoutes } from "@/routes";
import config from "@/config";
import logger from "@/utils/logger";
import applicationsRoutes from "@/modules/applications/applications.routes";

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
  fastify.register(applicationsRoutes, { prefix: "/api/v1/applicataions" });

  return fastify;
};

export default buildServer;
