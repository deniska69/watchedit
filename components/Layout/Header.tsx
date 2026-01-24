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
import { Stack } from '@/components/ui';
import { Fragment } from 'react';
import Link from 'next/link';

const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

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
  return (
    <Navbar disableAnimation isBordered isBlurred={false}>
      <MobileHeader />
      <DesktopHeader />
    </Navbar>
  );
}

const MobileHeader = () => {
  const pathname = usePathname();

  return (
    <Fragment>
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="md:hidden" justify="center">
        <NavbarBrand className="mr-4 text-white" as={Link} href="/">
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="md:hidden" justify="end">
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Войти
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="h-full max-h-[calc(100%-var(--navbar-height))] pt-6 pb-20">
        <Stack className="h-full justify-between">
          <Stack className="gap-y-3">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.title}-${index}`}>
                <Link
                  className="w-full"
                  color={pathname === item.href ? 'warning' : 'foreground'}
                  href={item.href}
                >
                  {item.title}
                </Link>
              </NavbarMenuItem>
            ))}
          </Stack>

          <ThemeSwitch />
        </Stack>
      </NavbarMenu>
    </Fragment>
  );
};

const DesktopHeader = () => {
  const pathname = usePathname();

  return (
    <Fragment>
      <NavbarContent className="hidden gap-4 md:flex" justify="center">
        <NavbarBrand className="mr-4 text-white" as={Link} href="/">
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>

        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.title}-${index}`}>
            <Link
              color={pathname === item.href ? 'warning' : 'foreground'}
              href={item.href}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarItem>
          <Link href="#" color="foreground">
            Войти
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Регистрация
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Fragment>
  );
};
