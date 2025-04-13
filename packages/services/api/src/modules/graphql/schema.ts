import 'reflect-metadata';
import { randomUUID } from 'crypto';
import { IsEmail, IsEnum, IsOptional, Length } from 'class-validator';
import {
  Arg,
  Args,
  ArgsType,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

@ObjectType()
export class User {
  @Field(_type => ID)
  id: string;

  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(_type => UserRole)
  role: UserRole;

  @Field({ nullable: true })
  @IsOptional()
  avatarUrl?: string;

  @Field({ nullable: false })
  createdAt: Date;

  @Field({ nullable: false })
  @IsOptional()
  updatedAt?: Date;

  constructor(partialData: Partial<User> = {}) {
    this.id = partialData.id ?? randomUUID();
    this.name = partialData.name ?? '';
    this.email = partialData.email ?? '';
    this.role = partialData.role ?? UserRole.USER;
    this.avatarUrl = partialData.avatarUrl ?? '';
    this.createdAt = partialData.createdAt ?? new Date();
    this.updatedAt = partialData.updatedAt ?? new Date();
  }
}

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  @Length(1, 255)
  name: string;

  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field(_type => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @Field({ nullable: true })
  @IsOptional()
  avatarUrl?: string;

  constructor(partialData: Partial<CreateUserInput> = {}) {
    this.name = partialData.name ?? '';
    this.email = partialData.email ?? '';
    this.role = partialData.role ?? UserRole.USER;
    this.avatarUrl = partialData.avatarUrl ?? '';
  }
}

@ArgsType()
export class PaginationArgs {
  @Field(_type => Number, { nullable: true, defaultValue: 1 })
  page?: number = 1;

  @Field(_type => Number, { nullable: true, defaultValue: 10 })
  pageSize?: number = 10;
}

@Resolver(_ofType => User)
export class UserResolver {
  #users: User[] = [];

  @Query(_returns => [User])
  async users(@Args() { page, pageSize }: PaginationArgs): Promise<User[]> {
    const startIndex = (page ?? 1 - 1) * (pageSize ?? 10);
    return this.#users.slice(startIndex, startIndex + (pageSize ?? 10));
  }

  @Query(_returns => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | undefined> {
    return this.#users.find(user => user.id === id);
  }

  @Mutation(_returns => User)
  async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
    const existingUser = this.#users.find(u => u.email === input.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: randomUUID(),
      ...input,
      role: input.role || UserRole.USER,
      createdAt: new Date(),
    };
    this.#users.push(newUser);
    return newUser;
  }

  @Mutation(_returns => User)
  async updateUser(@Arg('id') id: string, @Arg('input') input: CreateUserInput): Promise<User> {
    const userIndex = this.#users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.#users[userIndex] = {
      ...this.#users[userIndex],
      ...input,
      updatedAt: new Date(),
    };

    return this.#users[userIndex];
  }

  @Mutation(_returns => Boolean)
  async deleteUser(@Arg('id') id: string): Promise<boolean> {
    const initialLength = this.#users.length;
    this.#users = this.#users.filter(u => u.id !== id);
    return this.#users.length < initialLength;
  }
}
