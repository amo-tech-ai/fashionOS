"use client";

import { Container, Title, Text, Alert, Stack, Button, Group, Paper, Grid, Card } from "@mantine/core";
import { IconBuildingStore, IconChartBar, IconUsers, IconTarget } from "@tabler/icons-react";
import Link from "next/link";

export default function SponsorPage() {
  return (
    <Container size="lg" py="xl">
      <Stack spacing="xl">
        <Group>
          <IconBuildingStore size={48} color="#40c057" />
          <div>
            <Title order={2}>Sponsor Portal</Title>
            <Text color="dimmed">Maximize your brand's fashion event presence</Text>
          </div>
        </Group>

        <Alert 
          icon={<IconBuildingStore size={16} />} 
          title="Premium Feature Coming Soon" 
          color="green" 
          radius="md"
        >
          <Text size="sm">
            The Sponsor Portal is being developed with advanced analytics and ROI tracking.
          </Text>
          <Text size="xs" color="dimmed" mt="sm">
            Join the waitlist to get early access and special launch pricing.
          </Text>
        </Alert>

        <Grid>
          <Grid.Col span={12} md={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <IconChartBar size={40} color="#40c057" />
              <Text weight={500} mt="md">ROI Analytics</Text>
              <Text size="sm" color="dimmed">
                Track engagement and conversions
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <IconUsers size={40} color="#40c057" />
              <Text weight={500} mt="md">Lead Management</Text>
              <Text size="sm" color="dimmed">
                Capture and nurture event leads
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <IconTarget size={40} color="#40c057" />
              <Text weight={500} mt="md">Targeted Campaigns</Text>
              <Text size="sm" color="dimmed">
                Reach your ideal audience
              </Text>
            </Card>
          </Grid.Col>
        </Grid>

        <Group>
          <Button
            color="green"
            onClick={() => alert('Waitlist feature coming soon!')}
          >
            Join Waitlist
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