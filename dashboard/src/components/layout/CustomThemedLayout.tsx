"use client";

import React, { useState } from "react";
import { AppShell, useMantineTheme, MediaQuery, Box } from "@mantine/core";
import { CustomSider } from "./CustomSider";
import { CustomHeader } from "./CustomHeader";
import { Footer } from "../footer";

interface CustomThemedLayoutProps {
  children: React.ReactNode;
  Title?: React.FC;
}

export function CustomThemedLayout({ children, Title }: CustomThemedLayoutProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <Box style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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
            minHeight: "calc(100vh - 60px)", // Adjust based on header height
            paddingBottom: 0,
          },
          root: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }
        }}
      >
        {children}
      </AppShell>
      <Footer />
    </Box>
  );
}
