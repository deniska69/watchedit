import { IAuthStore, TypeUser } from '@/types/store';
import { create } from 'zustand';

export const useAuthStore = create<IAuthStore>((set) => ({
  isAuth: false,
  status: 'loading',
  session: undefined,
  user: undefined,
  setAuthState(status, session) {
    set({
      isAuth: status === 'authenticated',
      status,
      session,
      user: status === 'authenticated' ? (session?.user as TypeUser) : undefined,
    });
  },
  wipe() {
    set({
      isAuth: false,
      status: 'unauthenticated',
      session: undefined,
      user: undefined,
    });
  },
}));
