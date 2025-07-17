"use client";

import React, { useState } from "react";
import { AppShell, useMantineTheme, MediaQuery } from "@mantine/core";
import { CustomSider } from "./CustomSider";
import { CustomHeader } from "./CustomHeader";

interface CustomThemedLayoutProps {
  children: React.ReactNode;
  Title?: React.FC;
}

export function CustomThemedLayout({ children, Title }: CustomThemedLayoutProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbar={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <CustomSider />
        </MediaQuery>
      }
      header={
        <CustomHeader 
          Title={Title || (() => <span>🌟 FashionOS</span>)}
          onMenuClick={() => setOpened(true)}
        />
      }
      styles={{
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
        },
      }}
    >
      {children}
    </AppShell>
  );
}
