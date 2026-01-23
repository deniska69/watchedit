'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@heroui/react';
import { usePathname } from 'next/navigation';
import ThemeSwitch from './ThemeSwitch';
import { Stack } from '@/components/ui';

const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

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
  const pathname = usePathname();
  return (
    <Navbar disableAnimation isBordered isBlurred={false}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" color="warning" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="h-full max-h-[calc(100%-var(--navbar-height))] pb-20">
        <Stack className="h-full justify-between">
          <Stack className="gap-y-3">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.title}-${index}`}>
                <Link
                  className="w-full"
                  color={pathname === item.href ? 'warning' : 'foreground'}
                  href={item.href}
                  size="lg"
                >
                  {item.title}
                </Link>
              </NavbarMenuItem>
            ))}
          </Stack>

          <ThemeSwitch />
        </Stack>
      </NavbarMenu>
    </Navbar>
  );
}
