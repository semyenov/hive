import { GraphQLError } from 'graphql';
import { MiddlewareFn } from 'type-graphql';

interface AuthContext {
  user?: {
    id: string;
    [key: string]: any;
  };
}

export const AuthMiddleware: MiddlewareFn<AuthContext> = async ({ context }, next) => {
  // Implement your authentication logic here
  const user = context.user;

  if (!user) {
    throw new GraphQLError('Not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }

  return next();
};
