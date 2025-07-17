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
  Anchor,
  Grid,
  Stack
} from "@mantine/core";
import { Refine } from "@refinedev/core";
// import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { supabaseClient } from "@/utility/supabaseClient";
import authProvider from "@/authProvider";
import { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import {
  IconDashboard,
  IconCalendarEvent,
  IconArticle,
  IconCategory,
  IconSettings,
  IconLogout,
  IconBrandTabler,
  IconUserShield,
  IconCalendarStats,
  IconCoin,
  IconPalette,
  IconUserStar,
  IconBuilding,
  IconShoppingCart,
  IconCamera
} from '@tabler/icons-react';

// Loading component
function LoadingSpinner() {
  return <div>Loading...</div>;
}

// Wrapper component for layout content
function LayoutContent({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push('/login');
  };

  const navLinks = [
    { icon: IconDashboard, label: "Dashboard", href: "/" },
    { icon: IconCalendarEvent, label: "Events", href: "/events" },
    { icon: IconArticle, label: "Blog Posts", href: "/blog-posts" },
    { icon: IconCategory, label: "Categories", href: "/categories" },
    { icon: IconUserShield, label: "Admin Dashboard", href: "/admin" },
    { icon: IconCalendarStats, label: "Organizer Portal", href: "/organizer" },
    { icon: IconCoin, label: "Sponsor Hub", href: "/sponsor" },
    { icon: IconPalette, label: "Designer Studio", href: "/designer" },
    { icon: IconUserStar, label: "Model Dashboard", href: "/model" },
    { icon: IconBuilding, label: "Venue Manager", href: "/venue" },
    { icon: IconShoppingCart, label: "Vendor Portal", href: "/vendor" },
    { icon: IconCamera, label: "Media Center", href: "/media" },
  ];

  return (
    <MantineProvider
      theme={{
        primaryColor: "blue",
        colorScheme: "light",
      }}
      withNormalizeCSS
      withGlobalStyles
    >
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          authProvider={authProvider}
          resources={[
            {
              name: "events",
              list: "/events",
              create: "/events/create",
              edit: "/events/edit/:id",
              show: "/events/:id",
            },
            {
              name: "blog_posts",
              list: "/blog-posts",
              create: "/blog-posts/create", 
              edit: "/blog-posts/edit/:id",
              show: "/blog-posts/:id",
            },
            {
              name: "categories",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Box style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <AppShell
              navbarOffsetBreakpoint="sm"
              asideOffsetBreakpoint="sm"
              navbar={
                <Navbar p="xs" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 220 }}>
                  <Navbar.Section grow>
                    <Group position="apart" mb="md" px="xs">
                      <Group spacing="xs">
                        <ThemeIcon size="lg" radius="md" variant="filled">
                          <IconBrandTabler size={20} />
                        </ThemeIcon>
                        <Text size="lg" weight={700} color="blue.6">
                          FashionOS
                        </Text>
                      </Group>
                    </Group>
                    
                    <Divider mb="sm" />
                    
                    {navLinks.map((link) => {
                      const IconComponent = link.icon;
                      const isActive = pathname === link.href;
                      
                      return (
                        <UnstyledButton
                          key={link.href}
                          component={Link}
                          href={link.href}
                          style={{ width: '100%', textDecoration: 'none' }}
                          mb={2}
                        >
                          <Box
                            sx={(theme) => ({
                              display: 'flex',
                              alignItems: 'center',
                              width: '100%',
                              padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
                              borderRadius: theme.radius.md,
                              backgroundColor: isActive ? theme.colors.blue[0] : 'transparent',
                              color: isActive ? theme.colors.blue[7] : theme.colors.gray[6],
                              '&:hover': {
                                backgroundColor: theme.colors.gray[0],
                                color: theme.colors.blue[6],
                              },
                              transition: 'all 0.2s ease',
                            })}
                          >
                            <IconComponent size={18} style={{ minWidth: 18 }} />
                            <Text size="sm" ml="sm" weight={isActive ? 500 : 400}>
                              {link.label}
                            </Text>
                          </Box>
                        </UnstyledButton>
                      );
                    })}
                  </Navbar.Section>
                  
                  <Navbar.Section>
                    <Divider mb="sm" />
                    <UnstyledButton
                      style={{ width: '100%' }}
                      px="sm"
                      py="xs"
                      sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: theme.radius.md,
                        '&:hover': {
                          backgroundColor: theme.colors.gray[0],
                          color: theme.colors.blue[6],
                        },
                        transition: 'all 0.2s ease',
                      })}
                    >
                      <IconSettings size={18} style={{ minWidth: 18 }} />
                      <Text size="sm" ml="sm">Settings</Text>
                    </UnstyledButton>
                    <UnstyledButton
                      style={{ width: '100%' }}
                      px="sm"
                      py="xs"
                      onClick={handleLogout}
                      sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: theme.radius.md,
                        color: theme.colors.red[6],
                        '&:hover': {
                          backgroundColor: theme.colors.red[0],
                        },
                        transition: 'all 0.2s ease',
                      })}
                    >
                      <IconLogout size={18} style={{ minWidth: 18 }} />
                      <Text size="sm" ml="sm">Logout</Text>
                    </UnstyledButton>
                  </Navbar.Section>
                </Navbar>
              }
              header={
                <Header height={{ base: 60, md: 70 }} p="md">
                  <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                      <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                      />
                    </MediaQuery>

                    <Container size="xl" style={{ flex: 1 }}>
                      <Group position="apart">
                        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                          <Group>
                            <ThemeIcon size="lg" radius="md" variant="light">
                              <IconBrandTabler size={20} />
                            </ThemeIcon>
                            <Text size="lg" weight={700} color="blue.6">
                              FashionOS
                            </Text>
                          </Group>
                        </MediaQuery>
                        
                        <Group>
                          <Badge variant="light" color="green" size="sm">
                            Live
                          </Badge>
                          <Text size="sm" color="gray.6">
                            Fashion Event Management
                          </Text>
                        </Group>
                      </Group>
                    </Container>
                  </div>
                </Header>
              }
              style={{ flex: 1 }}
            >
              <Container size="xl" p="md" style={{ flex: 1 }}>
                {children}
              </Container>
            </AppShell>
            
            {/* Footer Component */}
            <Box
              component="footer"
              sx={(theme) => ({
                backgroundColor: theme.colors.gray[0],
                borderTop: `1px solid ${theme.colors.gray[3]}`,
                marginTop: "auto",
                padding: `${theme.spacing.xl}px 0`,
                marginLeft: opened ? 0 : 0,
                [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                  marginLeft: 200, // Match navbar width on desktop
                },
                [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
                  marginLeft: 220, // Match navbar width on large screens
                },
              })}
            >
              <Container size="xl" px="md">
                <Box
                  sx={(theme) => ({
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: theme.spacing.xl,
                    marginBottom: theme.spacing.xl,
                    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                      gridTemplateColumns: "1fr",
                      gap: theme.spacing.md,
                    },
                  })}
                >
                  {/* Brand Section */}
                  <Box>
                    <Text size="lg" weight={600} color="dark" mb="xs">
                      FashionOS
                    </Text>
                    <Text size="sm" color="dimmed" mb="md">
                      Canada&apos;s premier fashion event management platform. 
                      Streamlining runway shows, fashion weeks, and industry events across North America.
                    </Text>
                  </Box>

                  {/* Quick Links */}
                  <Box>
                    <Text size="sm" weight={500} color="dark" mb="xs">
                      Platform
                    </Text>
                    <Anchor href="/events" size="sm" color="dimmed" style={{ display: "block", marginBottom: 4 }}>
                      Events
                    </Anchor>
                    <Anchor href="/blog-posts" size="sm" color="dimmed" style={{ display: "block", marginBottom: 4 }}>
                      Blog
                    </Anchor>
                    <Anchor href="/categories" size="sm" color="dimmed" style={{ display: "block" }}>
                      Categories
                    </Anchor>
                  </Box>

                  {/* Support */}
                  <Box>
                    <Text size="sm" weight={500} color="dark" mb="xs">
                      Support
                    </Text>
                    <Anchor href="/help" size="sm" color="dimmed" style={{ display: "block", marginBottom: 4 }}>
                      Help Center
                    </Anchor>
                    <Anchor href="/contact" size="sm" color="dimmed" style={{ display: "block", marginBottom: 4 }}>
                      Contact
                    </Anchor>
                    <Anchor href="/api-docs" size="sm" color="dimmed" style={{ display: "block" }}>
                      API Docs
                    </Anchor>
                  </Box>
                </Box>

                <Divider my="lg" />

                {/* Bottom Section */}
                <Box
                  sx={(theme) => ({
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: theme.spacing.md,
                    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                      flexDirection: "column",
                      alignItems: "flex-start",
                    },
                  })}
                >
                  <Text size="xs" color="dimmed">
                    © 2025 FashionOS. All rights reserved. Made in Canada 🇨🇦
                  </Text>
                  <Group spacing="md">
                    <Anchor href="/privacy" size="xs" color="dimmed">
                      Privacy Policy
                    </Anchor>
                    <Anchor href="/terms" size="xs" color="dimmed">
                      Terms of Service
                    </Anchor>
                    <Anchor href="/cookies" size="xs" color="dimmed">
                      Cookie Policy
                    </Anchor>
                  </Group>
                </Box>
              </Container>
            </Box>
          </Box>
          
        </Refine>
    </MantineProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>FashionOS - Event Management System</title>
        <meta name="description" content="Professional fashion event management platform" />
      </head>
      <body>
        <Suspense fallback={<LoadingSpinner />}>
          <LayoutContent>{children}</LayoutContent>
        </Suspense>
      </body>
    </html>
  );
}
