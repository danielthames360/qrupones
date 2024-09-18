import { endpoints } from '@/constants/endpoints';
import { ApiResponseInterface, SessionInterface } from '@/interfaces';
import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const backendKey = process.env.NEXT_PUBLIC_QRUPONES_NOTIFICATION_API_KEY;

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        code: { label: 'code', type: 'text', placeholder: '' },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.get<ApiResponseInterface<SessionInterface>>(
            `${endpoints.auth.login}${credentials!.code}`,
            {
              headers: {
                Authorization: `Bearer ${backendKey}`,
              },
            }
          );

          if (!data.success || !data.data?.Codigo) throw new Error('Invalid credentials');

          return {
            id: data.data.Codigo,
            email: '',
            name: data.data.Codigo,
            code: data.data.Codigo,
          };
        } catch (e) {
          console.log({ e });
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.code = user.code;
      }
      // console.log('jwt server', token);

      return token;
    },
    async session({ session, token }) {
      // console.log('session server', token);
      // console.log(session);

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
});
export { handler as GET, handler as POST };
