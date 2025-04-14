import { GraphQLError } from 'graphql';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { BaseResolver } from '@lib/core';
import { CreateUserInput, UpdateUserInput, User } from './user.model';

@Resolver()
export class UserResolver extends BaseResolver {
  #users: User[] = [];

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.#users;
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
    // Check for duplicate email
    const existingUser = this.#users.find(user => user.email === input.email);
    if (existingUser) {
      throw new GraphQLError('Email already exists', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    const newUser = new User({
      ...input,
    });
    this.#users.push(newUser);
    return newUser;
  }

  @Mutation(() => User)
  async updateUser(@Arg('input') input: UpdateUserInput): Promise<User> {
    const userIndex = this.#users.findIndex(user => user.id === input.id);
    if (userIndex === -1) {
      throw new GraphQLError('User not found', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    // If email is being updated, check for duplicates
    if (input.email) {
      const existingUser = this.#users.find(
        user => user.email === input.email && user.id !== input.id,
      );
      if (existingUser) {
        throw new GraphQLError('Email already exists', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
    }

    // Update user with new values while preserving existing ones
    const updatedUser: User = {
      ...this.#users[userIndex],
      ...(input.name && { name: input.name }),
      ...(input.email && { email: input.email }),
    };

    this.#users[userIndex] = updatedUser;
    return updatedUser;
  }
}
