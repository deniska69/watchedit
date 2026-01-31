import { auth } from '@/lib/auth';

export default async function Cabinet() {
  const session = await auth();

  if (!session) return <h1>Ошибка: нет авторизации</h1>;
  return <h1>Cabinet: {session.user?.email}</h1>;
}
