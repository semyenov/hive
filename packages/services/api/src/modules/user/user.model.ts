import { Field, ID, ObjectType, InputType } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @Length(2, 50)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  @Length(2, 50)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}
