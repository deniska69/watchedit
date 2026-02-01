import { HStack } from '@/components/ui';
import { useAuthStore } from '@/store';
import { addToast, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarContent } from '@heroui/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const WidgetAccountMenu = () => {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const wipeAuthStore = useAuthStore((s) => s.wipe);

  if (!user) return null;

  const handleLogout = () => {
    signOut({ redirect: false })
      .then(async () => {
        addToast({ title: 'Успешный выход', color: 'success' });
        wipeAuthStore();
        document.body.classList.add('fade-out');
        await new Promise((r) => setTimeout(r, 300));
        router.push('/');
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
        <DropdownTrigger className="group cursor-pointer">
          <HStack className="items-center gap-x-2">
            <Avatar
              size="sm"
              // color="primary"
              className="bg-primary group-hover:bg-primary/80 group-hover:text-white/80"
            />
            <span className="text-primary group-hover:text-primary/80 font-bold uppercase md:hidden">
              {user.email?.split('@')[0]}
            </span>
            <span className="text-primary group-hover:text-primary/80 hidden font-bold uppercase md:flex">
              {user.email}
            </span>
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
