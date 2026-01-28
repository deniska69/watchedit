'use server';

import { prisma } from '@/lib/db';

export async function registration(email: string, password: string) {
  try {
    const user = prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  } catch (error) {
    const message = 'Ошибка регистрации\n' + JSON.stringify(error);
    return { error: message };
  }
}
