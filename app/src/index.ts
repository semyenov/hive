import 'reflect-metadata';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { useHive } from '@graphql-hive/apollo';
import { UserResolver } from './graphql/resolvers';

// Load environment variables
const PORT = parseInt(process.env.PORT || '4000', 10);
const HOST = process.env.HOST || 'localhost';
const GRAPHQL_INTROSPECTION = process.env.GRAPHQL_INTROSPECTION !== 'false';

async function bootstrap() {
  // Build TypeGraphQL schema
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    validate: true,
  });

  // Create Apollo Server with the TypeGraphQL schema
  const server = new ApolloServer({
    schema,
    introspection: GRAPHQL_INTROSPECTION,
    plugins: [
      useHive({
        enabled: true,
        token: process.env.HIVE_TOKEN || 'YOUR-TOKEN',
        usage: {
          target: process.env.HIVE_TARGET || '<YOUR_ORGANIZATION>/<YOUR_PROJECT>/<YOUR_TARGET>',
        },
      }),
    ],
  });

  // Start the server
  await server.start();

  // Set up Express
  const app = express();

  // Apply middleware
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }), // Add request to context for client information
    }),
  );

  // Start Express server
  app.listen({ port: PORT, host: HOST }, () => {
    console.log(`🚀 Server ready at http://${HOST}:${PORT}/graphql`);
    console.log(`GraphQL Introspection: ${GRAPHQL_INTROSPECTION ? 'Enabled' : 'Disabled'}`);
  });
}

bootstrap().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
