'use client';

import { Container, Title, Text, Stack } from '@mantine/core';

export default function DesignersPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Title order={1}>Fashion Designers</Title>
        <Text c="dimmed">
          Connect with world-renowned fashion designers and emerging talents.
        </Text>
      </Stack>
    </Container>
  );
}
