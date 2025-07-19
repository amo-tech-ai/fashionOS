"use client";

import React from "react";
import { Container, Title, Text, Paper, Group, Badge, Grid, Card, Center } from "@mantine/core";
import { IconBuilding, IconCalendar, IconUsers, IconCurrencyDollar } from "@tabler/icons-react";

export const VenueDashboard: React.FC = () => {
  return (
    <Container size="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Venue Manager Portal</Title>
          <Text c="dimmed" size="sm">Manage your venues and bookings</Text>
        </div>
        <Badge size="lg" variant="outline" color="yellow">
          Coming Soon
        </Badge>
      </Group>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Center style={{ minHeight: 400, flexDirection: "column" }}>
              <IconBuilding size={64} color="var(--mantine-color-gray-5)" />
              <Title order={3} mt="xl" c="dimmed">Venue Dashboard Under Construction</Title>
              <Text c="dimmed" mt="md" maw={500} ta="center">
                This dashboard will include venue management, booking calendars, equipment tracking, 
                and revenue analytics. Expected completion: Q2 2025.
              </Text>
            </Center>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Paper p="md" withBorder>
            <Group>
              <IconCalendar size={24} />
              <Text fw={500}>Upcoming Features</Text>
            </Group>
            <Text size="sm" c="dimmed" mt="sm">
              • Booking calendar with availability
              <br />• Event scheduling interface
              <br />• Automated confirmations
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={6}>
          <Paper p="md" withBorder>
            <Group>
              <IconCurrencyDollar size={24} />
              <Text fw={500}>Analytics Preview</Text>
            </Group>
            <Text size="sm" c="dimmed" mt="sm">
              • Revenue tracking by venue
              <br />• Occupancy rate metrics
              <br />• Popular event types
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
