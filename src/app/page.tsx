"use client";

import { 
  Container, 
  Title, 
  Text, 
  Grid, 
  Card, 
  Group, 
  Stack,
  RingProgress,
  SimpleGrid,
  Paper,
  Center,
  ThemeIcon,
  Progress,
  Badge,
  Anchor
} from "@mantine/core";
import { 
  IconCalendarEvent, 
  IconUsers, 
  IconEye, 
  IconTrendingUp,
  IconTicket,
  IconBuildingStore
} from "@tabler/icons";
import Link from "next/link";
import { useList } from "@refinedev/core";

export default function DashboardPage() {
  // Fetch events data for statistics
  const { data: eventsData } = useList({
    resource: "events",
  });

  const events = eventsData?.data || [];
  const publishedEvents = events.filter((e: any) => e.status === "published").length;
  const draftEvents = events.filter((e: any) => e.status === "draft").length;
  const totalAttendance = events.reduce((sum: number, e: any) => sum + (e.target_attendance || 0), 0);

  // Calculate upcoming events (next 30 days)
  const today = new Date();
  const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const upcomingEvents = events.filter((e: any) => {
    const eventDate = new Date(e.event_date);
    return eventDate >= today && eventDate <= thirtyDaysFromNow;
  });

  const stats = [
    {
      title: "Total Events",
      value: events.length,
      icon: IconCalendarEvent,
      color: "blue",
      progress: publishedEvents / events.length * 100,
      description: `${publishedEvents} published, ${draftEvents} draft`
    },
    {
      title: "Total Capacity",
      value: totalAttendance.toLocaleString(),
      icon: IconUsers,
      color: "green",
      progress: 75,
      description: "Target attendance across all events"
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents.length,
      icon: IconTrendingUp,
      color: "orange",
      progress: upcomingEvents.length / events.length * 100,
      description: "Next 30 days"
    },
    {
      title: "Active Venues",
      value: "3",
      icon: IconBuildingStore,
      color: "grape",
      progress: 60,
      description: "Venues in use"
    }
  ];

  return (
    <Container size="xl" py="xl">
      {/* Page Header */}
      <Group position="apart" mb="xl">
        <div>
          <Title order={1} mb="xs">Dashboard</Title>
          <Text color="dimmed">Welcome back to FashionOS Admin</Text>
        </div>
        <Badge size="lg" radius="sm" variant="dot">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Badge>
      </Group>

      {/* Stats Grid */}
      <Grid gutter="lg" mb="xl">
        {stats.map((stat) => (
          <Grid.Col key={stat.title} span={12} sm={6} lg={3}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Group position="apart">
                <div>
                  <Text color="dimmed" transform="uppercase" weight={700} size="xs">
                    {stat.title}
                  </Text>
                  <Text weight={700} size="xl" mt="sm">
                    {stat.value}
                  </Text>
                </div>
                <ThemeIcon
                  color={stat.color}
                  variant="light"
                  size={64}
                  radius="md"
                >
                  <stat.icon size={32} />
                </ThemeIcon>
              </Group>
              <Text color="dimmed" size="sm" mt="md">
                {stat.description}
              </Text>
              <Progress value={stat.progress} mt="xs" color={stat.color} size="sm" radius="xl" />
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid gutter="lg">
        {/* Recent Events */}
        <Grid.Col span={12} lg={8}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart" mb="md">
              <Title order={3}>Recent Events</Title>
              <Anchor component={Link} href="/events" size="sm">
                View all →
              </Anchor>
            </Group>
            
            <Stack spacing="xs">
              {events.slice(0, 5).map((event: any) => (
                <Paper key={event.id} p="md" radius="md" withBorder>
                  <Group position="apart">
                    <div style={{ flex: 1 }}>
                      <Group spacing="xs" mb={4}>
                        <Text weight={500}>{event.title}</Text>
                        <Badge 
                          size="sm"
                          color={event.status === "published" ? "green" : "yellow"}
                          variant="dot"
                        >
                          {event.status}
                        </Badge>
                      </Group>
                      <Text size="sm" color="dimmed">
                        {new Date(event.event_date).toLocaleDateString()} • Target: {event.target_attendance} attendees
                      </Text>
                    </div>
                    <Group spacing="xs">
                      <Anchor 
                        component={Link} 
                        href={`/events/show/${event.id}`}
                        size="sm"
                      >
                        View
                      </Anchor>
                      <Anchor 
                        component={Link} 
                        href={`/events/edit/${event.id}`}
                        size="sm"
                        color="green"
                      >
                        Edit
                      </Anchor>
                    </Group>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Quick Actions & Activity */}
        <Grid.Col span={12} lg={4}>
          {/* Quick Actions */}
          <Paper shadow="sm" p="lg" radius="md" withBorder mb="lg">
            <Title order={3} mb="md">Quick Actions</Title>
            <Stack spacing="sm">
              <Anchor component={Link} href="/events/create" weight={500}>
                → Create New Event
              </Anchor>
              <Anchor component={Link} href="/blog-posts/create" weight={500}>
                → Write Blog Post
              </Anchor>
              <Anchor component={Link} href="/categories" weight={500}>
                → Manage Categories
              </Anchor>
              <Anchor component={Link} href="/settings" weight={500}>
                → System Settings
              </Anchor>
            </Stack>
          </Paper>

          {/* Event Status Overview */}
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">Event Status</Title>
            <Center>
              <RingProgress
                size={180}
                thickness={16}
                sections={[
                  { value: (publishedEvents / events.length) * 100, color: 'green' },
                  { value: (draftEvents / events.length) * 100, color: 'yellow' }
                ]}
                label={
                  <Center>
                    <Stack align="center" spacing={0}>
                      <Text size="xl" weight={700}>{events.length}</Text>
                      <Text size="sm" color="dimmed">Total Events</Text>
                    </Stack>
                  </Center>
                }
              />
            </Center>
            <Group position="center" mt="md">
              <Group spacing="xs">
                <div style={{ width: 8, height: 8, backgroundColor: '#40c057', borderRadius: '50%' }} />
                <Text size="sm">{publishedEvents} Published</Text>
              </Group>
              <Group spacing="xs">
                <div style={{ width: 8, height: 8, backgroundColor: '#fab005', borderRadius: '50%' }} />
                <Text size="sm">{draftEvents} Draft</Text>
              </Group>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
