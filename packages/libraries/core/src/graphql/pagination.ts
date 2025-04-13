import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { Min, Max } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  @Min(1)
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(100)
  pageSize?: number = 10;
}

@ObjectType()
export class PaginatedResponse<T> {
  @Field(() => [T])
  items: T[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}
