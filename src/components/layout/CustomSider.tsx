"use client";

import React, { useState } from "react";
import {
  Box,
  ScrollArea,
  Navbar,
  Group,
  ActionIcon,
  Tooltip,
  Text,
  Divider,
  Stack,
  Collapse,
  UnstyledButton,
  ThemeIcon,
  Badge,
  Skeleton,
} from "@mantine/core";
import {
  IconMenu2,
  IconChevronLeft,
  IconChevronRight,
  IconHome,
  IconCalendarEvent,
  IconUsers,
  IconBuildingStore,
  IconCurrencyDollar,
  IconPalette,
  IconCamera,
  IconBuilding,
  IconShoppingCart,
  IconNews,
  IconFileText,
  IconCategory,
  IconChartBar,
  IconSettings,
  IconBriefcase,
  IconTicket,
  IconClipboardList,
  IconCrown,
  IconLogout,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLogout, useGetIdentity } from "@refinedev/core";
import { useLocalStorage } from "@mantine/hooks";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  link?: string;
  role?: string[];
  badge?: string;
  badgeColor?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <IconHome size={20} />,
    link: "/",
  },
  {
    label: "Events",
    icon: <IconCalendarEvent size={20} />,
    link: "/events",
    badge: "New",
    badgeColor: "blue",
  },
  // Admin Section
  {
    label: "Administration",
    icon: <IconCrown size={20} />,
    role: ["admin", "super_admin"],
    children: [
      {
        label: "Admin Panel",
        icon: <IconSettings size={20} />,
        link: "/admin",
      },
      {
        label: "User Management",
        icon: <IconUsers size={20} />,
        link: "/admin/users",
      },
    ],
  },
  // Organizer Section  
  {
    label: "Organizer Hub",
    icon: <IconClipboardList size={20} />,
    link: "/organizer",
    role: ["organizer", "admin"],
    children: [
      {
        label: "My Events",
        icon: <IconCalendarEvent size={20} />,
        link: "/organizer/events",
      },
      {
        label: "Event Templates",
        icon: <IconFileText size={20} />,
        link: "/organizer/templates",
      },
    ],
  },
  // Sponsor Section
  {
    label: "Sponsor Portal",
    icon: <IconCurrencyDollar size={20} />,
    link: "/sponsor",
    role: ["sponsor", "admin"],
    children: [
      {
        label: "My Sponsorships",
        icon: <IconBriefcase size={20} />,
        link: "/sponsor/sponsorships",
      },
      {
        label: "ROI Analytics",
        icon: <IconChartBar size={20} />,
        link: "/sponsor/roi",
        badge: "Pro",
        badgeColor: "green",
      },
      {
        label: "Lead Management",
        icon: <IconUsers size={20} />,
        link: "/sponsor/leads",
      },
    ],
  },
  // Model Section
  {
    label: "Model Hub",
    icon: <IconCamera size={20} />,
    link: "/model",
    role: ["model", "admin"],
    children: [
      {
        label: "My Portfolio",
        icon: <IconCamera size={20} />,
        link: "/model/portfolio",
      },
      {
        label: "Bookings",
        icon: <IconTicket size={20} />,
        link: "/model/bookings",
      },
      {
        label: "Castings",
        icon: <IconUsers size={20} />,
        link: "/model/castings",
      },
    ],
  },
  // Designer Section
  {
    label: "Designer Studio",
    icon: <IconPalette size={20} />,
    link: "/designer",
    role: ["designer", "admin"],
    children: [
      {
        label: "Collections",
        icon: <IconPalette size={20} />,
        link: "/designer/collections",
      },
      {
        label: "Runway Shows",
        icon: <IconCalendarEvent size={20} />,
        link: "/designer/shows",
      },
    ],
  },
  // Venue Section
  {
    label: "Venue Manager",
    icon: <IconBuilding size={20} />,
    link: "/venue",
    role: ["venue", "admin"],
    children: [
      {
        label: "My Venues",
        icon: <IconBuilding size={20} />,
        link: "/venue/spaces",
      },
      {
        label: "Bookings",
        icon: <IconCalendarEvent size={20} />,
        link: "/venue/bookings",
      },
      {
        label: "Availability",
        icon: <IconCalendarEvent size={20} />,
        link: "/venue/calendar",
      },
    ],
  },
  // Vendor Section
  {
    label: "Vendor Portal",
    icon: <IconShoppingCart size={20} />,
    link: "/vendor",
    role: ["vendor", "admin"],
    children: [
      {
        label: "Products",
        icon: <IconShoppingCart size={20} />,
        link: "/vendor/products",
      },
      {
        label: "Orders",
        icon: <IconFileText size={20} />,
        link: "/vendor/orders",
      },
    ],
  },
  // Media Section
  {
    label: "Media Center",
    icon: <IconNews size={20} />,
    link: "/media",
    role: ["media", "press", "admin"],
    children: [
      {
        label: "Press Releases",
        icon: <IconNews size={20} />,
        link: "/media/press",
      },
      {
        label: "Media Gallery",
        icon: <IconCamera size={20} />,
        link: "/media/gallery",
      },
    ],
  },
  // Content Management
  {
    label: "Content",
    icon: <IconFileText size={20} />,
    children: [
      {
        label: "Blog Posts",
        icon: <IconFileText size={20} />,
        link: "/blog-posts",
      },
      {
        label: "Categories",
        icon: <IconCategory size={20} />,
        link: "/categories",
      },
    ],
  },
  // Analytics
  {
    label: "Analytics",
    icon: <IconChartBar size={20} />,
    link: "/analytics",
    badge: "Beta",
    badgeColor: "orange",
  },
  // Settings
  {
    label: "Settings",
    icon: <IconSettings size={20} />,
    link: "/settings",
  },
];

