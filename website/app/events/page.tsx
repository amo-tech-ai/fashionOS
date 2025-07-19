'use client';

import { Container, Title, Text, Stack } from '@mantine/core';

export default function EventsPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Title order={1}>Fashion Events</Title>
        <Text c="dimmed">
          Discover upcoming fashion shows, exhibitions, and exclusive events.
        </Text>
      </Stack>
    </Container>
  );
}
