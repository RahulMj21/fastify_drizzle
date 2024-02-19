import { FastifyInstance } from "fastify";

const healthcheckRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/", async () => {
    return { status: "OK", message: "healthy" };
  });
  fastify.post("/", async () => {
    return { status: "OK", message: "healthy" };
  });
};

export default healthcheckRoutes;
