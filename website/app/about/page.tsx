'use client';

import { Container, Title, Text, Stack } from '@mantine/core';

export default function AboutPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Title order={1}>About FashionOS</Title>
        <Text c="dimmed">
          FashionOS is revolutionizing the fashion industry with AI-powered event management 
          and seamless digital experiences for designers, models, and fashion enthusiasts.
        </Text>
      </Stack>
    </Container>
  );
}
