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
  Anchor,
  ActionIcon,
  Timeline,
  Avatar,
  Divider,
  Alert,

  Flex,
  Box,
  Button
} from "@mantine/core";
import { 
  IconCalendarEvent, 
  IconUsers, 
  IconTrendingUp,
  IconBuildingStore,
  IconCurrencyDollar,
  IconEye,
  IconChevronRight,
  IconAlertCircle,
  IconSparkles,
  IconCalendarPlus,
  IconSettings,
  IconRefresh,
  IconDownload,
  IconMapPin,
  IconClock,
  IconTarget
} from "@tabler/icons-react";
import Link from "next/link";
import { useList } from "@refinedev/core";
import { useState, useMemo } from "react";

// Fashion-specific color palette
const fashionColors = {
  primary: '#9c4dff',
  secondary: '#ff8cc8', 
  accent: '#ffdc00',
  success: '#40c057',
  warning: '#fab005',
  danger: '#fa5252'
};

// Dashboard metric card component
function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  progress, 
  description,
  trend,
  onClick 
}: {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  progress?: number;
  description: string;
  trend?: { direction: 'up' | 'down'; value: string };
  onClick?: () => void;
}) {
  return (
    <Card 
      shadow="sm" 
      p="lg" 
      radius="md" 
      withBorder
      style={{ 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onClick={onClick}
      sx={(theme) => ({
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows.md
        } : {}
      })}
    >
      <Group position="apart" mb="md">
        <div style={{ flex: 1 }}>
          <Text color="dimmed" transform="uppercase" weight={600} size="xs" mb={4}>
            {title}
          </Text>
          <Group align="center" spacing="xs">
            <Text weight={700} size="xl">
              {typeof value === 'number' && value > 1000 ? 
                value.toLocaleString() : 
                value
              }
            </Text>
            {trend && (
              <Badge 
                size="sm" 
                color={trend.direction === 'up' ? 'green' : 'red'}
                variant="light"
              >
                {trend.direction === 'up' ? '↗' : '↘'} {trend.value}
              </Badge>
            )}
          </Group>
        </div>
        <ThemeIcon
          color={color}
          variant="light"
          size={54}
          radius="md"
        >
          <Icon size={28} />
        </ThemeIcon>
      </Group>
      
      <Text color="dimmed" size="sm" mb="xs">
        {description}
      </Text>
      
      {progress !== undefined && (
        <Progress 
          value={progress} 
          color={color} 
          size="sm" 
          radius="xl"
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[1]
          })}
        />
      )}
    </Card>
  );
}

// Quick action button component
function QuickActionButton({ 
  icon: Icon, 
  label, 
  description, 
  href, 
  color 
}: {
  icon: any;
  label: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <Card 
      shadow="sm" 
      p="md" 
      radius="md" 
      withBorder
      component={Link}
      href={href}
      style={{ 
        textDecoration: 'none',
        transition: 'all 0.2s'
      }}
      sx={(theme) => ({
        '&:hover': {
          transform: 'translateY(-1px)',
          borderColor: theme.colors[color][4]
        }
      })}
    >
      <Group spacing="md">
        <ThemeIcon color={color} variant="light" size={40} radius="md">
          <Icon size={20} />
        </ThemeIcon>
        <div style={{ flex: 1 }}>
          <Text weight={500} size="sm" mb={2}>{label}</Text>
          <Text color="dimmed" size="xs">{description}</Text>
        </div>
        <ActionIcon color="gray" variant="subtle">
          <IconChevronRight size={16} />
        </ActionIcon>
      </Group>
    </Card>
  );
}

