"use client";

import React from "react";
import { 
  Header,
  Group,
  Text,
  ActionIcon,
  Menu,
  Avatar,
  Divider,
  Box,
  Tooltip,
  useMantineTheme,
  MediaQuery
} from "@mantine/core";
import { 
  IconBell, 
  IconSettings, 
  IconLogout, 
  IconUser,
  IconMenu2
} from "@tabler/icons-react";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { ColorSchemeToggle } from "../theme/ColorSchemeToggle";

interface CustomHeaderProps {
  Title?: React.FC;
  onMenuClick?: () => void;
}

export function CustomHeader({ Title, onMenuClick }: CustomHeaderProps) {
  const theme = useMantineTheme();
  const { data: identity } = useGetIdentity();
  const { mutate: logout } = useLogout();

  return (
    <Header
      height={60}
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" 
          ? theme.colors.dark[7] 
          : theme.white,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark" 
            ? theme.colors.dark[5] 
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Group position="apart" sx={{ height: "100%" }}>
        <Group>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <ActionIcon onClick={onMenuClick} size="lg" variant="subtle">
              <IconMenu2 size={18} />
            </ActionIcon>
          </MediaQuery>
          
          {Title ? (
            <Title />
          ) : (
            <Group spacing="xs">
              <Text 
                size="xl" 
                weight={700} 
                color={theme.colorScheme === "dark" ? "white" : "blue"}
              >
                🌟 FashionOS
              </Text>
              <Box
                sx={(theme) => ({
                  backgroundColor: theme.colors.blue[0],
                  color: theme.colors.blue[6],
                  padding: "2px 8px",
                  borderRadius: theme.radius.sm,
                  fontSize: "10px",
                  fontWeight: 600,
                })}
              >
                BETA
              </Box>
            </Group>
          )}
        </Group>

        <Group spacing="md">
          {/* Theme Toggle */}
          <ColorSchemeToggle />

          {/* Notifications */}
          <Tooltip label="Notifications" position="bottom">
            <ActionIcon size="lg" variant="subtle">
              <IconBell size={18} />
            </ActionIcon>
          </Tooltip>

          {/* Settings */}
          <Tooltip label="Settings" position="bottom">
            <ActionIcon size="lg" variant="subtle">
              <IconSettings size={18} />
            </ActionIcon>
          </Tooltip>

          {/* User Menu */}
          <Menu 
            shadow="md" 
            width={200}
            position="bottom-end"
            withArrow
          >
            <Menu.Target>
              <ActionIcon size="lg" variant="subtle">
                <Avatar 
                  size="sm" 
                  radius="xl"
                  color="blue"
                  src={identity?.avatar}
                >
                  {identity?.name?.charAt(0) || <IconUser size={16} />}
                </Avatar>
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>
                {identity?.name || "Guest User"}
              </Menu.Label>
              <Menu.Item icon={<IconUser size={14} />}>
                Profile
              </Menu.Item>
              <Menu.Item icon={<IconSettings size={14} />}>
                Settings
              </Menu.Item>
              <Divider />
              <Menu.Item 
                icon={<IconLogout size={14} />}
                color="red"
                onClick={() => logout()}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Header>
  );
}
