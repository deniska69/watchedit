'use server';

import { getError } from '@/helpers';
import { signIn, signOut } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function registration(email: string, password: string) {
  if (password.length < 4) {
    throw new Error('Пароль должен быть длинной не менее 4 символов');
  }

  if (password.length > 32) {
    throw new Error('Пароль должен быть длинной не более 32 символов');
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Пользователь с таким Email уже существует');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });
    return user;
  } catch (error) {
    throw getError(error || 'Ошибка регистрации #0');
  }
}

export async function login(email: string, password: string) {
  try {
    return await signIn('credentials', { email, password, redirect: false });
  } catch (error) {
    throw getError(error || 'Ошибка авторизации');
  }
}

export async function logout() {
  try {
    return await signOut({ redirect: false });
  } catch (error) {
    throw getError(error || 'Ошибка выхода');
  }
}
