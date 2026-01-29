import * as z from 'zod';

export const signInSchema = z.object({
  email: z.email({ error: 'Email обязателен' }),
  password: z
    .string({ error: 'Пароль обязателен' })
    .min(1, 'Пароль обязателен')
    .min(4, 'Пароль должен содержать не менее 4 символов')
    .max(32, 'Пароль должен содержать не более 32 символов'),
});
