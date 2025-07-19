"use client";

import React from "react";
import { Container, Title, Text, Paper, Group, Badge, Grid, Card, Center } from "@mantine/core";
import { IconCamera, IconNews, IconBrandInstagram, IconChartLine } from "@tabler/icons-react";

export const MediaDashboard: React.FC = () => {
  return (
    <Container size="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Media Center</Title>
          <Text c="dimmed" size="sm">Press coverage and content management</Text>
        </div>
        <Badge size="lg" variant="outline" color="purple">
          Planned Feature
        </Badge>
      </Group>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Center style={{ minHeight: 400, flexDirection: "column" }}>
              <IconCamera size={64} color="var(--mantine-color-gray-5)" />
              <Title order={3} mt="xl" c="dimmed">Media Dashboard In Planning</Title>
              <Text c="dimmed" mt="md" maw={500} ta="center">
                The media center will provide press accreditation, content distribution, 
                social media integration, and coverage analytics. Target release: Q3 2025.
              </Text>
            </Center>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Paper p="md" withBorder>
            <Group>
              <IconNews size={24} />
              <Text fw={500}>Press Management</Text>
            </Group>
            <Text size="sm" c="dimmed" mt="sm">
              • Accreditation system
              <br />• Press release distribution
              <br />• Media kit downloads
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={6}>
          <Paper p="md" withBorder>
            <Group>
              <IconBrandInstagram size={24} />
              <Text fw={500}>Social Integration</Text>
            </Group>
            <Text size="sm" c="dimmed" mt="sm">
              • Content scheduling
              <br />• Hashtag tracking
              <br />• Engagement metrics
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
