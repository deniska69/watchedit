import { getError } from '@/helpers';
import { signOut } from '@/lib/auth';

export async function logout() {
  try {
    return await signOut({ redirect: false });
  } catch (error) {
    throw getError(error || 'Ошибка выхода');
  }
}
