import { GraphQLError } from 'graphql';
import { Arg, Field, InputType, Int, ObjectType, Query, Resolver } from 'type-graphql';

@ObjectType()
class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  displayName: string;

  @Field(() => String)
  email: string;
}

@ObjectType()
class PageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Int)
  totalCount: number;
}

@ObjectType()
class PaginatedUsers {
  @Field(() => [User])
  nodes: User[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@InputType()
class PaginationInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}

const users: User[] = [];

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello, world!';
  }

  @Query(() => PaginatedUsers)
  async users(
    @Arg('pagination', () => PaginationInput) pagination: PaginationInput,
  ): Promise<PaginatedUsers> {
    const { page, pageSize } = pagination;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = users.slice(startIndex, endIndex);

    return {
      nodes: paginatedUsers,
      pageInfo: {
        hasNextPage: endIndex < users.length && paginatedUsers.length === pageSize,
        totalCount: users.length,
      },
    };
  }

  @Query(() => User)
  async user(@Arg('id', () => String) id: string): Promise<User> {
    const user = users.find(u => u.id === id);
    if (!user)
      throw new GraphQLError('User not found', {
        extensions: { code: 'NOT_FOUND' },
      });
    return user;
  }
}
