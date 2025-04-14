import type { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import type { Context } from "./types.js";

export function createExpressApp(server: ApolloServer<Context>) {
  const app = express();

  // Apply middleware
  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<Context> => ({ req }), // Add request to context for client information
    }),
  );

  return app;
}
