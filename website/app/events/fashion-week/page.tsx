'use client';

import { Container, Title, Text, Stack } from '@mantine/core';

export default function FashionWeekPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Title order={1}>Fashion Week</Title>
        <Text c="dimmed">
          Experience the pinnacle of fashion with exclusive access to Fashion Week events worldwide.
        </Text>
      </Stack>
    </Container>
  );
}
