import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from './_utils/createCustomFetch';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/welcome/login',
    newUser: '/welcome/join',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await api(`/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.username,
            password: credentials.password,
          }),
        });
        if (!authResponse.ok) {
          return null;
        }
        const user = await authResponse.json();
        return user;
      },
    }),
  ],
});
