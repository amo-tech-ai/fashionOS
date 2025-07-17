"use client";

import React from 'react';
import {
  Box,
  Grid,
  Card,
  Title,
  Text,
  Group,
  Badge,
  Progress,
  Button,
  Stack,
  SimpleGrid,
  RingProgress
} from '@mantine/core';
import {
  IconCalendarEvent,
  IconUsers,
  IconCurrencyDollar,
  IconActivity,
  IconSettings,
  IconDatabase,
  IconServer,
  IconTrendingUp
} from '@tabler/icons-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
// import { KPICard } from '../shared/KPICard';
// import { QuickActionButton } from '../shared/QuickActionButton';
// import { ActivityFeed } from '../shared/ActivityFeed';
// import { SystemHealthWidget } from '../shared/SystemHealthWidget';
import { useList } from '@refinedev/core';

// Mock data for demonstration
const roleDistribution = [
  { label: 'Attendees', value: 45, color: 'blue' },
  { label: 'Organizers', value: 25, color: 'green' },
  { label: 'Sponsors', value: 15, color: 'orange' },
  { label: 'Vendors', value: 10, color: 'purple' },
  { label: 'Media', value: 5, color: 'red' }
];

const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1350 },
  { month: 'Mar', users: 1500 },
  { month: 'Apr', users: 1750 },
  { month: 'May', users: 2000 },
  { month: 'Jun', users: 2300 }
];

const totalUsers = 2847;

// Temporary placeholder components
const KPICard = ({ title, value, change, icon: Icon, color }: any) => (
  <Card shadow="sm" p="lg" radius="md" withBorder>
    <Group position="apart">
      <Box>
        <Text size="xs" color="dimmed">{title}</Text>
        <Text size="xl" weight={700}>{value}</Text>
        <Text size="xs" color={change > 0 ? 'green' : 'red'}>
          {change > 0 ? '+' : ''}{change}%
        </Text>
      </Box>
      <Icon size={32} color={color} />
    </Group>
  </Card>
);

const ActivityFeed = ({ activities }: any) => (
  <Card shadow="sm" p="lg" radius="md" withBorder>
    <Title order={4} mb="md">Recent Activity</Title>
    <Stack spacing="sm">
      {activities.map((activity: any) => (
        <Box key={activity.id}>
          <Text size="sm">{activity.user} {activity.action} {activity.type}</Text>
          <Text size="xs" color="dimmed">{activity.timestamp}</Text>
        </Box>
      ))}
    </Stack>
  </Card>
);

const SystemHealthWidget = () => (
  <Card shadow="sm" p="lg" radius="md" withBorder>
    <Title order={4} mb="md">System Health</Title>
    <Stack spacing="sm">
      <Group position="apart">
        <Text size="sm">CPU Usage</Text>
        <Text size="sm" weight={500}>45%</Text>
      </Group>
      <Progress value={45} color="blue" />
      <Group position="apart">
        <Text size="sm">Memory</Text>
        <Text size="sm" weight={500}>2.8GB / 8GB</Text>
      </Group>
      <Progress value={35} color="green" />
    </Stack>
  </Card>
);

