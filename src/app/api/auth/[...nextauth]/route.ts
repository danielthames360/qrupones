import prisma from '@/lib/prisma';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
          if (!credentials?.code) {
            throw new Error('Code is required');
          }

          // Validate code directly with Prisma
          const session = await prisma.sesionesClientes.findFirst({
            where: { Codigo: credentials.code },
          });

          if (!session || !session.Codigo) {
            throw new Error('Invalid credentials');
          }

          return {
            id: session.Codigo,
            email: '',
            name: session.Codigo,
            code: session.Codigo,
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
