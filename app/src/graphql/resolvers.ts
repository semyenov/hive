const users: any[] = [];
const posts: any[] = [];

export const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    users: () => users,
    user: (_: any, { id }: { id: string }) => users.find(u => u.id === id),
    posts: () => posts
  },
  Mutation: {
    createUser: (_: any, { username, email }: { username: string, email: string }) => {
      const newUser = {
        id: String(users.length + 1),
        username,
        email,
        posts: []
      };
      users.push(newUser);
      return newUser;
    },
    createPost: (_: any, { title, content, authorId }: { title: string, content: string, authorId: string }) => {
      const author = users.find(u => u.id === authorId);
      if (!author) throw new Error('Author not found');

      const newPost = {
        id: String(posts.length + 1),
        title,
        content,
        author
      };
      posts.push(newPost);
      author.posts.push(newPost);
      return newPost;
    }
  },
  User: {
    posts: (user: any) => posts.filter(p => p.author.id === user.id)
  },
  Post: {
    author: (post: any) => post.author
  }
};
