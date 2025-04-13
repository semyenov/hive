import { ApolloServer } from 'apollo-server';
import { resolvers } from './graphql/resolvers';
import { readFileSync } from 'fs';
import { join } from 'path';

const typeDefs = readFileSync(join(__dirname, 'graphql/schema.graphql'), 'utf-8');

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  introspection: true,
  playground: true 
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
