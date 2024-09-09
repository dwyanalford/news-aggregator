// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions, User, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';  // Import JWT type for token
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

type UserWithPassword = {
  id: string;
  name: string | null;
  email: string;
  password: string;
  emailVerified: Date | null;
  image: string | null;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
              emailVerified: true,
              image: true,
            },
          }) as UserWithPassword | null;

          if (user && user.password) {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (isValid) {
              console.log('User authenticated successfully:', user);
              const { password, ...userWithoutPassword } = user;
              return userWithoutPassword;
            }
          }
          return null;
        } catch (error) {
          console.error('Error during user authentication', error);
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | undefined }): Promise<JWT> {
      if (user && user.id) {  // Safely check if user and user.id are defined
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token && typeof token.id === 'string') {  // Ensure token.id is a string
        session.user.id = token.id;
      }
      return session;
    },
  },
  debug: true,
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
