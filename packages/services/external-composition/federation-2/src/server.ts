import 'reflect-metadata';
import { gql } from 'graphql-tag';
import { createSchema, createYoga } from 'graphql-yoga';

// Define users data
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

// Define the schema using explicit types to match graphql-yoga v5.0.0
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`;

// Type-safe resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_: unknown, { id }: { id: string }) => users.find(user => user.id === id),
  },
};

export async function createRequestListener(_env: any) {
  // Create schema using GraphQL SDL
  const schema = createSchema({
    typeDefs,
    resolvers,
  });

  // Create yoga instance with the schema
  return createYoga({
    schema,
  });
}

export const yoga = createRequestListener({});
