import { Resolver, Query, Mutation, Arg, Field, InputType, ObjectType } from 'type-graphql';
import { Min, Max, Length } from 'class-validator';

@ObjectType()
export class BaseResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}

export abstract class BaseResolver {
  protected createSuccessResponse(message?: string): BaseResponse {
    return {
      success: true,
      message
    };
  }

  protected createErrorResponse(message: string): BaseResponse {
    return {
      success: false,
      message
    };
  }
}
