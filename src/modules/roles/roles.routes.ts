import { FastifyInstance } from "fastify";
import RolesControllers from "@/roles/roles.controllers";
import { createRoleInputJSONSchema } from "./roles.schemas";

const rolesRoutes = async (fasfity: FastifyInstance) => {
  const controller = new RolesControllers();

  fasfity.post("/create", {
    handler: controller.createRole,
    schema: createRoleInputJSONSchema,
  });
};

export default rolesRoutes;
