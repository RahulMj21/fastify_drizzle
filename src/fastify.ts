import Fastify from "fastify";
import cors from "@fastify/cors";
import config from "@/config";
import logger from "@/utils/logger";
import applicationsRoutes from "@/applications/applications.routes";
import { STATUS_TEXT } from "@/utils/constants";
import usersRoutes from "@/users/users.routes";
import rolesRoutes from "@/roles/roles.routes";

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

  // test route
  fastify.get("/", async () => {
    return { status: STATUS_TEXT.OK, message: "all good!" };
  });

  // register routes
  fastify.register(applicationsRoutes, { prefix: "/api/v1/applications" });
  fastify.register(usersRoutes, { prefix: "/api/v1/users" });
  fastify.register(rolesRoutes, { prefix: "/api/v1/roles" });

  return fastify;
};

export default buildServer;
