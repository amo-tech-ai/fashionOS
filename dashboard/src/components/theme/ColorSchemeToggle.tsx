"use client";

import React from "react";
import { 
  ActionIcon, 
  useMantineColorScheme,
  Tooltip
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { IconSun, IconMoon } from "@tabler/icons-react";

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const preferredColorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <Tooltip 
      label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      position="bottom"
      withArrow
    >
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        variant="subtle"
        color={isDark ? "yellow" : "blue"}
        sx={(theme) => ({
          backgroundColor: isDark 
            ? theme.colors.dark[6] 
            : theme.colors.gray[0],
          "&:hover": {
            backgroundColor: isDark 
              ? theme.colors.dark[5] 
              : theme.colors.gray[1],
          },
        })}
      >
        {isDark ? (
          <IconSun size={18} />
        ) : (
          <IconMoon size={18} />
        )}
      </ActionIcon>
    </Tooltip>
  );
}
