import prisma from '@/lib/prisma';
import { isValidUUID } from '@/lib/api-utils';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Session duration: 1 year in seconds
const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;

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
          // Validate input with Zod
          if (!credentials?.code || !isValidUUID(credentials.code)) {
            return null;
          }

          // Validate code directly with Prisma
          const session = await prisma.sesionesClientes.findFirst({
            where: { Codigo: credentials.code },
          });

          if (!session || !session.Codigo) {
            return null;
          }

          return {
            id: session.Codigo,
            email: '',
            name: session.Codigo,
            code: session.Codigo,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.code = user.code;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.code = token.code as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: ONE_YEAR_IN_SECONDS,
  },
  pages: {
    signIn: '/customers',
  },
});

export { handler as GET, handler as POST };
