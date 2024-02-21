import { FastifyInstance } from "fastify";
import ApplicationsControllers from "@/modules/applications/applications.controllers";

const applicationsRoutes = async (fastify: FastifyInstance) => {
  const controllers = new ApplicationsControllers();

  fastify.post("/", { handler: controllers.createApplication });
  fastify.get("/", { handler: controllers.getApplications });
};

export default applicationsRoutes;
