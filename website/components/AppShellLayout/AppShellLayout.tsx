'use client';

import { 
  AppShell, 
  Burger, 
  Group, 
  Title, 
  ActionIcon, 
  useMantineColorScheme,
  Menu,
  Avatar,
  Text,
  Divider,
  Container,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconSun, 
  IconMoon, 
  IconUser,
  IconSettings,
  IconLogout,
  IconCalendar,
} from '@tabler/icons-react';
import Link from 'next/link';
import classes from './AppShellLayout.module.css';

interface AppShellLayoutProps {
  children: React.ReactNode;
}

export function AppShellLayout({ children }: AppShellLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      header={{ height: 80 }}
      padding={0}
    >
      <AppShell.Header className={classes.header}>
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between">
            <Link href="/" className={classes.logo}>
              <Title 
                order={3} 
                fw={300} 
                tt="uppercase" 
                style={{ letterSpacing: '0.1em' }}
              >
                FashionOS
              </Title>
            </Link>

            <Group gap="xl" visibleFrom="sm">
              <Link href="/events" className={classes.navLink}>
                Events
              </Link>
              <Link href="/designers" className={classes.navLink}>
                Designers
              </Link>
              <Link href="/collections" className={classes.navLink}>
                Collections
              </Link>
              <Link href="/about" className={classes.navLink}>
                About
              </Link>
            </Group>

            <Group gap="sm">
              <ActionIcon
                onClick={() => toggleColorScheme()}
                variant="subtle"
                size="lg"
                aria-label="Toggle color scheme"
                color="gray"
              >
                {colorScheme === 'dark' ? (
                  <IconSun size={20} stroke={1.5} />
                ) : (
                  <IconMoon size={20} stroke={1.5} />
                )}
              </ActionIcon>

              <Menu shadow="md" width={220}>
                <Menu.Target>
                  <ActionIcon variant="subtle" size="lg" aria-label="User menu" color="gray">
                    <IconUser size={20} stroke={1.5} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item leftSection={<Avatar size="sm" color="dark" radius="xl">JD</Avatar>}>
                    <div>
                      <Text size="sm" fw={500}>John Doe</Text>
                      <Text size="xs" c="dimmed">john@fashionos.com</Text>
                    </div>
                  </Menu.Item>
                  
                  <Divider my="xs" />
                  
                  <Menu.Item
                    leftSection={<IconCalendar size={16} stroke={1.5} />}
                    component={Link}
                    href="/events"
                  >
                    My Events
                  </Menu.Item>
                  
                  <Menu.Item
                    leftSection={<IconSettings size={16} stroke={1.5} />}
                    component={Link}
                    href="/settings"
                  >
                    Settings
                  </Menu.Item>
                  
                  <Divider my="xs" />
                  
                  <Menu.Item
                    color="red"
                    leftSection={<IconLogout size={16} stroke={1.5} />}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
                color="gray"
              />
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
