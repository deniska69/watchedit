import { EnumUserRole } from '@/prisma/generated/prisma/enums';
import { Session } from 'next-auth';

type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';

export type TypeUser = {
  id: number;
  email: string;
  name?: string;
  image?: string;
  role: EnumUserRole;
};

export interface IAuthStore {
  isAuth: boolean;
  status: SessionStatus;
  session?: Session;
  user?: TypeUser;
  setAuthState(status: SessionStatus, session?: Session): void;
  wipe(): void;
}
