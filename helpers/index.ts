export function getFormData<T extends Record<string, unknown>>(
  form: HTMLFormElement,
): T {
  return Object.fromEntries(new FormData(form)) as T;
}
