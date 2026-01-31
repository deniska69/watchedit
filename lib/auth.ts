import NextAuth from 'next-auth';
import { ZodError } from 'zod';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from '@/lib/zod';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/user.actions';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'Password' },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error('Email и пароль обязательны');
          }

          const { email, password } = await signInSchema.parseAsync(credentials);

          const user = await getUser(email);
          if (!user) throw new Error('Неверный ввод данных #1');
          if (!user || 'error' in user) throw new Error('Неверный ввод данных #2');

          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) throw new Error('Неверный ввод данных #3');

          return { id: String(user.id), email: user.email };
        } catch (error) {
          if (error instanceof ZodError) return null;
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id as string;
      return session;
    },
  },
});