export const AdminDashboard = () => {
  // Data hooks
  const { data: eventsData } = useList({ resource: 'events' });
  const { data: usersData } = useList({ resource: 'users' });
  const { data: sponsorsData } = useList({ resource: 'sponsors' });
  
  // Calculate KPIs
  const totalEvents = eventsData?.data?.length || 0;
  const totalUsers = usersData?.data?.length || 0;
  const totalSponsors = sponsorsData?.data?.length || 0;
  const monthlyRevenue = 185000; // Mock data

  // Chart data
  const eventsPipelineData = [
    { month: 'Jan', draft: 20, published: 35, completed: 25 },
    { month: 'Feb', draft: 25, published: 40, completed: 30 },
    { month: 'Mar', draft: 30, published: 45, completed: 35 },
    { month: 'Apr', draft: 28, published: 50, completed: 40 },
    { month: 'May', draft: 35, published: 55, completed: 45 },
    { month: 'Jun', draft: 40, published: 60, completed: 50 },
  ];

  const userDistributionData = [
    { name: 'Basic', value: 45, color: '#339AF0' },
    { name: 'Premium', value: 30, color: '#51CF66' },
    { name: 'Enterprise', value: 25, color: '#845EF7' },
  ];

  const recentActivities = [
    { id: 1, type: 'event', action: 'created', user: 'John Doe', timestamp: '2 hours ago' },
    { id: 2, type: 'user', action: 'upgraded', user: 'Jane Smith', timestamp: '4 hours ago' },
    { id: 3, type: 'sponsor', action: 'renewed', user: 'Acme Corp', timestamp: '1 day ago' },
  ];

  const quickActions = [
    { icon: IconCalendarEvent, label: 'Create Event', href: '/events/create', color: 'blue' },
    { icon: IconUsers, label: 'Manage Users', href: '/admin/users', color: 'teal' },
    { icon: IconDatabase, label: 'Database', href: '/admin/database', color: 'green' },
    { icon: IconSettings, label: 'Settings', href: '/admin/settings', color: 'violet' },
  ];

  return (
    <Box p="md">
      <Title order={2} mb="xl">Admin Dashboard</Title>
      
      {/* KPI Cards Row */}
      <Grid mb="xl">
        <Grid.Col xs={12} sm={6} md={3}>
          <KPICard
            title="Total Events"
            value={totalEvents}
            change={12}
            icon={IconCalendarEvent}
            color="blue"
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6} md={3}>
          <KPICard
            title="Active Users"
            value={totalUsers}
            change={23}
            icon={IconUsers}
            color="teal"
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6} md={3}>
          <KPICard
            title="Monthly Revenue"
            value={`$${(monthlyRevenue / 1000).toFixed(0)}K`}
            change={8}
            icon={IconCurrencyDollar}
            color="green"
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6} md={3}>
          <KPICard
            title="System Uptime"
            value="99.9%"
            change={0.1}
            icon={IconActivity}
            color="violet"
          />
        </Grid.Col>
      </Grid>

      {/* Charts Row */}
      <Grid mb="xl">
        {/* Events Pipeline Chart */}
        <Grid.Col xs={12} md={8}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Title order={4} mb="md">Events Pipeline</Title>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={eventsPipelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="planning" 
                  stackId="1" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="active" 
                  stackId="1" 
                  stroke="#82ca9d" 
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="completed" 
                  stackId="1" 
                  stroke="#ffc658" 
                  fill="#ffc658"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid.Col>

        {/* User Distribution */}
        <Grid.Col xs={12} md={4}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Title order={4} mb="md">User Distribution</Title>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <RingProgress
                size={180}
                thickness={20}
                sections={roleDistribution}
                label={
                  <Text size="xl" align="center" weight={700}>
                    {totalUsers}
                    <Text size="sm" color="dimmed" weight={400}>
                      Total Users
                    </Text>
                  </Text>
                }
              />
            </Box>
            <Box mt="md">
              {roleDistribution.map((role, index) => (
                <Group key={index} position="apart" mb="xs">
                  <Group>
                    <Box
                      sx={(theme) => ({
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: theme.colors[role.color][6],
                      })}
                    />
                    <Text size="sm">{role.label}</Text>
                  </Group>
                  <Text size="sm" color="dimmed">{role.value}%</Text>
                </Group>
              ))}
            </Box>
          </Card>
        </Grid.Col>
      </Grid>

      {/* User Growth and Activity Row */}
      <Grid mb="xl">
        {/* User Growth Chart */}
        <Grid.Col xs={12} md={6}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Title order={4} mb="md">User Growth</Title>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Total Users"
                />
                <Line 
                  type="monotone" 
                  dataKey="active" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Active Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid.Col>

        {/* Recent Activity Feed */}
        <Grid.Col xs={12} md={6}>
          <ActivityFeed activities={recentActivities} />
        </Grid.Col>
      </Grid>

      {/* System Health and Quick Actions */}
      <Grid>
        {/* System Health */}
        <Grid.Col xs={12} md={4}>
          <SystemHealthWidget />
        </Grid.Col>

        {/* Platform Statistics */}
        <Grid.Col xs={12} md={4}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Title order={4} mb="md">Platform Statistics</Title>
            <Box>
              <Group position="apart" mb="md">
                <Text size="sm">Active Events</Text>
                <Badge color="blue" variant="filled">{eventsData?.data?.filter(e => e.status === 'published').length || 0}</Badge>
              </Group>
              <Group position="apart" mb="md">
                <Text size="sm">Total Sponsors</Text>
                <Badge color="green" variant="filled">{totalSponsors}</Badge>
              </Group>
              <Group position="apart" mb="md">
                <Text size="sm">Verified Users</Text>
                <Badge color="teal" variant="filled">{usersData?.data?.filter(u => u.is_verified).length || 0}</Badge>
              </Group>
              <Group position="apart" mb="md">
                <Text size="sm">Premium Accounts</Text>
                <Badge color="violet" variant="filled">{usersData?.data?.filter(u => u.subscription_tier !== 'basic').length || 0}</Badge>
              </Group>
            </Box>
          </Card>
        </Grid.Col>

        {/* Revenue Breakdown */}
        <Grid.Col xs={12} md={4}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Title order={4} mb="md">Revenue Breakdown</Title>
            <Box>
              <Group position="apart" mb="md">
                <Text size="sm">Event Tickets</Text>
                <Text size="sm" weight={500}>$125,000</Text>
              </Group>
              <Progress value={68} color="blue" size="sm" mb="md" />
              
              <Group position="apart" mb="md">
                <Text size="sm">Sponsorships</Text>
                <Text size="sm" weight={500}>$45,000</Text>
              </Group>
              <Progress value={24} color="green" size="sm" mb="md" />
              
              <Group position="apart" mb="md">
                <Text size="sm">Premium Subs</Text>
                <Text size="sm" weight={500}>$15,000</Text>
              </Group>
              <Progress value={8} color="violet" size="sm" />
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
};