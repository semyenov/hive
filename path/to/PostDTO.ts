import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PostDTO {
    @Field()
    title: string;

    @Field()
    content: string;
}
