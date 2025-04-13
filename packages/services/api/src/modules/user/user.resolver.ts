import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User, CreateUserInput } from './user.model';
import { BaseResolver } from '@libraries/core/graphql/base-resolver';

@Resolver()
export class UserResolver extends BaseResolver {
  private users: User[] = [];

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.users;
  }

  @Mutation(() => User)
  async createUser(
    @Arg('input') input: CreateUserInput
  ): Promise<User> {
    const newUser: User = {
      id: String(this.users.length + 1),
      ...input
    };
    this.users.push(newUser);
    return newUser;
  }
}
