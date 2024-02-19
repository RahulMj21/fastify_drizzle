import buildServer from "@/fastify";
import config from "@/config";

const main = async () => {
  const fastify = buildServer();

  fastify.listen({ port: Number(config.PORT) }, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
};

main();
