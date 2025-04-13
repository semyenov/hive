import { createServer } from 'http';
import { createYoga } from 'graphql-yoga';
import { envelop } from '@envelop/core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { UserResolver } from '../../app/src/graphql/resolvers';
import { User } from '../../app/src/graphql/schema';

const schema = makeExecutableSchema({
  typeDefs: [User],
  resolvers: [UserResolver],
});

const yoga = createYoga({
  schema: schema,
  plugins: [
    envelop({
      // Add your envelop plugins here
    }),
  ],
});

const server = createServer(yoga);
server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});
