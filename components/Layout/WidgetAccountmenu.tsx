import { HStack } from '@/components/ui';
import { useAuthStore } from '@/store';
import { addToast, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarContent } from '@heroui/react';
import { signOut, useSession } from 'next-auth/react';

const WidgetAccountMenu = () => {
  const { data } = useSession();
  const { setAuthState } = useAuthStore();

  if (!data?.user) return null;

  const handleLogout = () => {
    signOut()
      .then(() => {
        addToast({ title: 'Успешный выход', color: 'success' });
        setAuthState('unauthenticated');
      })
      .catch((error) => {
        addToast({
          title: 'Ошибка выхода',
          description: error?.message,
          color: 'danger',
        });
      });
  };

  return (
    <NavbarContent justify="end">
      <Dropdown>
        <DropdownTrigger className="cursor-pointer">
          <HStack className="items-center gap-x-2">
            <Avatar size="sm" color="primary" />
            <span className="text-primary font-bold uppercase md:hidden">{data.user.email?.split('@')[0]}</span>
            <span className="text-primary hidden font-bold uppercase md:flex">{data.user.email}</span>
          </HStack>
        </DropdownTrigger>

        <DropdownMenu>
          <DropdownItem key="logout" onPress={handleLogout}>
            Выход
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
};

export default WidgetAccountMenu;
