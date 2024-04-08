import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authApi } from './_utils/createCustomFetch';

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
        const authResponse = await authApi(`/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.username,
            password: credentials.password,
          }),
        });
        console.log(authResponse);
        if (!authResponse.ok) {
          return null;
        }
        const user = await authResponse.json();
        return user;
      },
    }),
  ],
});
