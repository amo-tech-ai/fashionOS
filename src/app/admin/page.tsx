"use client";

import { Container, Title, Text, Grid, Card, Group, Stack, Badge, Progress, RingProgress, SimpleGrid, Paper, ThemeIcon } from '@mantine/core';
import { IconUserShield, IconUsers, IconChartBar, IconAlertCircle, IconSettings, IconDatabase, IconShieldCheck, IconActivity } from '@tabler/icons-react';

export default function AdminDashboard() {
  return (
    <Container size="xl">
      <Title order={2} mb="xl">Admin Dashboard</Title>
      
      <SimpleGrid cols={4} spacing="lg" mb="xl">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group position="apart">
            <div>
              <Text color="dimmed" size="xs" transform="uppercase" weight={500}>
                Total Users
              </Text>
              <Text size="xl" weight={700}>2,847</Text>
            </div>
            <ThemeIcon size="xl" radius="md" variant="light" color="blue">
              <IconUsers size={28} />
            </ThemeIcon>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group position="apart">
            <div>
              <Text color="dimmed" size="xs" transform="uppercase" weight={500}>
                Active Events
              </Text>
              <Text size="xl" weight={700}>142</Text>
            </div>
            <ThemeIcon size="xl" radius="md" variant="light" color="green">
              <IconActivity size={28} />
            </ThemeIcon>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group position="apart">
            <div>
              <Text color="dimmed" size="xs" transform="uppercase" weight={500}>
                System Health
              </Text>
              <Badge color="green" size="lg">Operational</Badge>
            </div>
            <ThemeIcon size="xl" radius="md" variant="light" color="green">
              <IconShieldCheck size={28} />
            </ThemeIcon>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group position="apart">
            <div>
              <Text color="dimmed" size="xs" transform="uppercase" weight={500}>
                Alerts
              </Text>
              <Text size="xl" weight={700} color="red">3</Text>
            </div>
            <ThemeIcon size="xl" radius="md" variant="light" color="red">
              <IconAlertCircle size={28} />
            </ThemeIcon>
          </Group>
        </Card>
      </SimpleGrid>

      <Grid>
        <Grid.Col span={8}>
          <Paper shadow="xs" p="md" radius="md" withBorder>
            <Title order={4} mb="md">System Overview</Title>
            <Stack spacing="md">
              <div>
                <Text size="sm" mb="xs">Database Usage</Text>
                <Progress value={67} size="lg" radius="md" />
                <Text size="xs" color="dimmed" mt={5}>67% of 10GB used</Text>
              </div>
              <div>
                <Text size="sm" mb="xs">API Requests (24h)</Text>
                <Progress value={82} size="lg" radius="md" color="teal" />
                <Text size="xs" color="dimmed" mt={5}>82,450 of 100,000 limit</Text>
              </div>
              <div>
                <Text size="sm" mb="xs">Storage Usage</Text>
                <Progress value={45} size="lg" radius="md" color="orange" />
                <Text size="xs" color="dimmed" mt={5}>4.5GB of 10GB used</Text>
              </div>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper shadow="xs" p="md" radius="md" withBorder>
            <Title order={4} mb="md">Quick Actions</Title>
            <Stack>
              <Badge fullWidth size="lg" variant="outline" style={{ cursor: 'pointer' }}>
                View All Users
              </Badge>
              <Badge fullWidth size="lg" variant="outline" style={{ cursor: 'pointer' }}>
                System Settings
              </Badge>
              <Badge fullWidth size="lg" variant="outline" style={{ cursor: 'pointer' }}>
                Security Logs
              </Badge>
              <Badge fullWidth size="lg" variant="outline" style={{ cursor: 'pointer' }}>
                Database Backup
              </Badge>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
