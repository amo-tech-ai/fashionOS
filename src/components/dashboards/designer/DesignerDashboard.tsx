import React, { useState } from 'react';
import { 
  Grid, 
  Card, 
  Title, 
  Text, 
  Group, 
  Badge, 
  Box, 
  Progress, 
  Stack, 
  Button,
  Tabs,
  Timeline,
  Avatar,
  SimpleGrid,
  RingProgress,
  ThemeIcon,
  ActionIcon,
  Menu,
  Image,
  Paper
} from "@mantine/core";
import { 
  IconPalette, 
  IconHanger, 
  IconCalendarEvent, 
  IconUsers,
  IconCurrencyDollar,
  IconTrendingUp,
  IconPhoto,
  IconNews,
  IconPlus,
  IconEdit,
  IconEye,
  IconDots,
  IconStar,
  IconShare,
  IconClock,
  IconBrandInstagram,
  IconBrandTwitter,
  IconFileDescription
} from "@tabler/icons";
import { useList } from "@refinedev/core";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Collection Card Component
const CollectionCard = ({ collection }: { collection: any }) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={collection.coverImage || "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400"}
          height={160}
          alt={collection.name}
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{collection.name}</Text>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconEdit size={14} />}>Edit</Menu.Item>
            <Menu.Item icon={<IconEye size={14} />}>Preview</Menu.Item>
            <Menu.Item icon={<IconShare size={14} />}>Share</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Text size="sm" color="dimmed">
        {collection.pieces} pieces • {collection.season}
      </Text>

      <Progress value={collection.completionRate} mt="md" size="sm" color="violet" />
      <Text size="xs" color="dimmed" mt="xs">
        {collection.completionRate}% complete
      </Text>
    </Card>
  );
};

