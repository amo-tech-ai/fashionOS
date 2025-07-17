import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Title, Text, Container, Stack } from '@mantine/core';

export default function HomePage() {
  return (
    <Container size="md" py="xl">
      <Stack align="center" gap="md">
        <Title order={1} size="h1" ta="center">
          Welcome to FashionOS
        </Title>
        <Text size="lg" ta="center" c="dimmed">
          Your AI-Powered Event Management Platform for Fashion Industry
        </Text>
        <ColorSchemeToggle />
      </Stack>
    </Container>
  );
}
