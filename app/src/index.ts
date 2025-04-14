import 'reflect-metadata';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { GraphQLError } from 'graphql';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { createHive, useHive } from '@lib/apollo';
import { UserResolver } from './graphql/resolvers';

// Load environment variables
const PORT = parseInt(process.env.PORT || '4000', 10);
const HOST = process.env.HOST || 'localhost';

async function bootstrap() {
  // Build TypeGraphQL schema
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    validate: true,
  });

  // Create Hive client with proper configuration
  const hiveClient = createHive({
    enabled: true,
    debug: true, // Enable debug logs
    token: process.env.HIVE_TOKEN || 'YOUR-TOKEN',
    reporting: {
      author: 'app-server',
      commit: 'local-dev',
    },
    usage: {
      clientInfo: req => {
        const clientName = req.headers['x-graphql-client-name'];
        const clientVersion = req.headers['x-graphql-client-version'];

        if (typeof clientName === 'string' && typeof clientVersion === 'string') {
          return {
            name: clientName,
            version: clientVersion,
          };
        }

        return null;
      },
    },
  });

  // Create Apollo Server with the TypeGraphQL schema
  const server = new ApolloServer({
    schema,
    plugins: [useHive(hiveClient)],
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
  });
}

bootstrap().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
