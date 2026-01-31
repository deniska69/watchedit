'use client';
import { login, registration } from '@/actions/auth.actions';
import { Div, HStack, Stack, WatchedItLogoIcon } from '@/components/ui';
import { getFormData } from '@/helpers';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Modal, ModalBody, ModalContent } from '@heroui/modal';
import { addToast } from '@heroui/toast';
import { FormEvent, useEffect, useState } from 'react';

export type TypeModeAuthModal = 'auth' | 'registration' | undefined;

interface IAuthModal {
  onClose: () => void;
  mode: TypeModeAuthModal;
}

type TypeFormData = {
  email: string;
  password: string;
  confirm_password?: string;
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function AuthModal({ mode, onClose }: IAuthModal) {
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState({});
  const [type, setType] = useState<TypeModeAuthModal>(undefined);

  useEffect(() => {
    setType(mode);
  }, [mode]);

  const isAuth = type === 'auth';

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isAuth = type === 'auth';
    const { email, password, confirm_password } = getFormData<TypeFormData>(e.currentTarget);

    if (!isValidEmail(email)) {
      return setErrors({ email: 'Введите корректную электронную почту' });
    }

    if (password.length < 4) {
      return setErrors({
        password: 'Пароль должен быть длинной не менее 4х символов',
      });
    }

    if (password.length > 32) {
      return setErrors({
        password: 'Пароль должен быть длинной не длине 32х символов',
      });
    }

    if (!isAuth && (!confirm_password || confirm_password.length < 4)) {
      return setErrors({
        confirm_password: 'Пароль должен быть длинной не менее 4х символов',
      });
    }

    if (!isAuth && (!confirm_password || confirm_password.length > 32)) {
      return setErrors({
        confirm_password: 'Пароль должен быть длинной не менее 32х символов',
      });
    }

    if (!isAuth && password !== confirm_password) {
      return setErrors({ confirm_password: 'Пароли должны сопадать' });
    }

    setLoad(true);

    if (!isAuth) {
      registration(email, password)
        .then(() => {
          addToast({ title: 'Успешная регистрациия', color: 'success' });
          onClose();
        })
        .catch((error) => {
          addToast({
            title: 'Ошибка регистрациия',
            description: error?.message,
            color: 'danger',
          });
        })
        .finally(() => setLoad(false));
    } else {
      login(email, password)
        .then(() => {
          addToast({ title: 'Успешная авторизация', color: 'success' });
          onClose();
        })
        .catch((error) => {
          addToast({
            title: 'Ошибка авторизации',
            description: error?.message,
            color: 'danger',
          });
        })
        .finally(() => setLoad(false));
    }
  };

  return (
    <Modal size="full" isOpen={!!type} onClose={onClose} hideCloseButton={false}>
      <ModalContent>
        <ModalBody className="flex flex-col gap-0 p-0 md:grid md:grid-cols-2">
          <Stack className="md:bg-primary/10 dark:md:bg-primary/25">
            <HStack className="items-center p-4 md:p-8">
              <WatchedItLogoIcon />
              <p className="font-bold text-inherit">WatchedIt</p>
            </HStack>
            <Div className="hidden flex-1 items-center justify-center pb-72 md:flex">
              <Div className="relative flex h-10 w-full max-w-md items-center justify-center">
                <h1 className="absolute top-0.5 right-13 text-4xl text-black/40 italic">{`"Watched it? Rate it!"`}</h1>
                <h1 className="text-primary absolute text-4xl italic">{`"Watched it? Rate it!"`}</h1>
              </Div>
            </Div>
          </Stack>
          <Stack className="flex-1 items-center justify-center px-12 pb-24">
            <h1 className="text-2xl font-bold uppercase">{isAuth ? 'Авторизация' : 'Регистрация'}</h1>
            <p className="text-muted text-sm">Введите электронную почту и пароль</p>

            <Form onSubmit={onSubmit} validationErrors={errors} className="mt-6 w-full gap-y-6 md:max-w-sm">
              <Input
                isRequired
                name="email"
                type="email"
                isDisabled={load}
                labelPlacement="outside"
                label="Электронная почта"
                placeholder="email@example.ru"
              />
              <Input
                isRequired
                minLength={4}
                label="Пароль"
                name="password"
                type="password"
                isDisabled={load}
                placeholder="●●●●●●"
                labelPlacement="outside"
                autoComplete="current-password"
              />
              {!isAuth ? (
                <Input
                  isRequired
                  minLength={4}
                  type="password"
                  isDisabled={load}
                  placeholder="●●●●●●"
                  name="confirm_password"
                  labelPlacement="outside"
                  label="Подтвердите пароль"
                  autoComplete="current-password"
                />
              ) : null}
              <Button type="submit" color="primary" isLoading={load} className="w-full">
                {isAuth ? 'Войти' : 'Зарегистрироваться'}
              </Button>

              <HStack className="w-full items-center">
                <Divider className="flex-1" />
                <span className="px-2 whitespace-nowrap">{isAuth ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}</span>
                <Divider className="flex-1" />
              </HStack>

              <Button className="w-full" variant="flat" onPress={() => setType(isAuth ? 'registration' : 'auth')}>
                {isAuth ? 'Зарегистрироваться' : 'Войти'}
              </Button>
            </Form>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
