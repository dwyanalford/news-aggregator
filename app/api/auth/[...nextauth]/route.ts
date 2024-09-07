// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Temporary type for user with password
type UserWithPassword = {
  id: string;
  name: string | null;
  email: string;
  password: string;
  emailVerified: Date | null;
  image: string | null;
};

const handler = NextAuth({
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
          // Find the user in the database with a raw query to include the password
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              name: true,
              email: true,
              password: true, // Ensure you're selecting the password
              emailVerified: true,
              image: true,
            },
          }) as UserWithPassword | null;

          if (user && user.password) {
            // Validate the password using bcrypt
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (isValid) {
              // Exclude the password before returning the user object
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
    strategy: 'jwt',  // Use 'jwt' strategy for MongoDB to manage sessions
  },
  debug: true, // Enable debug mode for more detailed logs
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
});

export { handler as GET, handler as POST };
