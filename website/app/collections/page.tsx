'use client';

import { Container, Title, Text, Stack } from '@mantine/core';

export default function CollectionsPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Title order={1}>Collections</Title>
        <Text c="dimmed">
          Browse curated fashion collections from past seasons and upcoming launches.
        </Text>
      </Stack>
    </Container>
  );
}
