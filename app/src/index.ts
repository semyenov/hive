import "reflect-metadata";
import { createExpressApp } from "./express-app.js";
import { createGraphQLServer } from "./graphql-server.js";
import { createHiveClient } from "./hive-client.js";

// Load environment variables
const PORT = parseInt(process.env.PORT || "4000", 10);
const HOST = process.env.HOST || "localhost";

async function bootstrap() {
  const hiveClient = createHiveClient();
  const server = await createGraphQLServer(hiveClient);
  await server.start();

  const app = createExpressApp(server);

  // Start Express server
  app.listen({ port: PORT, host: HOST }, () => {
    console.log(`🚀 Server ready at http://${HOST}:${PORT}/graphql`);
  });
}

// Start the application
if (require.main === module) {
  bootstrap().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
}

export { bootstrap };
