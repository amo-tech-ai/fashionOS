"use client";

import { Show, DateField, NumberField, TextField, BooleanField } from "@refinedev/mantine";
import { 
  Title,
  Text,
  Paper,
  Grid,
  Group,
  Badge,
  Stack,
  Divider,
  Box,
  Card
} from "@mantine/core";
import { 
  IconCalendarEvent, 
  IconMapPin, 
  IconUsers, 
  IconCoin,
  IconClock,
  IconTag
} from "@tabler/icons-react";
import { useShow } from "@refinedev/core";

export const EventShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack spacing="lg">
        {/* Header */}
        <Paper p="md" radius="md" withBorder>
          <Group position="apart" align="flex-start">
            <Box>
              <Title order={2}>{record?.title}</Title>
              <Group spacing="xs" mt="xs">
                <Badge 
                  color={record?.status === "published" ? "green" : "gray"} 
                  variant="light"
                >
                  {record?.status}
                </Badge>
                <Badge 
                  color={
                    record?.event_type === "runway" ? "blue" :
                    record?.event_type === "exhibition" ? "green" :
                    record?.event_type === "gala" ? "purple" :
                    record?.event_type === "popup" ? "orange" : "red"
                  } 
                  variant="dot"
                >
                  {record?.event_type}
                </Badge>
                {record?.is_featured && (
                  <Badge color="yellow" variant="filled">
                    Featured
                  </Badge>
                )}
              </Group>
            </Box>
          </Group>
        </Paper>

        {/* Event Details */}
        <Grid>
          <Grid.Col span={12} md={8}>
            <Stack spacing="md">
              {/* Description */}
              <Paper p="md" radius="md" withBorder>
                <Title order={4} mb="sm">Description</Title>
                <Text color="dimmed">
                  {record?.description || "No description provided"}
                </Text>
              </Paper>

              {/* Location & Time */}
              <Paper p="md" radius="md" withBorder>
                <Title order={4} mb="md">Event Details</Title>
                <Stack spacing="sm">
                  <Group>
                    <IconMapPin size={20} color="gray" />
                    <Text size="sm">
                      <strong>Location:</strong> {record?.location}
                    </Text>
                  </Group>
                  <Group>
                    <IconCalendarEvent size={20} color="gray" />
                    <Text size="sm">
                      <strong>Date:</strong>{" "}
                      <DateField value={record?.date} format="MMMM DD, YYYY" />
                    </Text>
                  </Group>
                  <Group>
                    <IconClock size={20} color="gray" />
                    <Text size="sm">
                      <strong>Time:</strong> {record?.time}
                    </Text>
                  </Group>
                </Stack>
              </Paper>

              {/* Tags */}
              {record?.tags && record.tags.length > 0 && (
                <Paper p="md" radius="md" withBorder>
                  <Title order={4} mb="sm">
                    <Group spacing="xs">
                      <IconTag size={20} />
                      Tags
                    </Group>
                  </Title>
                  <Group spacing="xs">
                    {record.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                </Paper>
              )}
            </Stack>
          </Grid.Col>

          <Grid.Col span={12} md={4}>
            <Stack spacing="md">
              {/* Capacity & Pricing */}
              <Card p="md" radius="md" withBorder>
                <Stack spacing="sm">
                  <Group position="apart">
                    <Group spacing="xs">
                      <IconUsers size={20} color="gray" />
                      <Text size="sm" weight={500}>Capacity</Text>
                    </Group>
                    <Text size="lg" weight={700}>{record?.capacity}</Text>
                  </Group>
                  <Divider />
                  <Group position="apart">
                    <Group spacing="xs">
                      <IconCoin size={20} color="gray" />
                      <Text size="sm" weight={500}>Ticket Price</Text>
                    </Group>
                    <Text size="lg" weight={700}>
                      <NumberField
                        value={record?.ticket_price}
                        options={{
                          style: "currency",
                          currency: "CAD",
                        }}
                      />
                    </Text>
                  </Group>
                </Stack>
              </Card>

              {/* Metadata */}
              <Card p="md" radius="md" withBorder>
                <Title order={5} mb="sm">Information</Title>
                <Stack spacing="xs">
                  <Group position="apart">
                    <Text size="sm" color="dimmed">Event ID</Text>
                    <Text size="sm" weight={500}>{record?.id}</Text>
                  </Group>
                  <Group position="apart">
                    <Text size="sm" color="dimmed">Created</Text>
                    <Text size="sm">
                      <DateField value={record?.created_at} format="MMM DD, YYYY" />
                    </Text>
                  </Group>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Show>
  );
};
