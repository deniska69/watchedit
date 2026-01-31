import { create } from 'zustand';
import { Session } from 'next-auth';

type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';

interface IAuthStore {
  isAuth: boolean;
  status: SessionStatus;
  session?: Session;
  setAuthState(status: SessionStatus, session?: Session): void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isAuth: false,
  status: 'loading',
  session: undefined,
  setAuthState(status, session) {
    set({
      isAuth: status === 'authenticated',
      status,
      session,
    });
  },
}));
