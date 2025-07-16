"use client";

import "@/styles/global.css";
import { 
  MantineProvider, 
  AppShell, 
  Header, 
  Text, 
  Burger, 
  MediaQuery, 
  useMantineTheme,
  Navbar,
  NavLink,
  Group,
  ThemeIcon,
  UnstyledButton,
  Box,
  Divider,
  Badge,
  Container,
  Anchor
} from "@mantine/core";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { supabaseClient } from "@/utility/supabaseClient";
import authProvider from "@/authProvider";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  IconDashboard,
  IconCalendarEvent,
  IconArticle,
  IconCategory,
  IconSettings,
  IconLogout,
  IconBrandTabler
} from '@tabler/icons-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const pathname = usePathname();

  const navItems = [
    { icon: IconDashboard, label: 'Dashboard', href: '/', color: 'blue' },
    { icon: IconCalendarEvent, label: 'Events', href: '/events', color: 'green' },
    { icon: IconArticle, label: 'Blog Posts', href: '/blog-posts', color: 'orange' },
    { icon: IconCategory, label: 'Categories', href: '/categories', color: 'grape' },
  ];

  return (
    <html lang="en">
      <body>
        <MantineProvider theme={{ colorScheme: 'light' }}>
          <RefineKbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(supabaseClient)}
              liveProvider={liveProvider(supabaseClient)}
              authProvider={authProvider}
              options={{ 
                liveMode: "auto",
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
              resources={[
                {
                  name: "events",
                  list: "/events",
                  create: "/events/create",
                  edit: "/events/edit/:id",
                  show: "/events/show/:id",
                },
                {
                  name: "blog-posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                },
              ]}
            >
              <AppShell
                padding="md"
                navbar={
                  <Navbar width={{ base: 300 }} p="xs" hiddenBreakpoint="sm" hidden={!opened}>
                    <Navbar.Section grow>
                      {navItems.map((item) => (
                        <NavLink
                          key={item.label}
                          component={Link}
                          href={item.href}
                          label={item.label}
                          icon={
                            <ThemeIcon color={item.color} variant="light">
                              <item.icon size={16} />
                            </ThemeIcon>
                          }
                          active={pathname === item.href || pathname?.startsWith(item.href + '/')}
                          onClick={() => setOpened(false)}
                          style={{ borderRadius: theme.radius.md }}
                          mb="xs"
                        />
                      ))}
                    </Navbar.Section>
                    
                    <Divider my="sm" />
                    
                    <Navbar.Section>
                      <NavLink
                        component={Link}
                        href="/settings"
                        label="Settings"
                        icon={
                          <ThemeIcon color="gray" variant="light">
                            <IconSettings size={16} />
                          </ThemeIcon>
                        }
                        mb="xs"
                      />
                      <NavLink
                        component={Link}
                        href="/logout"
                        label="Logout"
                        icon={
                          <ThemeIcon color="red" variant="light">
                            <IconLogout size={16} />
                          </ThemeIcon>
                        }
                      />
                    </Navbar.Section>
                  </Navbar>
                }
                header={
                  <Header height={60} p="xs">
                    <Group sx={{ height: '100%' }} position="apart">
                      <Group>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                          <Burger
                            opened={opened}
                            onClick={() => setOpened((o) => !o)}
                            size="sm"
                            color={theme.colors.gray[6]}
                          />
                        </MediaQuery>
                        <Group spacing="xs">
                          <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                            <IconBrandTabler size={28} />
                          </ThemeIcon>
                          <Text size="xl" weight={700}>FashionOS</Text>
                          <Badge size="sm" variant="outline" color="gray">Admin</Badge>
                        </Group>
                      </Group>
                      
                      <Group>
                        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                          <Group spacing="lg">
                            {navItems.map((item) => (
                              <UnstyledButton
                                key={item.label}
                                component={Link}
                                href={item.href}
                                sx={(theme) => ({
                                  display: 'block',
                                  padding: '8px 12px',
                                  borderRadius: theme.radius.sm,
                                  color: pathname === item.href || pathname?.startsWith(item.href + '/') 
                                    ? theme.colors[item.color][6]
                                    : theme.colors.gray[7],
                                  fontWeight: pathname === item.href || pathname?.startsWith(item.href + '/') ? 600 : 400,
                                  
                                  '&:hover': {
                                    backgroundColor: theme.colors.gray[0],
                                  },
                                })}
                              >
                                {item.label}
                              </UnstyledButton>
                            ))}
                          </Group>
                        </MediaQuery>
                        
                        <Divider orientation="vertical" mx="sm" />
                        
                        <UnstyledButton
                          sx={(theme) => ({
                            display: 'block',
                            padding: '8px 12px',
                            borderRadius: theme.radius.sm,
                            color: theme.colors.gray[7],
                            
                            '&:hover': {
                              backgroundColor: theme.colors.gray[0],
                            },
                          })}
                        >
                          Logout
                        </UnstyledButton>
                      </Group>
                    </Group>
                  </Header>
                }
                styles={{
                  main: { 
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    minHeight: 'calc(100vh - 60px)'
                  },
                }}
              >
                {children}
                <Box
                  component="footer"
                  sx={(theme) => ({
                    backgroundColor: theme.colors.gray[0],
                    borderTop: `1px solid ${theme.colors.gray[2]}`,
                    padding: theme.spacing.lg,
                    marginTop: 'auto',
                  })}
                >
                  <Container size="xl">
                    <Group position="apart">
                      <Text size="sm" color="dimmed">
                        © 2025 FashionOS. All rights reserved.
                      </Text>
                      <Group spacing="xs">
                        <Text size="sm" color="dimmed">Built with</Text>
                        <Anchor href="https://refine.dev" size="sm" target="_blank">Refine</Anchor>
                        <Text size="sm" color="dimmed">•</Text>
                        <Anchor href="https://mantine.dev" size="sm" target="_blank">Mantine</Anchor>
                        <Text size="sm" color="dimmed">•</Text>
                        <Anchor href="https://supabase.com" size="sm" target="_blank">Supabase</Anchor>
                      </Group>
                    </Group>
                  </Container>
                </Box>
              </AppShell>
              <RefineKbar />
            </Refine>
          </RefineKbarProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
