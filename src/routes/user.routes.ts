import { FastifyInstance } from "fastify";
import { UserController } from "@/controllers";

const userController = new UserController();

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/register", { handler: userController.register });
  fastify.post("/login", { handler: userController.login });
  fastify.post("/logout", { handler: userController.logout });

  fastify.get("/profile", { handler: userController.profile });
};

export default userRoutes;
