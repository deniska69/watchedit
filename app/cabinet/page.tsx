'use client';
import { useAuthStore } from '@/store';

export default function Cabinet() {
  const user = useAuthStore((s) => s.user);
  const isAuth = useAuthStore((s) => s.isAuth);

  if (!isAuth || !user) return <h1>Ошибка: нет авторизации</h1>;
  return <h1>Cabinet: {user.email}</h1>;
}
