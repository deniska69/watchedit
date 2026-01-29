import { getError } from '@/helpers';
import { signIn, signOut } from '@/lib/auth';

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
