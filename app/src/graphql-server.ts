import { ApolloServer } from "@apollo/server";
import { createHive, useHive } from "@lib/apollo";
import { buildGraphQLSchema } from "./graphql/schema.js";
import type { Context } from "./types.js";

export async function createGraphQLServer(
  hiveClient: ReturnType<typeof createHive>,
) {
  const schema = await buildGraphQLSchema();

  return new ApolloServer<Context>({
    schema,
    plugins: [useHive(hiveClient)],
  });
}
