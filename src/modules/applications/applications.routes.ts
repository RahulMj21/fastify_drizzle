import ApplicationsControllers from "@/applications/applications.controllers";
import { createApplicationJSONSchema } from "@/applications/applications.schemas";
import { FastifyInstance } from "fastify";

const applicationsRoutes = async (fastify: FastifyInstance) => {
  const controllers = new ApplicationsControllers();

  fastify.post("/", {
    schema: createApplicationJSONSchema,
    handler: controllers.createApplication,
  });
  fastify.get("/", { handler: controllers.getApplications });
};

export default applicationsRoutes;
