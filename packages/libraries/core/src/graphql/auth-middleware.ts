import { MiddlewareFn } from 'type-graphql';
import { GraphQLError } from 'graphql';

export const AuthMiddleware: MiddlewareFn = async ({ context }, next) => {
  // Implement your authentication logic here
  const user = context.user; // Assume user is set by authentication middleware

  if (!user) {
    throw new GraphQLError('Not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED'
      }
    });
  }

  return next();
};
