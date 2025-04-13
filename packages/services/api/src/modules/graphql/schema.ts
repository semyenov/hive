import 'reflect-metadata';
import { 
  ObjectType, 
  Field, 
  ID, 
  InputType, 
  Resolver, 
  Query, 
  Mutation, 
  Arg 
} from 'type-graphql';
import { IsEmail, Length } from 'class-validator';

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
}

@InputType()
export class CreateUserInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}

@Resolver(of => User)
export class UserResolver {
  private users: User[] = [];

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return this.users;
  }

  @Mutation(returns => User)
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
