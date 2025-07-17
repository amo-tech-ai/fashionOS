"use client";

import React from 'react';
import {
  Box,
  Card,
  Grid,
  Title,
  Text,
  Group,
  Badge,
  Button,
  Stack,
  Image,
  Progress,
  SimpleGrid
} from '@mantine/core';
import {
  IconCamera,
  IconCalendarEvent,
  IconStar,
  IconTrendingUp,
  IconUser,
  IconBrandInstagram
} from '@tabler/icons-react';

export const ModelDashboard = () => {
  // Mock data
  const portfolio = [
    { id: 1, url: '/placeholder1.jpg', caption: 'Fashion Week 2024' },
    { id: 2, url: '/placeholder2.jpg', caption: 'Summer Collection' },
    { id: 3, url: '/placeholder3.jpg', caption: 'Editorial Shoot' },
  ];

  const upcomingEvents = [
    { id: 1, name: 'Toronto Fashion Week', date: '2025-03-15', status: 'confirmed' },
    { id: 2, name: 'Summer Catalog Shoot', date: '2025-04-20', status: 'pending' },
  ];

  const stats = {
    totalBookings: 24,
    completedShows: 18,
    rating: 4.8,
    followers: 12500
  };

  return (
    <Box p="md">
      <Title order={2} mb="xl">Model Dashboard</Title>

      {/* Stats Overview */}
      <Grid mb="xl">
        <Grid.Col xs={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <Box>
                <Text size="xs" color="dimmed">Total Bookings</Text>
                <Text size="xl" weight={700}>{stats.totalBookings}</Text>
              </Box>
              <IconCalendarEvent size={32} color="blue" />
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <Box>
                <Text size="xs" color="dimmed">Completed Shows</Text>
                <Text size="xl" weight={700}>{stats.completedShows}</Text>
              </Box>
              <IconCamera size={32} color="green" />
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <Box>
                <Text size="xs" color="dimmed">Average Rating</Text>
                <Text size="xl" weight={700}>{stats.rating}</Text>
              </Box>
              <IconStar size={32} color="yellow" />
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <Box>
                <Text size="xs" color="dimmed">Followers</Text>
                <Text size="xl" weight={700}>{stats.followers.toLocaleString()}</Text>
              </Box>
              <IconBrandInstagram size={32} color="purple" />
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Main Content */}
      <Grid>
        {/* Portfolio Section */}
        <Grid.Col xs={12} md={8}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Title order={4} mb="md">Portfolio</Title>
            <SimpleGrid cols={3} spacing="lg">
              {portfolio.map((image) => (
                <Box 
                  key={image.id} 
                  sx={{ 
                    position: 'relative', 
                    paddingBottom: '100%', 
                    overflow: 'hidden', 
                    borderRadius: 8,
                    backgroundColor: '#f0f0f0'
                  }}
                >
                  <Text 
                    size="xs" 
                    sx={{ 
                      position: 'absolute', 
                      top: '50%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)',
                      color: '#999'
                    }}
                  >
                    {image.caption}
                  </Text>
                </Box>
              ))}
              
              {/* Add Photo Button */}
              <Card 
                sx={{ 
                  border: '2px dashed #dee2e6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: '#339af0'
                  }
                }}
              >
                <Stack align="center" spacing="xs">
                  <IconCamera size={24} color="#999" />
                  <Text size="sm" color="dimmed">Add Photo</Text>
                </Stack>
              </Card>
            </SimpleGrid>
          </Card>
        </Grid.Col>

        {/* Upcoming Events */}
        <Grid.Col xs={12} md={4}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Title order={4} mb="md">Upcoming Events</Title>
            <Stack spacing="md">
              {upcomingEvents.map((event) => (
                <Box key={event.id}>
                  <Group position="apart">
                    <Box>
                      <Text size="sm" weight={500}>{event.name}</Text>
                      <Text size="xs" color="dimmed">{event.date}</Text>
                    </Box>
                    <Badge 
                      color={event.status === 'confirmed' ? 'green' : 'yellow'}
                      variant="light"
                    >
                      {event.status}
                    </Badge>
                  </Group>
                </Box>
              ))}
              <Button variant="light" fullWidth>View All Events</Button>
            </Stack>
          </Card>

          {/* Performance Metrics */}
          <Card shadow="sm" p="lg" radius="md" withBorder mt="lg">
            <Title order={4} mb="md">Performance</Title>
            <Stack spacing="sm">
              <Box>
                <Group position="apart" mb="xs">
                  <Text size="sm">Booking Rate</Text>
                  <Text size="sm" weight={500}>75%</Text>
                </Group>
                <Progress value={75} color="blue" />
              </Box>
              <Box>
                <Group position="apart" mb="xs">
                  <Text size="sm">Client Satisfaction</Text>
                  <Text size="sm" weight={500}>96%</Text>
                </Group>
                <Progress value={96} color="green" />
              </Box>
              <Box>
                <Group position="apart" mb="xs">
                  <Text size="sm">Profile Completion</Text>
                  <Text size="sm" weight={500}>85%</Text>
                </Group>
                <Progress value={85} color="violet" />
              </Box>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
