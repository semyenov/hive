import 'reflect-metadata';
import { createYoga } from 'graphql-yoga';
import { Arg, buildSchema, Field, ID, ObjectType, Query, Resolver } from 'type-graphql';
import { envelop } from '@envelop/core';

@ObjectType()
class User {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;
}

@Resolver()
class UserResolver {
  private users = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ];

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.users;
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
}

export async function createRequestListener(_env: any) {
  // Build TypeGraphQL schema
  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: true,
  });

  // Create yoga instance with the schema
  return createYoga({
    schema,
    plugins: [
      envelop({
        plugins: [],
      }),
    ],
  });
}
