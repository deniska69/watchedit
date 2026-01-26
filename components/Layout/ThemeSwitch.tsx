'use client';
import { MoonIcon, SunIcon } from '@/components/ui';
import { Switch } from '@heroui/react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useEffectEvent } from 'react';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const onMount = useEffectEvent(() => setMounted(true));

  useEffect(() => {
    onMount();
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      size="lg"
      color="warning"
      endContent={<MoonIcon />}
      startContent={<SunIcon />}
      isSelected={theme === 'light'}
      onValueChange={(isLight) => setTheme(isLight ? 'light' : 'dark')}
    />
  );
}
