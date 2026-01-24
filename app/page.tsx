import { Stack } from '@/components/ui';
import Image from 'next/image';

export default function Home() {
  return (
    <Stack className="flex w-full flex-1 items-center justify-center">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />
    </Stack>
  );
}
