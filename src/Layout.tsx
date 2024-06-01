import { AppShell, Group, Title } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { ColorSchemeSwitcher } from './components';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header px="md">
        <Group h="100%" justify="space-between">
          <Group>
            <Title fz="lg">Quiz App</Title>
          </Group>
          <Group>
            <ColorSchemeSwitcher />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
