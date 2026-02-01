import { HStack, Stack } from '@/components/ui';
import { Card } from '@heroui/card';
import { Avatar } from '@heroui/avatar';
import { prisma } from '@/lib/prisma';
import { isNumber } from '@/helpers';

interface IProfile {
  params: Promise<{ id: string }>;
}

export default async function Profile({ params }: IProfile) {
  const { id } = await params;

  console.log({ id }, typeof id, isNumber(id));

  if (!isNumber(id)) return <div>Некорректный ID</div>;

  const user = await prisma.user.findUnique({ where: { id: Number(id) } });

  console.log(user);

  // if (!user) return notFound();

  return (
    <Card className="w-full p-4">
      <HStack className="gap-x-3">
        <Avatar size="lg" src={user?.image ?? undefined} />
        <Stack>
          <span>{`Имя: ${user?.name}`}</span>
          <span>{`Email: ${user?.email}`}</span>
          <span>{`Роль: ${user?.role}`}</span>
        </Stack>
      </HStack>
    </Card>
  );
}
