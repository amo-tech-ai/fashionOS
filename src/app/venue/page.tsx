"use client";

import { Container, Title, Text, Center, Stack, ThemeIcon, Paper } from '@mantine/core';
import { IconBuilding } from '@tabler/icons-react';

export default function VenuePage() {
  return (
    <Container size="md">
      <Center style={{ minHeight: '60vh' }}>
        <Paper shadow="md" p="xl" radius="md" withBorder style={{ maxWidth: 500, width: '100%' }}>
          <Stack align="center" spacing="xl">
            <ThemeIcon size={80} radius="xl" variant="light">
              <IconBuilding size={40} />
            </ThemeIcon>
            <Title order={2} align="center">Venue Manager</Title>
            <Text color="dimmed" align="center">
              Venue scheduling and resources
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
