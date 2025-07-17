"use client";

import { Box, Group, Text, Container, Anchor, Divider } from "@mantine/core";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      style={{
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #dee2e6",
        marginTop: "auto",
        padding: "40px 0",
      }}
    >
      <Container size="xl">
        <div style={{ marginBottom: "30px" }}>
          {/* Main Footer Content */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "30px" }}>
            {/* Brand Section */}
            <div style={{ flex: "1", minWidth: "250px" }}>
              <Text size="lg" style={{ fontWeight: 600, color: "#212529", marginBottom: "8px" }}>
                FashionOS
              </Text>
              <Text size="sm" style={{ color: "#6c757d", maxWidth: "300px", marginBottom: "16px" }}>
                Canada&apos;s premier fashion event management platform. 
                Streamlining runway shows, fashion weeks, and industry events across North America.
              </Text>
            </div>

            {/* Quick Links */}
            <div style={{ flex: "1", minWidth: "150px" }}>
              <Text size="sm" style={{ fontWeight: 500, color: "#212529", marginBottom: "8px" }}>
                Platform
              </Text>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <Anchor href="/events" size="sm" style={{ color: "#6c757d" }}>
                  Events
                </Anchor>
                <Anchor href="/blog-posts" size="sm" style={{ color: "#6c757d" }}>
                  Blog
                </Anchor>
                <Anchor href="/categories" size="sm" style={{ color: "#6c757d" }}>
                  Categories
                </Anchor>
              </div>
            </div>

            {/* Support */}
            <div style={{ flex: "1", minWidth: "150px" }}>
              <Text size="sm" style={{ fontWeight: 500, color: "#212529", marginBottom: "8px" }}>
                Support
              </Text>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <Anchor href="/help" size="sm" style={{ color: "#6c757d" }}>
                  Help Center
                </Anchor>
                <Anchor href="/contact" size="sm" style={{ color: "#6c757d" }}>
                  Contact
                </Anchor>
                <Anchor href="/api-docs" size="sm" style={{ color: "#6c757d" }}>
                  API Docs
                </Anchor>
              </div>
            </div>
          </div>
        </div>

        <Divider style={{ margin: "30px 0" }} />

        {/* Bottom Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <Text size="xs" style={{ color: "#6c757d" }}>
            © {currentYear} FashionOS. All rights reserved. Made in Canada 🇨🇦
          </Text>
          <div style={{ display: "flex", gap: "16px" }}>
            <Anchor href="/privacy" size="xs" style={{ color: "#6c757d" }}>
              Privacy Policy
            </Anchor>
            <Anchor href="/terms" size="xs" style={{ color: "#6c757d" }}>
              Terms of Service
            </Anchor>
            <Anchor href="/cookies" size="xs" style={{ color: "#6c757d" }}>
              Cookie Policy
            </Anchor>
          </div>
        </div>
      </Container>
    </Box>
  );
};