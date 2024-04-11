import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/welcome/login',
    newUser: '/welcome/join',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user = { ...credentials };
        return user;
      },
    }),
  ],
});
