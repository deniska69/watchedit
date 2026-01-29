import bcrypt from 'bcryptjs';

export function getFormData<T extends Record<string, unknown>>(form: HTMLFormElement): T {
  return Object.fromEntries(new FormData(form)) as T;
}

export async function saltAndHashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export function getError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  } else {
    return String(error);
  }
}
