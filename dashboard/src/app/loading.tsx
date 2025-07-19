"use client";

import { Center, Loader, Stack, Text } from '@mantine/core';

export default function Loading() {
  return (
    <Center h="100vh">
      <Stack align="center" spacing="md">
        <Loader size="lg" color="violet" />
        <Text color="dimmed">Loading FashionOS...</Text>
      </Stack>
    </Center>
  );
}
