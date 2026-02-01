import { EnumUserRole } from '@/prisma/generated/prisma/enums';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      role: EnumUserRole;
    } & DefaultSession['user'];
  }
}
