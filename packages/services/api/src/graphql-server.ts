import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { AuthMiddleware } from "@lib/core";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./modules/user/user.resolver";

export async function createGraphQLServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    globalMiddlewares: [AuthMiddleware],
    validate: true,
    emitSchemaFile: true,
  });

  return new ApolloServer({
    schema,
    formatError: (error) => {
      // Custom error formatting
      return {
        message: error.message,
        locations: error.locations,
        path: error.path,
        extensions: error.extensions,
      };
    },
  });
}

// Add this function to create context for middleware integration
export function createContext({ req }: { req: any }) {
  return {
    user: req.user, // Assume user is set by authentication middleware
  };
}
