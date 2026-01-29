import { getError } from '@/helpers';
import { prisma } from '@/lib/prisma';

export async function getUser(email: string) {
  try {
    return await prisma.user.findFirst({ where: { email } });
  } catch (error) {
    throw getError(error || 'Ошибка загрузки пользователя');
  }
}