// Show Schedule Component
const ShowSchedule = ({ shows }: { shows: any[] }) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={4} mb="md">Upcoming Shows</Title>
      <Timeline active={1} bulletSize={24} lineWidth={2}>
        {shows.map((show, index) => (
          <Timeline.Item
            key={index}
            bullet={<IconCalendarEvent size={12} />}
            title={show.name}
          >
            <Text color="dimmed" size="sm">{show.date}</Text>
            <Text size="sm">{show.venue}</Text>
            <Badge size="sm" variant="light" color={show.status === 'confirmed' ? 'green' : 'yellow'}>
              {show.status}
            </Badge>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};

// Business Metrics Widget
const BusinessMetrics = ({ metrics }: { metrics: any }) => {
  return (
    <SimpleGrid cols={2} spacing="md">
      <Paper p="md" radius="md" withBorder>
        <Group>
          <ThemeIcon size="lg" variant="light" color="green">
            <IconCurrencyDollar size={20} />
          </ThemeIcon>
          <div>
            <Text size="xs" color="dimmed">Revenue</Text>
            <Text size="xl" weight={700}>${metrics.revenue}K</Text>
          </div>
        </Group>
      </Paper>
      
      <Paper p="md" radius="md" withBorder>
        <Group>
          <ThemeIcon size="lg" variant="light" color="blue">
            <IconHanger size={20} />
          </ThemeIcon>
          <div>
            <Text size="xs" color="dimmed">Orders</Text>
            <Text size="xl" weight={700}>{metrics.orders}</Text>
          </div>
        </Group>
      </Paper>
      
      <Paper p="md" radius="md" withBorder>
        <Group>
          <ThemeIcon size="lg" variant="light" color="violet">
            <IconNews size={20} />
          </ThemeIcon>
          <div>
            <Text size="xs" color="dimmed">Press Features</Text>
            <Text size="xl" weight={700}>{metrics.pressFeatures}</Text>
          </div>
        </Group>
      </Paper>
      
      <Paper p="md" radius="md" withBorder>
        <Group>
          <ThemeIcon size="lg" variant="light" color="pink">
            <IconBrandInstagram size={20} />
          </ThemeIcon>
          <div>
            <Text size="xs" color="dimmed">Social Reach</Text>
            <Text size="xl" weight={700}>{metrics.socialReach}K</Text>
          </div>
        </Group>
      </Paper>
    </SimpleGrid>
  );
};

export const DesignerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for demonstration
  const designerStats = {
    collections: 5,
    totalShows: 12,
    modelsWorked: 18,
    pressFeatures: 23,
    revenue: 125,
    orders: 45,
    socialReach: 15
  };

  const currentCollections = [
    {
      id: 1,
      name: "Spring/Summer 2025",
      pieces: 30,
      completionRate: 80,
      season: "SS25",
      coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400"
    },
    {
      id: 2,
      name: "Resort Collection",
      pieces: 20,
      completionRate: 100,
      season: "Resort 2025",
      coverImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400"
    },
    {
      id: 3,
      name: "Fall/Winter 2025",
      pieces: 35,
      completionRate: 45,
      season: "FW25",
      coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400"
    }
  ];

  const upcomingShows = [
    { name: "Fashion Week Milan", date: "Mar 15, 2025", venue: "Palazzo delle Stelline", status: "confirmed" },
    { name: "Designer Showcase Paris", date: "Apr 2, 2025", venue: "Grand Palais", status: "confirmed" },
    { name: "Trade Show NYC", date: "May 10, 2025", venue: "Javits Center", status: "pending" }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 15, orders: 5 },
    { month: 'Feb', revenue: 22, orders: 8 },
    { month: 'Mar', revenue: 18, orders: 6 },
    { month: 'Apr', revenue: 28, orders: 10 },
    { month: 'May', revenue: 25, orders: 9 },
    { month: 'Jun', revenue: 17, orders: 7 }
  ];

  const businessMetrics = {
    revenue: designerStats.revenue,
    orders: designerStats.orders,
    pressFeatures: designerStats.pressFeatures,
    socialReach: designerStats.socialReach
  };

  return (
    <Box p="md">
      <Group position="apart" mb="xl">
        <Title order={2}>Designer Studio</Title>
        <Button leftIcon={<IconPlus size={16} />} variant="filled" color="violet">
          New Collection
        </Button>
      </Group>      
      {/* Quick Stats */}
      <Grid mb="xl">
        <Grid.Col xs={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <div>
                <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                  Collections
                </Text>
                <Title order={3} mt="xs">{designerStats.collections}</Title>
              </div>
              <ThemeIcon size="xl" variant="light" color="violet">
                <IconPalette size={24} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <div>
                <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                  Shows
                </Text>
                <Title order={3} mt="xs">{designerStats.totalShows}</Title>
              </div>
              <ThemeIcon size="xl" variant="light" color="blue">
                <IconCalendarEvent size={24} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <div>
                <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                  Models
                </Text>
                <Title order={3} mt="xs">{designerStats.modelsWorked}</Title>
              </div>
              <ThemeIcon size="xl" variant="light" color="pink">
                <IconUsers size={24} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <div>
                <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                  Press
                </Text>
                <Title order={3} mt="xs">{designerStats.pressFeatures}</Title>
              </div>
              <ThemeIcon size="xl" variant="light" color="teal">
                <IconNews size={24} />
              </ThemeIcon>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onTabChange={(value) => setActiveTab(value || 'overview')} color="violet">
        <Tabs.List>
          <Tabs.Tab value="overview" icon={<IconPalette size={14} />}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab value="collections" icon={<IconHanger size={14} />}>
            Collections
          </Tabs.Tab>
          <Tabs.Tab value="analytics" icon={<IconTrendingUp size={14} />}>
            Analytics
          </Tabs.Tab>
          <Tabs.Tab value="portfolio" icon={<IconPhoto size={14} />}>
            Portfolio
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview" pt="xl">
          <Grid>
            {/* Current Projects */}
            <Grid.Col xs={12} md={8}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group position="apart" mb="md">
                  <Title order={4}>Current Collections</Title>
                  <Text size="sm" color="dimmed">View all</Text>
                </Group>
                <SimpleGrid cols={2} spacing="md">
                  {currentCollections.slice(0, 2).map(collection => (
                    <CollectionCard key={collection.id} collection={collection} />
                  ))}
                </SimpleGrid>
              </Card>
            </Grid.Col>

            {/* Upcoming Shows */}
            <Grid.Col xs={12} md={4}>
              <ShowSchedule shows={upcomingShows} />
            </Grid.Col>

            {/* Business Metrics */}
            <Grid.Col xs={12} md={6}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Title order={4} mb="md">Business Performance</Title>
                <BusinessMetrics metrics={businessMetrics} />
              </Card>
            </Grid.Col>

            {/* Revenue Chart */}
            <Grid.Col xs={12} md={6}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Title order={4} mb="md">Revenue Trend</Title>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      name="Revenue ($K)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#ec4899" 
                      strokeWidth={2}
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="collections" pt="xl">
          <SimpleGrid cols={3} spacing="lg">
            {currentCollections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
            <Card 
              shadow="sm" 
              p="lg" 
              radius="md" 
              withBorder 
              sx={{ 
                border: '2px dashed #dee2e6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 280,
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#8b5cf6'
                }
              }}
            >
              <Stack align="center" spacing="sm">
                <ThemeIcon size="xl" variant="light" color="violet">
                  <IconPlus size={24} />
                </ThemeIcon>
                <Text size="sm" weight={500} color="dimmed">
                  Create New Collection
                </Text>
              </Stack>
            </Card>
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="analytics" pt="xl">
          <Grid>
            <Grid.Col xs={12}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Title order={4} mb="md">Performance Analytics</Title>
                <Text color="dimmed" size="sm">
                  Detailed analytics and insights coming soon...
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="portfolio" pt="xl">
          <Grid>
            <Grid.Col xs={12}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Title order={4} mb="md">Portfolio Gallery</Title>
                <Text color="dimmed" size="sm">
                  Portfolio management features coming soon...
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};