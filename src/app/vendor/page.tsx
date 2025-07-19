"use client";

import { Container, Title, Text, Center, Stack, ThemeIcon, Paper } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';

export default function VendorPage() {
  return (
    <Container size="md">
      <Center style={{ minHeight: '60vh' }}>
        <Paper shadow="md" p="xl" radius="md" withBorder style={{ maxWidth: 500, width: '100%' }}>
          <Stack align="center" spacing="xl">
            <ThemeIcon size={80} radius="xl" variant="light">
              <IconShoppingCart size={40} />
            </ThemeIcon>
            <Title order={2} align="center">Vendor Portal</Title>
            <Text color="dimmed" align="center">
              Manage products and orders
            </Text>
            <Text size="sm" color="dimmed" align="center">
              This dashboard is under construction. Check back soon for exciting new features!
            </Text>
          </Stack>
        </Paper>
      </Center>
    </Container>
  );
}
