import { Center, Title } from '@mantine/core';
import { PropsWithChildren } from 'react';

export function ScreenTitle({ children }: PropsWithChildren) {
  return (
    <Center mb="lg">
      <Title>{children}</Title>
    </Center>
  );
}
