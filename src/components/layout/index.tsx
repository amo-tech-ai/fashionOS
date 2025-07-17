"use client";

import type { PropsWithChildren } from "react";
import { Box } from "@mantine/core";
import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";
import { Footer } from "../footer";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Menu />
      <Box
        component="main"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Breadcrumb />
        <Box style={{ flex: 1, padding: "var(--mantine-spacing-md)" }}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
