"use client";

import React from "react";
import { Container, Title, Text, Paper, Group, Badge, Grid, Card, Center } from "@mantine/core";
import { IconShoppingCart, IconPackage, IconTruck, IconChartBar } from "@tabler/icons-react";

export const VendorDashboard: React.FC = () => {
  return (
    <Container size="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Vendor Portal</Title>
          <Text c="dimmed" size="sm">Manage products and services for fashion events</Text>
        </div>
        <Badge size="lg" variant="outline" color="blue">
          In Development
        </Badge>
      </Group>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Center style={{ minHeight: 400, flexDirection: "column" }}>
              <IconShoppingCart size={64} color="var(--mantine-color-gray-5)" />
              <Title order={3} mt="xl" c="dimmed">Vendor Dashboard Coming Soon</Title>
              <Text c="dimmed" mt="md" maw={500} ta="center">
                This portal will enable vendors to manage inventory, process orders, 
                track deliveries, and analyze sales performance. Launch date: Q2 2025.
              </Text>
            </Center>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Paper p="md" withBorder>
            <Group>
              <IconPackage size={24} />
              <Text fw={500}>Product Management</Text>
            </Group>
            <Text size="sm" c="dimmed" mt="sm">
              • Catalog management
              <br />• Pricing tiers
              <br />• Stock tracking
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={6}>
          <Paper p="md" withBorder>
            <Group>
              <IconTruck size={24} />
              <Text fw={500}>Order Fulfillment</Text>
            </Group>
            <Text size="sm" c="dimmed" mt="sm">
              • Order processing
              <br />• Delivery scheduling
              <br />• Invoice generation
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
