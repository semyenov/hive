import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class BaseResponse {
  @Field()
  success!: boolean;

  @Field({ nullable: true })
  message?: string;

  constructor(success = false, message?: string) {
    this.success = success;
    this.message = message;
  }
}

export abstract class BaseResolver {
  protected createSuccessResponse(message?: string): BaseResponse {
    return new BaseResponse(true, message);
  }

  protected createErrorResponse(message: string): BaseResponse {
    return new BaseResponse(false, message);
  }
}
