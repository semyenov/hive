import { Resolver, Query, Arg } from 'type-graphql';
import { GraphQLError } from 'graphql';

const users: any[] = [];

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hello, world!';
  }

  @Query(() => [User])
  async users(@Arg("pagination") pagination: { page: number; pageSize: number }) {
    const { page, pageSize } = pagination;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = users.slice(startIndex, endIndex);

    return {
      nodes: paginatedUsers,
      pageInfo: {
        hasNextPage: endIndex < users.length,
        totalCount: users.length
      }
    };
  }

  @Query(() => User)
  async user(@Arg("id") id: string) {
    const user = users.find(u => u.id === id);
    if (!user) throw new GraphQLError('User not found', {
      extensions: { code: 'NOT_FOUND' }
    });
    return user;
  }
}