export default function EnhancedDashboardPage() {
  const [selectedDateRange, setSelectedDateRange] = useState('30d');

  // Fetch data using Refine hooks
  const { data: eventsData, isLoading: eventsLoading } = useList({
    resource: "events",
    pagination: { pageSize: 100 },
    sorters: [{ field: "event_date", order: "desc" }]
  });

  const { data: venuesData } = useList({
    resource: "venues",
    pagination: { pageSize: 50 }
  });

  const { data: sponsorsData } = useList({
    resource: "sponsors", 
    pagination: { pageSize: 50 }
  });

  // Process data for dashboard metrics
  const dashboardData = useMemo(() => {
    const events = eventsData?.data || [];
    const venues = venuesData?.data || [];
    const sponsors = sponsorsData?.data || [];

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Event statistics
    const publishedEvents = events.filter(e => e.status === 'published');
    const draftEvents = events.filter(e => e.status === 'draft');
    const upcomingEvents = events.filter(e => {
      const eventDate = new Date(e.event_date);
      return eventDate >= now && eventDate <= sevenDaysFromNow;
    });

    // Capacity and attendance
    const totalCapacity = events.reduce((sum, e) => sum + (e.target_attendance || 0), 0);
    const totalCurrentAttendance = events.reduce((sum, e) => sum + (e.current_attendance || 0), 0);
    const occupancyRate = totalCapacity > 0 ? (totalCurrentAttendance / totalCapacity) * 100 : 0;

    // Revenue estimation (mock data - replace with actual revenue calculation)
    const estimatedRevenue = events.reduce((sum, e) => {
      const ticketRevenue = (e.target_attendance || 0) * 150; // Average ticket price
      return sum + ticketRevenue;
    }, 0);

    // Recent activity timeline
    const recentActivity = events
      .slice(0, 5)
      .map(event => ({
        id: event.id,
        title: event.title,
        action: event.status === 'published' ? 'Published' : 'Created',
        date: event.created_at,
        color: event.status === 'published' ? 'green' : 'blue'
      }));

    return {
      events,
      venues,
      sponsors,
      publishedEvents: publishedEvents.length,
      draftEvents: draftEvents.length,
      upcomingEvents: upcomingEvents.length,
      totalCapacity,
      totalCurrentAttendance,
      occupancyRate,
      estimatedRevenue,
      recentActivity
    };
  }, [eventsData, venuesData, sponsorsData]);

  const quickActions = [
    {
      icon: IconCalendarPlus,
      label: "Create Event",
      description: "Start planning a new fashion event",
      href: "/events/create",
      color: "blue"
    },
    {
      icon: IconUsers,
      label: "Manage Models",
      description: "View and coordinate model schedules",
      href: "/models",
      color: "pink"
    },
    {
      icon: IconBuildingStore,
      label: "Book Venue",
      description: "Reserve venues for upcoming events",
      href: "/venues",
      color: "green"
    },
    {
      icon: IconSparkles,
      label: "Sponsor Packages",
      description: "Create and manage sponsorship deals",
      href: "/sponsors",
      color: "yellow"
    }
  ];

  if (eventsLoading) {
    return (
      <Container size="xl" py="xl">
        <Center style={{ minHeight: 400 }}>
          <Text>Loading dashboard...</Text>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      {/* Header Section */}
      <Group position="apart" mb="xl">
        <div>
          <Title order={1} mb="xs" color={fashionColors.primary}>
            Fashion Events Dashboard
          </Title>
          <Text color="dimmed" size="lg">
            Welcome back! Here's what's happening with your events.
          </Text>
        </div>
        <Group spacing="md">
          <Button 
            leftIcon={<IconRefresh size={16} />} 
            variant="light"
            color="gray"
          >
            Refresh
          </Button>
          <Button 
            leftIcon={<IconDownload size={16} />}
            color="blue"
          >
            Export Report
          </Button>
        </Group>
      </Group>

      {/* Alert for upcoming events */}
      {dashboardData.upcomingEvents > 0 && (
        <Alert 
          icon={<IconAlertCircle size={16} />} 
          title="Upcoming Events" 
          color="yellow"
          mb="xl"
        >
          You have {dashboardData.upcomingEvents} event{dashboardData.upcomingEvents > 1 ? 's' : ''} 
          {' '}in the next 7 days. Make sure all preparations are on track!
        </Alert>
      )}

      {/* Key Metrics Grid */}
      <Grid gutter="lg" mb="xl">
        <Grid.Col span={12} sm={6} lg={3}>
          <MetricCard
            title="Total Events"
            value={dashboardData.events.length}
            icon={IconCalendarEvent}
            color="blue"
            progress={dashboardData.publishedEvents / dashboardData.events.length * 100}
            description={`${dashboardData.publishedEvents} published, ${dashboardData.draftEvents} draft`}
            trend={{ direction: 'up', value: '12%' }}
            onClick={() => window.location.href = '/events'}
          />
        </Grid.Col>

        <Grid.Col span={12} sm={6} lg={3}>
          <MetricCard
            title="Expected Attendance"
            value={dashboardData.totalCapacity}
            icon={IconUsers}
            color="green"
            progress={dashboardData.occupancyRate}
            description={`${dashboardData.occupancyRate.toFixed(1)}% current booking rate`}
            trend={{ direction: 'up', value: '8%' }}
          />
        </Grid.Col>

        <Grid.Col span={12} sm={6} lg={3}>
          <MetricCard
            title="Revenue Potential"
            value={`$${(dashboardData.estimatedRevenue / 1000).toFixed(0)}K`}
            icon={IconCurrencyDollar}
            color="yellow"
            progress={75}
            description="Estimated from ticket sales & sponsorships"
            trend={{ direction: 'up', value: '15%' }}
          />
        </Grid.Col>

        <Grid.Col span={12} sm={6} lg={3}>
          <MetricCard
            title="Active Venues"
            value={dashboardData.venues.length}
            icon={IconBuildingStore}
            color="purple"
            progress={60}
            description="Venues available for booking"
            trend={{ direction: 'up', value: '3%' }}
          />
        </Grid.Col>
      </Grid>

      {/* Main Content Grid */}
      <Grid gutter="lg">
        {/* Quick Actions */}
        <Grid.Col span={12} lg={4}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">Quick Actions</Title>
            <Stack spacing="sm">
              {quickActions.map((action, index) => (
                <QuickActionButton key={index} {...action} />
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Recent Events */}
        <Grid.Col span={12} lg={8}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart" mb="md">
              <Title order={3}>Recent Events</Title>
              <Anchor component={Link} href="/events" size="sm">
                View all events →
              </Anchor>
            </Group>
            
            <Stack spacing="md">
              {dashboardData.events.slice(0, 4).map((event: any) => (
                <Card key={event.id} p="md" radius="md" withBorder>
                  <Group position="apart">
                    <div style={{ flex: 1 }}>
                      <Group spacing="xs" mb={8}>
                        <Text weight={500} size="sm">{event.title}</Text>
                        <Badge 
                          size="sm"
                          color={event.status === "published" ? "green" : "yellow"}
                          variant="light"
                        >
                          {event.status}
                        </Badge>
                      </Group>
                      <Group spacing="lg" mb={4}>
                        <Group spacing={4}>
                          <IconCalendarEvent size={14} color="#666" />
                          <Text size="xs" color="dimmed">
                            {new Date(event.event_date).toLocaleDateString()}
                          </Text>
                        </Group>
                        <Group spacing={4}>
                          <IconUsers size={14} color="#666" />
                          <Text size="xs" color="dimmed">
                            {event.target_attendance} expected
                          </Text>
                        </Group>
                        {event.venue_name && (
                          <Group spacing={4}>
                            <IconMapPin size={14} color="#666" />
                            <Text size="xs" color="dimmed">
                              {event.venue_name}
                            </Text>
                          </Group>
                        )}
                      </Group>
                    </div>
                    <Group spacing="xs">
                      <Button 
                        component={Link} 
                        href={`/events/show/${event.id}`}
                        size="xs"
                        variant="light"
                      >
                        View
                      </Button>
                      <Button 
                        component={Link} 
                        href={`/events/edit/${event.id}`}
                        size="xs"
                        color="green"
                        variant="light"
                      >
                        Edit
                      </Button>
                    </Group>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Event Status Distribution */}
        <Grid.Col span={12}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart" mb="md">
              <Title order={3}>Event Status Overview</Title>
              <Group spacing="lg">
                <Group spacing="xs">
                  <Box 
                    style={{ 
                      width: 8, 
                      height: 8, 
                      backgroundColor: fashionColors.success, 
                      borderRadius: '50%' 
                    }} 
                  />
                  <Text size="sm">{dashboardData.publishedEvents} Published</Text>
                </Group>
                <Group spacing="xs">
                  <Box 
                    style={{ 
                      width: 8, 
                      height: 8, 
                      backgroundColor: fashionColors.warning, 
                      borderRadius: '50%' 
                    }} 
                  />
                  <Text size="sm">{dashboardData.draftEvents} Draft</Text>
                </Group>
              </Group>
            </Group>

            <Center>
              <RingProgress
                size={200}
                thickness={12}
                sections={[
                  { 
                    value: (dashboardData.publishedEvents / dashboardData.events.length) * 100, 
                    color: fashionColors.success 
                  },
                  { 
                    value: (dashboardData.draftEvents / dashboardData.events.length) * 100, 
                    color: fashionColors.warning 
                  }
                ]}
                label={
                  <Center>
                    <Stack align="center" spacing={0}>
                      <Text size="xl" weight={700}>
                        {dashboardData.events.length}
                      </Text>
                      <Text size="xs" color="dimmed">
                        Total Events
                      </Text>
                    </Stack>
                  </Center>
                }
              />
            </Center>

            {/* Recent Activity Timeline */}
            <Divider my="xl" />
            <Title order={4} mb="md" size="sm">Recent Activity</Title>
            <Timeline bulletSize={16} lineWidth={2}>
              {dashboardData.recentActivity.map((activity, index) => (
                <Timeline.Item
                  key={activity.id}
                  bullet={<IconSparkles size={12} />}
                  title={
                    <Text size="sm" weight={500}>
                      {activity.action}: {activity.title}
                    </Text>
                  }
                >
                  <Text color="dimmed" size="xs">
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
