"use client";

import { Container, Title, Text, Center, Button, Stack } from "@mantine/core";
import { IconCalendarEvent } from "@tabler/icons-react";
import Link from "next/link";

export default function OrganizerEventsPage() {
  return (
    <Container size="lg" py="xl">
      <Center h={400}>
        <Stack align="center" spacing="md">
          <IconCalendarEvent size={64} color="#228be6" />
          <Title order={2}>My Events</Title>
          <Text color="dimmed">Manage your fashion events</Text>
          <Button component={Link} href="/events">
            View All Events
          </Button>
        </Stack>
      </Center>
    </Container>
  );
}