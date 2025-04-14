import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers.js";

export async function buildGraphQLSchema() {
  return buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    validate: true,
  });
}

export * from "./resolvers.js";
