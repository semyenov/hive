import { GraphQLError } from 'graphql';

export function handleGraphQLError(error: Error): GraphQLError {
  if (error instanceof GraphQLError) {
    return error;
  }

  return new GraphQLError(error.message, {
    extensions: {
      code: 'INTERNAL_SERVER_ERROR',
      originalError: error,
    },
  });
}

export function validateInput<T>(input: T): T {
  // Add validation logic using class-validator
  // This is a placeholder for more complex validation
  return input;
}
