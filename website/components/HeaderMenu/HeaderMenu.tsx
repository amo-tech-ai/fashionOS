'use client';

import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Menu,
  Avatar,
  Text,
  UnstyledButton,
  Collapse,
  Center,
  Image,
  Container,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconCalendar,
  IconChevronDown,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import classes from './HeaderMenu.module.css';
import { ThemeToggle } from '../ThemeToggle';

const mockdata = [
  {
    link: '/events',
    label: 'Events',
    links: [
      { link: '/events/fashion-week', label: 'Fashion Week' },
      { link: '/events/runway-shows', label: 'Runway Shows' },
      { link: '/events/exhibitions', label: 'Exhibitions' },
      { link: '/events/workshops', label: 'Workshops' },
    ],
  },
  {
    link: '/designers',
    label: 'Designers',
    links: [
      { link: '/designers/featured', label: 'Featured Designers' },
      { link: '/designers/emerging', label: 'Emerging Talent' },
      { link: '/designers/directory', label: 'Designer Directory' },
      { link: '/designers/collaborations', label: 'Collaborations' },
    ],
  },
  {
    link: '/collections',
    label: 'Collections',
    links: [
      { link: '/collections/current-season', label: 'Current Season' },
      { link: '/collections/archive', label: 'Archive' },
      { link: '/collections/lookbooks', label: 'Lookbooks' },
      { link: '/collections/editorials', label: 'Editorials' },
    ],
  },
  {
    link: '/about',
    label: 'About',
    links: [
      { link: '/about/mission', label: 'Our Mission' },
      { link: '/about/team', label: 'Team' },
      { link: '/about/partners', label: 'Partners' },
      { link: '/about/contact', label: 'Contact' },
    ],
  },
];

interface HeaderMenuProps {
  children?: React.ReactNode;
}

export function HeaderMenu({ children }: HeaderMenuProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, setLinksOpened] = useState<Record<string, boolean>>({});

  const toggleLinks = (label: string) => {
    setLinksOpened((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const links = mockdata.map((item) => {
    const menuItems = item.links?.map((subLink) => (
      <Menu.Item key={subLink.link} component={Link} href={subLink.link}>
        {subLink.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={item.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <Link href={item.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{item.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={item.label} href={item.link} className={classes.link}>
        {item.label}
      </Link>
    );
  });

  return (
    <Box>
      <header className={classes.header}>
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%" align="center">
            <Link href="/" className={classes.logo} aria-label="Fashionistas Home">
              <Image 
                src="/fashionistas.svg" 
                alt="Fashionistas" 
                h={45}
                w="auto"
                fit="contain"
                className={classes.logoImage}
              />
            </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            {links}
          </Group>

          <Group visibleFrom="sm">
            <ThemeToggle />

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton className={classes.userButton}>
                  <Group gap={7}>
                    <Avatar size={30} color="dark" radius="xl">JD</Avatar>
                    <Text size="sm" fw={500} className={classes.userName}>
                      John Doe
                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
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
          </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <Image 
            src="/fashionistas.svg" 
            alt="Fashionistas" 
            h={35}
            w="auto"
            fit="contain"
            style={{ filter: 'var(--logo-filter)' }}
          />
        }
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          {mockdata.map((item) => (
            <div key={item.label}>
              <UnstyledButton className={classes.linkMobile} onClick={() => toggleLinks(item.label)}>
                <Group justify="space-between" gap={0}>
                  <Text>{item.label}</Text>
                  {item.links && (
                    <IconChevronDown
                      size={14}
                      stroke={1.5}
                      style={{
                        transform: linksOpened[item.label] ? 'rotate(180deg)' : 'none',
                        transition: 'transform 200ms ease',
                      }}
                    />
                  )}
                </Group>
              </UnstyledButton>
              {item.links && (
                <Collapse in={linksOpened[item.label]}>
                  <div className={classes.linksMobile}>
                    {item.links.map((subLink) => (
                      <Link
                        key={subLink.link}
                        href={subLink.link}
                        className={classes.subLinkMobile}
                        onClick={closeDrawer}
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </Collapse>
              )}
            </div>
          ))}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
      
      {children}
    </Box>
  );
}
