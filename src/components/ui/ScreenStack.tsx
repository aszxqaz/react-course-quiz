import { Stack } from '@mantine/core';
import { PropsWithChildren } from 'react';

export function ScreenStack({ children }: PropsWithChildren) {
  return <Stack pt="lg">{children}</Stack>;
}
