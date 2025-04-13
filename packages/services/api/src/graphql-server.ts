import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server-express';
import { AuthMiddleware } from '@libraries/core/graphql/auth-middleware';
import { UserResolver } from './modules/user/user.resolver';

export async function createGraphQLServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    globalMiddlewares: [AuthMiddleware],
    validate: true,
  });

  return new ApolloServer({
    schema,
    context: ({ req }) => {
      // Set up context with authentication
      return {
        user: req.user, // Assume user is set by authentication middleware
      };
    },
    formatError: error => {
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
