'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Button,
} from '@heroui/react';
import { usePathname } from 'next/navigation';
import ThemeSwitch from './ThemeSwitch';
import { Div, Stack, WatchedItLogoIcon } from '@/components/ui';
import Link from 'next/link';
import { useState } from 'react';
import AuthModal, { TypeModeAuthModal } from '@/components/auth/AuthModal';
import { useSession } from 'next-auth/react';
import WidgetAccountmenu from '@/components/layout/WidgetAccountmenu';

const menuItems = [
  {
    title: 'Главная',
    href: '/',
  },
  {
    title: 'О нас',
    href: '/about',
  },
  {
    title: 'Вопросы и ответы',
    href: '/faq',
  },
];

export default function LayoutHeader() {
  const { status } = useSession();
  const [modeAuthModal, setModeAuthModal] = useState<TypeModeAuthModal>();

  const isAuth = status === 'authenticated';

  return (
    <>
      <Navbar disableAnimation isBordered isBlurred={false} className="bg-rootheader">
        <MobileHeader isAuth={isAuth} onOpenAuth={setModeAuthModal} />
        <DesktopHeader isAuth={isAuth} onOpenAuth={setModeAuthModal} />
      </Navbar>
      <AuthModal onClose={() => setModeAuthModal(undefined)} mode={modeAuthModal} />
    </>
  );
}

interface IPropsHeader {
  isAuth: boolean;
  onOpenAuth: (value: Exclude<TypeModeAuthModal, undefined>) => void;
}

const MobileHeader = ({ isAuth, onOpenAuth }: IPropsHeader) => {
  const pathname = usePathname();

  return (
    <>
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="md:hidden" justify="center">
        <NavbarBrand className="mr-4" as={Link} href="/">
          <WatchedItLogoIcon />
          <p className="font-bold">WatchedIt</p>
        </NavbarBrand>
      </NavbarContent>

      {isAuth ? (
        <Div className="md:hidden">
          <WidgetAccountmenu />
        </Div>
      ) : (
        <NavbarContent className="md:hidden" justify="end">
          <NavbarItem>
            <Button href="#" variant="flat" color="warning" onPress={() => onOpenAuth('auth')}>
              Войти
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu className="h-full max-h-[calc(100%-var(--navbar-height))] bg-transparent pt-6 pb-20 backdrop-blur-2xl">
        <Stack className="h-full justify-between">
          <Stack className="gap-y-3">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.title}-${index}`}>
                <Link href={item.href} data-active={pathname === item.href ? 'true' : undefined}>
                  {item.title}
                </Link>
              </NavbarMenuItem>
            ))}
          </Stack>

          <ThemeSwitch />
        </Stack>
      </NavbarMenu>
    </>
  );
};

const DesktopHeader = ({ isAuth, onOpenAuth }: IPropsHeader) => {
  const pathname = usePathname();

  return (
    <>
      <NavbarContent className="hidden gap-4 md:flex" justify="center">
        <NavbarBrand className="mr-4" as={Link} href="/">
          <WatchedItLogoIcon />
          <p className="font-bold text-inherit">WatchedIt</p>
        </NavbarBrand>

        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.title}-${index}`}>
            <Link href={item.href} data-active={pathname === item.href ? 'true' : undefined}>
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {isAuth ? (
        <Div className="hidden md:flex">
          <WidgetAccountmenu />
        </Div>
      ) : (
        <NavbarContent className="hidden md:flex" justify="end">
          <NavbarItem>
            <Button variant="light" onPress={() => onOpenAuth('auth')}>
              Войти
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="flat" color="warning" onPress={() => onOpenAuth('registration')}>
              Регистрация
            </Button>
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>
      )}
    </>
  );
};
