import buildServer from "@/fastify";
import config from "@/config";
import { migrateDb } from "@/database";

const main = async () => {
  const fastify = buildServer();

  // run db migrations
  await migrateDb();

  fastify.listen({ port: Number(config.PORT), host: config.HOST }, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
};

main();
