"use client";

import React, { useState } from 'react';
import { 
  AppShell, 
  Navbar, 
  Header, 
  Text, 
  MediaQuery, 
  Burger, 
  useMantineTheme,
  Group,
  Button,
  Box,
  NavLink,
  Badge,
  Avatar,
  Menu as MantineMenu,
  Divider,
  ThemeIcon
} from '@mantine/core';
import { useLogout } from "@refinedev/core";
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import { IconLogout, IconUser, IconSettings } from '@tabler/icons';

export const Menu: React.FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { mutate: logout } = useLogout();
  const { user, userRole } = useAuth();
  const { navigationItems } = useRoleBasedNavigation();
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (route: string) => {
    router.push(route);
    setOpened(false);
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: 'red',
      super_admin: 'red',
      organizer: 'blue',
      sponsor: 'green',
      designer: 'violet',
      model: 'pink',
      venue: 'orange',
      vendor: 'yellow',
      media: 'cyan',
      attendee: 'gray'
    };
    return colors[role] || 'gray';
  };

  return (
    <Header height={70} p="md">
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

        <Group position="apart" style={{ width: '100%' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Group>
              <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'violet', to: 'cyan' }}>
                <IconSparkles size={20} />
              </ThemeIcon>
              <Text size="xl" weight={700} gradient={{ from: 'violet', to: 'cyan' }} variant="gradient">
                FashionOS
              </Text>
            </Group>
          </Link>

          {/* Desktop Navigation */}
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Group spacing="md">
              {navigationItems.slice(0, 5).map((item) => (
                <Button
                  key={item.route}
                  variant={pathname === item.route ? 'filled' : 'subtle'}
                  compact
                  onClick={() => handleNavigation(item.route)}
                  leftIcon={item.icon}
                >
                  {item.label}
                </Button>
              ))}
            </Group>
          </MediaQuery>

          {/* User Menu */}
          <Group>
            {user && (
              <Badge color={getRoleBadgeColor(userRole || 'attendee')} variant="filled">
                {userRole?.toUpperCase()}
              </Badge>
            )}
            
            <MantineMenu shadow="md" width={200}>
              <MantineMenu.Target>
                <Button variant="subtle" compact>
                  <Group spacing="xs">
                    <Avatar size="sm" radius="xl" color="violet">
                      {user?.full_name?.charAt(0) || 'U'}
                    </Avatar>
                    <Text size="sm">{user?.full_name || 'User'}</Text>
                  </Group>
                </Button>
              </MantineMenu.Target>

              <MantineMenu.Dropdown>
                <MantineMenu.Label>Account</MantineMenu.Label>
                <MantineMenu.Item 
                  icon={<IconUser size={14} />}
                  onClick={() => router.push('/profile')}
                >
                  Profile
                </MantineMenu.Item>
                <MantineMenu.Item 
                  icon={<IconSettings size={14} />}
                  onClick={() => router.push('/settings')}
                >
                  Settings
                </MantineMenu.Item>
                
                <MantineMenu.Divider />
                
                <MantineMenu.Item 
                  color="red" 
                  icon={<IconLogout size={14} />}
                  onClick={() => logout()}
                >
                  Logout
                </MantineMenu.Item>
              </MantineMenu.Dropdown>
            </MantineMenu>
          </Group>
        </Group>
      </div>

      {/* Mobile Navigation Drawer */}
      <Navbar
        p="md"
        hiddenBreakpoint="sm"
        hidden={!opened}
        width={{ sm: 200, lg: 300 }}
        style={{
          position: 'fixed',
          top: 70,
          left: 0,
          height: 'calc(100vh - 70px)',
          zIndex: 1000,
          display: opened ? 'block' : 'none'
        }}
      >
        {navigationItems.map((item) => (
          <NavLink
            key={item.route}
            label={item.label}
            icon={item.icon}
            active={pathname === item.route}
            onClick={() => handleNavigation(item.route)}
            childrenOffset={28}
          >
            {item.children?.map((child) => (
              <NavLink
                key={child.route}
                label={child.label}
                icon={child.icon}
                active={pathname === child.route}
                onClick={() => handleNavigation(child.route)}
              />
            ))}
          </NavLink>
        ))}
      </Navbar>
    </Header>
  );
};