import { GraphQLError } from 'graphql';

const users: any[] = [];
const posts: any[] = [];

export const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    users: (_: any, { pagination = { page: 1, pageSize: 10 } }: { pagination: { page: number, pageSize: number } }) => {
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
    },
    user: (_: any, { id }: { id: string }) => {
      const user = users.find(u => u.id === id);
      if (!user) throw new GraphQLError('User not found', {
        extensions: { code: 'NOT_FOUND' }
      });
      return user;
    },
    posts: (_: any, { pagination = { page: 1, pageSize: 10 } }: { pagination: { page: number, pageSize: number } }) => {
      const { page, pageSize } = pagination;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedPosts = posts.slice(startIndex, endIndex);

      return {
        nodes: paginatedPosts,
        pageInfo: {
          hasNextPage: endIndex < posts.length,
          totalCount: posts.length
        }
      };
    }
  },
  Mutation: {
    createUser: (_: any, { input }: { input: { username: string, email: string } }) => {
      const { username, email } = input;
      
      // Basic validation
      if (username.length < 3) {
        throw new GraphQLError('Username must be at least 3 characters long', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }

      const existingUser = users.find(u => u.username === username || u.email === email);
      if (existingUser) {
        throw new GraphQLError('Username or email already exists', {
          extensions: { code: 'CONFLICT' }
        });
      }

      const newUser = {
        id: String(users.length + 1),
        username,
        email,
        posts: [],
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      return newUser;
    },
    createPost: (_: any, { input }: { input: { title: string, content: string, authorId: string } }) => {
      const { title, content, authorId } = input;
      
      // Basic validation
      if (title.length < 3) {
        throw new GraphQLError('Title must be at least 3 characters long', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }

      const author = users.find(u => u.id === authorId);
      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }

      const newPost = {
        id: String(posts.length + 1),
        title,
        content,
        author,
        createdAt: new Date().toISOString()
      };
      posts.push(newPost);
      author.posts.push(newPost);
      return newPost;
    },
    deleteUser: (_: any, { id }: { id: string }) => {
      const userIndex = users.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }

      // Remove user's posts
      posts.filter(p => p.author.id === id).forEach(post => {
        const postIndex = posts.indexOf(post);
        if (postIndex !== -1) posts.splice(postIndex, 1);
      });

      users.splice(userIndex, 1);
      return true;
    },
    deletePost: (_: any, { id }: { id: string }) => {
      const postIndex = posts.findIndex(p => p.id === id);
      if (postIndex === -1) {
        throw new GraphQLError('Post not found', {
          extensions: { code: 'NOT_FOUND' }
        });
      }

      const post = posts[postIndex];
      const authorIndex = post.author.posts.findIndex((p: any) => p.id === id);
      if (authorIndex !== -1) {
        post.author.posts.splice(authorIndex, 1);
      }

      posts.splice(postIndex, 1);
      return true;
    }
  },
  User: {
    posts: (user: any) => posts.filter(p => p.author.id === user.id)
  },
  Post: {
    author: (post: any) => post.author
  }
};
