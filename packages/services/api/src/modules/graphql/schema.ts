import 'reflect-metadata';
import { 
  ObjectType, 
  Field, 
  ID, 
  InputType, 
  Resolver, 
  Query, 
  Mutation, 
  Arg,
  ArgsType,
  Args,
} from 'type-graphql';
import { IsEmail, Length, IsOptional, IsEnum } from 'class-validator';
import { randomUUID } from 'crypto';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

@ObjectType()
export class User {
  @Field(type => ID)
  id: string;

  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(type => UserRole)
  role: UserRole;

  @Field({ nullable: true })
  @IsOptional()
  avatarUrl?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  @IsOptional()
  updatedAt?: Date;
}

@InputType()
export class CreateUserInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(type => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @Field({ nullable: true })
  @IsOptional()
  avatarUrl?: string;
}

@ArgsType()
export class PaginationArgs {
  @Field(type => Number, { nullable: true, defaultValue: 1 })
  page?: number = 1;

  @Field(type => Number, { nullable: true, defaultValue: 10 })
  pageSize?: number = 10;
}

@Resolver(of => User)
export class UserResolver {
  private users: User[] = [];

  @Query(returns => [User])
  async users(
    @Args() { page, pageSize }: PaginationArgs
  ): Promise<User[]> {
    const startIndex = (page - 1) * pageSize;
    return this.users.slice(startIndex, startIndex + pageSize);
  }

  @Query(returns => User, { nullable: true })
  async user(
    @Arg('id') id: string
  ): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  @Mutation(returns => User)
  async createUser(
    @Arg('input') input: CreateUserInput
  ): Promise<User> {
    const existingUser = this.users.find(u => u.email === input.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: randomUUID(),
      ...input,
      role: input.role || UserRole.USER,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  @Mutation(returns => User)
  async updateUser(
    @Arg('id') id: string,
    @Arg('input') input: CreateUserInput
  ): Promise<User> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...input,
      updatedAt: new Date(),
    };

    return this.users[userIndex];
  }

  @Mutation(returns => Boolean)
  async deleteUser(
    @Arg('id') id: string
  ): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return this.users.length < initialLength;
  }
}
