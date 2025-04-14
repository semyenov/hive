import { GraphQLError } from 'graphql';
import { Arg, Field, InputType, Int, ObjectType, Query, Resolver } from 'type-graphql';

@ObjectType()
class User {
  @Field(() => String)
  id: string;

  @Field(() => String, { complexity: 2 })
  displayName: string;

  @Field(() => String, { complexity: 3 })
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
  @Field(() => [User], { complexity: ({ childComplexity }) => childComplexity })
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

const users: User[] = [
  { id: '1', displayName: 'John Doe', email: 'john@example.com' },
  { id: '2', displayName: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', displayName: 'Alice Johnson', email: 'alice@example.com' },
  { id: '4', displayName: 'Bob Wilson', email: 'bob@example.com' },
  { id: '5', displayName: 'Charlie Brown', email: 'charlie@example.com' },
];

@Resolver()
export class UserResolver {
  @Query(() => String, { complexity: 1 })
  hello(): string {
    return 'Hello, world!';
  }

  @Query(() => PaginatedUsers, {
    complexity: ({ args, childComplexity }) => {
      const pageSize = args.pagination?.pageSize || 10;
      return 5 + childComplexity * Math.min(pageSize, 20);
    },
  })
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

  @Query(() => User, {
    nullable: true,
    complexity: ({ childComplexity }) => 3 + childComplexity,
  })
  async user(@Arg('id', () => String) id: string): Promise<User> {
    const user = users.find(u => u.id === id);
    if (!user)
      throw new GraphQLError('User not found', {
        extensions: { code: 'NOT_FOUND' },
      });
    return user;
  }
}