interface NavLinkProps {
  item: MenuItem;
  collapsed: boolean;
  level?: number;
}

function NavLink({ item, collapsed, level = 0 }: NavLinkProps) {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.link ? pathname === item.link : false;
  const isChildActive = hasChildren && item.children.some(child => 
    child.link && pathname.startsWith(child.link)
  );

  const linkContent = (
    <UnstyledButton
      component={item.link && !hasChildren ? Link : "button"}
      href={item.link && !hasChildren ? item.link : undefined}
      onClick={hasChildren ? () => setOpened(o => !o) : undefined}
      aria-expanded={hasChildren ? opened : undefined}
      aria-current={isActive ? "page" : undefined}
      role="menuitem"
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: collapsed ? "8px" : theme.spacing.xs,
        paddingLeft: collapsed ? "8px" : `${12 + level * 16}px`,
        borderRadius: theme.radius.sm,
        color: isActive || isChildActive
          ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 6 : 7]
          : theme.colorScheme === "dark"
          ? theme.colors.gray[3]
          : theme.colors.gray[7],
        backgroundColor: isActive
          ? theme.colorScheme === "dark"
            ? theme.colors[theme.primaryColor][9]
            : theme.colors[theme.primaryColor][0]
          : "transparent",
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.gray[8]
              : theme.colors.gray[0],
        },
        "&:focus": {
          outline: `2px solid ${theme.colors[theme.primaryColor][6]}`,
          outlineOffset: 2,
        },
      })}
    >
      <Group position="apart" spacing={0}>
        <Group spacing={collapsed ? 0 : "sm"}>
          <ThemeIcon
            variant={isActive ? "light" : "subtle"}
            color={isActive || isChildActive ? "blue" : "gray"}
            size={32}
          >
            {item.icon}
          </ThemeIcon>
          {!collapsed && (
            <Text size="sm" weight={isActive ? 600 : 400}>
              {item.label}
            </Text>
          )}
        </Group>
        {!collapsed && (
          <>
            {item.badge && (
              <Badge size="xs" color={item.badgeColor || "blue"} variant="filled">
                {item.badge}
              </Badge>
            )}
            {hasChildren && (
              <IconChevronRight
                size={16}
                style={{
                  transform: opened ? "rotate(90deg)" : "none",
                  transition: "transform 200ms ease",
                }}
              />
            )}
          </>
        )}
      </Group>
    </UnstyledButton>
  );

  if (collapsed && !hasChildren) {
    return (
      <Tooltip label={item.label} position="right" withArrow>
        {linkContent}
      </Tooltip>
    );
  }

  return (
    <>
      {linkContent}
      {hasChildren && !collapsed && (
        <Collapse in={opened}>
          <Stack spacing={2} mt={2}>
            {item.children?.map((child, index) => (
              <NavLink
                key={index}
                item={child}
                collapsed={collapsed}
                level={level + 1}
              />
            ))}
          </Stack>
        </Collapse>
      )}
    </>
  );
}

export function CustomSider() {
  const [collapsed, setCollapsed] = useLocalStorage({
    key: 'fashionos-sidebar-collapsed',
    defaultValue: false,
  });
  const { mutate: logout } = useLogout();
  const router = useRouter();
  const { data: identity, isLoading: identityLoading } = useGetIdentity();

  // Get user role from auth context
  const userRole = identity?.role || "guest";

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.role) return true;
    return item.role.includes(userRole);
  });

  if (identityLoading) {
    return (
      <Navbar
        width={{ base: collapsed ? 80 : 280 }}
        p="md"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          transition: "width 200ms ease",
        })}
      >
        <Stack spacing="md">
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Stack>
      </Navbar>
    );
  }

  return (
    <Navbar
      width={{ base: collapsed ? 80 : 280 }}
      p="md"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        transition: "width 200ms ease",
      })}
    >
      <Navbar.Section>
        <Group position="apart" mb="md">
          {!collapsed && (
            <Group spacing="xs">
              <Text size="lg" weight={700} color="blue">
                🌟 FashionOS
              </Text>
            </Group>
          )}
          <ActionIcon
            variant="default"
            onClick={() => setCollapsed(!collapsed)}
            size={30}
          >
            {collapsed ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
          </ActionIcon>
        </Group>
        <Divider mb="sm" />
      </Navbar.Section>

      <Navbar.Section grow component={ScrollArea}>
        <Stack spacing={4}>
          {filteredMenuItems.map((item, index) => (
            <NavLink key={index} item={item} collapsed={collapsed} />
          ))}
        </Stack>
      </Navbar.Section>

      <Navbar.Section>
        <Divider my="sm" />
        <UnstyledButton
          onClick={() => logout()}
          sx={(theme) => ({
            display: "block",
            width: "100%",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.colors.red[6],
            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Group spacing={collapsed ? 0 : "sm"}>
            <ThemeIcon color="red" variant="subtle" size={32}>
              <IconLogout size={20} />
            </ThemeIcon>
            {!collapsed && (
              <Text size="sm" color="red">
                Logout
              </Text>
            )}
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
}
