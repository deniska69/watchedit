'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store';

const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const setAuthState = useAuthStore((s) => s.setAuthState);

  useEffect(() => {
    console.log('');
    console.log({ status });
    console.log({ session });
    setAuthState(status, session ?? undefined);
  }, [status, session, setAuthState]);

  return <>{children}</>;
};

export default AppLoader;
