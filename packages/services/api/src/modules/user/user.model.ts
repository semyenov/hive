import { IsEmail, Length } from 'class-validator';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

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

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  @Length(2, 50)
  name?: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;
}
