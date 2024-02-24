import { FastifyInstance } from "fastify";
import UsersControllers from "@/users/users.controllers";
import {
  createUserInputJSONSchema,
  loginInputJSONSchema,
} from "@/users/users.schemas";

const usersRoutes = async (fastify: FastifyInstance) => {
  const controllers = new UsersControllers();

  fastify.post("/register", {
    handler: controllers.register,
    schema: createUserInputJSONSchema,
  });

  fastify.post("/login", {
    handler: controllers.login,
    schema: loginInputJSONSchema,
  });

  fastify.get("/profile", { handler: controllers.profile });
};

export default usersRoutes;
