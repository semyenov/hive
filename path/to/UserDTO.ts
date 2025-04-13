import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserDTO {
    @Field()
    name: string;

    @Field()
    email: string;
}
