"use client";

import { Container, Title, Text, Alert, Stack, Button, Group } from "@mantine/core";
import { IconClipboardList, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export default function OrganizerPage() {
  return (
    <Container size="lg" py="xl">
      <Stack spacing="xl">
        <Group>
          <IconClipboardList size={48} color="#228be6" />
          <div>
            <Title order={2}>Organizer Hub</Title>
            <Text color="dimmed">Manage your fashion events efficiently</Text>
          </div>
        </Group>

        <Alert 
          icon={<IconClipboardList size={16} />} 
          title="Coming Soon!" 
          color="cyan" 
          radius="md"
        >
          <Text size="sm">
            The Organizer Hub is under development. Soon you'll be able to:
          </Text>
          <ul style={{ marginTop: '8px', marginBottom: '12px' }}>
            <li>Create and manage event templates</li>
            <li>Track RSVPs and attendee lists</li>
            <li>Coordinate with vendors and models</li>
            <li>Generate event reports</li>
          </ul>
          <Text size="xs" color="dimmed">
            Expected launch: Q2 2025
          </Text>
        </Alert>

        <Group>
          <Button
            component={Link}
            href="/events"
            leftIcon={<IconArrowRight size={16} />}
            variant="light"
          >
            View Events
          </Button>
          <Button
            component={Link}
            href="/"
            variant="subtle"
          >
            Back to Dashboard
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}