import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './schema';

export async function createGraphQLSchema() {
  return await buildSchema({
    resolvers: [UserResolver],
    validate: true,
  });
}
