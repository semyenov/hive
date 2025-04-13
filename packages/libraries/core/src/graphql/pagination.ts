import { Max, Min } from 'class-validator';
import { Field, InputType, Int, ObjectType } from 'type-graphql';

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
  @Field(() => [Object], { defaultValue: [] })
  items!: T[];

  @Field(() => Int, { defaultValue: 0 })
  total!: number;

  @Field(() => Int, { defaultValue: 1 })
  page!: number;

  @Field(() => Int, { defaultValue: 10 })
  pageSize!: number;

  constructor(items: T[] = [], total = 0, page = 1, pageSize = 10) {
    this.items = items;
    this.total = total;
    this.page = page;
    this.pageSize = pageSize;
  }
}
