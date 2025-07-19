import React, { useState } from 'react';
import { Grid, Card, Title, Text, Group, Badge, Box, Timeline, Progress, Button, Avatar, Stack, Indicator } from "@mantine/core";
import { IconCalendarEvent, IconUsers, IconCurrencyDollar, IconChecklist, IconClock, IconMapPin, IconUserCheck } from "@tabler/icons";
import { useList, useOne } from "@refinedev/core";
import { Calendar } from '@mantine/dates';

// Task Card Component
const TaskCard = ({ task }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  return (
    <Card shadow="sm" p="sm" radius="md" withBorder mb="sm">
      <Group position="apart">
        <div style={{ flex: 1 }}>
          <Group>
            <Text size="sm" weight={500}>{task.title}</Text>
            <Badge size="sm" color={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </Group>
          <Text size="xs" color="dimmed" mt="xs">{task.description}</Text>
        </div>
        <Badge color={task.completed ? "green" : "gray"} variant={task.completed ? "filled" : "light"}>
          {task.completed ? "Done" : "Pending"}
        </Badge>
      </Group>
    </Card>
  );
};

// Resource Status Component
const ResourceStatus = ({ resources }) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={4} mb="md">Resource Status</Title>
      <Stack spacing="md">
        <Box>
          <Group position="apart" mb="xs">
            <Group>
              <IconUsers size={20} />
              <Text size="sm">Models</Text>
            </Group>
            <Text size="sm" weight={500}>{resources.models.confirmed}/{resources.models.total}</Text>
          </Group>
          <Progress value={(resources.models.confirmed / resources.models.total) * 100} color="blue" />
        </Box>
        
        <Box>
          <Group position="apart" mb="xs">
            <Group>
              <IconMapPin size={20} />
              <Text size="sm">Venues</Text>
            </Group>
            <Text size="sm" weight={500}>{resources.venues.booked}/{resources.venues.needed}</Text>
          </Group>
          <Progress value={(resources.venues.booked / resources.venues.needed) * 100} color="teal" />
        </Box>
        
        <Box>
          <Group position="apart" mb="xs">
            <Group>
              <IconUserCheck size={20} />
              <Text size="sm">Vendors</Text>
            </Group>
            <Text size="sm" weight={500}>{resources.vendors.hired}/{resources.vendors.required}</Text>
          </Group>
          <Progress value={(resources.vendors.hired / resources.vendors.required) * 100} color="green" />
        </Box>
        
        <Box>
          <Group position="apart" mb="xs">
            <Group>
              <IconCurrencyDollar size={20} />
              <Text size="sm">Budget</Text>
            </Group>
            <Text size="sm" weight={500}>{resources.budget.used}%</Text>
          </Group>
          <Progress value={resources.budget.used} color={resources.budget.used > 80 ? "red" : "violet"} />
        </Box>
      </Stack>
    </Card>
  );
};

// Event Timeline Component
const EventTimelineWidget = ({ currentEvent }) => {
  const timelineItems = [
    {
      title: "Pre-Event (3 weeks out)",
      status: "completed",
      tasks: ["Venue confirmed", "Models booked", "Sponsors secured"],
      date: "Mar 1-7"
    },
    {
      title: "Setup Week",
      status: "active",
      tasks: ["Stage design", "Lighting setup", "Rehearsals"],
      date: "Mar 8-14"
    },
    {
      title: "Event Day",
      status: "upcoming",
      tasks: ["Final checks", "Guest arrival", "Show time"],
      date: "Mar 15"
    },
    {
      title: "Post-Event",
      status: "upcoming",
      tasks: ["Breakdown", "Payments", "Follow-ups"],
      date: "Mar 16-20"
    }
  ];

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={4} mb="md">Event Timeline: {currentEvent?.name || "Fashion Week 2025"}</Title>
      <Timeline active={1} bulletSize={24} lineWidth={2}>
        {timelineItems.map((item, index) => (
          <Timeline.Item
            key={index}
            bullet={item.status === 'completed' ? <IconChecklist size={12} /> : <IconClock size={12} />}
            title={item.title}
          >
            <Text color="dimmed" size="xs" mt={4}>{item.date}</Text>
            <Stack spacing={4} mt="xs">
              {item.tasks.map((task, taskIndex) => (
                <Text key={taskIndex} size="xs">• {task}</Text>
              ))}
            </Stack>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};

export const OrganizerDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Fetch organizer's events
  const { data: eventsData } = useList({
    resource: "events",
    filters: [
      {
        field: "organizer_id",
        operator: "eq",
        value: "current_user_id" // This would be the actual user ID
      }
    ]
  });

  // Mock data for demonstration
  const myEvents = eventsData?.data || [];
  const upcomingEvents = myEvents.filter(e => e.status === 'published').length;
  const totalRevenue = 150000;
  const pendingTasks = 8;

  const currentTasks = [
    { id: 1, title: "Confirm runway setup", description: "Verify stage dimensions with venue", priority: "high", completed: false },
    { id: 2, title: "Review model lineup", description: "Final approval on model selection", priority: "medium", completed: false },
    { id: 3, title: "Sponsor booth allocation", description: "Assign booth spaces to sponsors", priority: "medium", completed: true },
    { id: 4, title: "Media credentials", description: "Process media accreditation requests", priority: "low", completed: false },
  ];

  const resources = {
    models: { confirmed: 25, total: 30 },
    venues: { booked: 3, needed: 3 },
    vendors: { hired: 8, required: 10 },
    budget: { used: 85 }
  };

  const teamMembers = [
    { name: "Alice Chen", role: "Event Coordinator", avatar: "AC", status: "online" },
    { name: "Bob Smith", role: "Production Manager", avatar: "BS", status: "online" },
    { name: "Carol Davis", role: "Marketing Lead", avatar: "CD", status: "away" },
  ];

  return (
    <Box p="md">
      <Title order={2} mb="xl">Organizer Dashboard</Title>      
      {/* Quick Stats */}
      <Grid mb="xl">
        <Grid.Col xs={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <div>
                <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                  My Events
                </Text>
                <Title order={3} mt="xs">{myEvents.length}</Title>
              </div>
              <IconCalendarEvent size={30} color="#228be6" />
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <div>
                <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                  This Month
                </Text>
                <Title order={3} mt="xs">{upcomingEvents}</Title>
              </div>
              <IconClock size={30} color="#40c057" />
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <div>
                <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                  Revenue
                </Text>
                <Title order={3} mt="xs">${(totalRevenue / 1000).toFixed(0)}K</Title>
              </div>
              <IconCurrencyDollar size={30} color="#7950f2" />
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} sm={6} md={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <div>
                <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                  Pending Tasks
                </Text>
                <Title order={3} mt="xs">{pendingTasks}</Title>
              </div>
              <IconChecklist size={30} color="#fa5252" />
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Main Content */}
      <Grid>
        {/* Event Timeline and Tasks */}
        <Grid.Col xs={12} md={8}>
          <Grid>
            {/* Event Timeline */}
            <Grid.Col span={12}>
              <EventTimelineWidget currentEvent={myEvents[0]} />
            </Grid.Col>
            
            {/* Task Management */}
            <Grid.Col span={12}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group position="apart" mb="md">
                  <Title order={4}>Current Tasks</Title>
                  <Button size="xs" variant="light">View All</Button>
                </Group>
                <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                  {currentTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </Box>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>

        {/* Right Sidebar */}
        <Grid.Col xs={12} md={4}>
          <Stack spacing="lg">
            {/* Resource Status */}
            <ResourceStatus resources={resources} />
            
            {/* Team Members */}
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Title order={4} mb="md">Team Members</Title>
              <Stack spacing="sm">
                {teamMembers.map((member, index) => (
                  <Group key={index}>
                    <Indicator 
                      inline 
                      size={10} 
                      offset={5} 
                      position="bottom-end" 
                      color={member.status === 'online' ? 'green' : 'yellow'}
                      withBorder
                    >
                      <Avatar size="sm" radius="xl" color="blue">
                        {member.avatar}
                      </Avatar>
                    </Indicator>
                    <div style={{ flex: 1 }}>
                      <Text size="sm" weight={500}>{member.name}</Text>
                      <Text size="xs" color="dimmed">{member.role}</Text>
                    </div>
                  </Group>
                ))}
              </Stack>
            </Card>
            
            {/* Event Calendar */}
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Title order={4} mb="md">Event Calendar</Title>
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                size="sm"
                fullWidth
                styles={{
                  cell: {
                    border: '1px solid #e9ecef',
                  },
                  day: {
                    borderRadius: 0,
                    height: 35,
                    fontSize: 13,
                  },
                  weekday: {
                    fontSize: 13,
                    color: '#868e96',
                  },
                }}
                renderDay={(date) => {
                  const day = date.getDate();
                  const hasEvent = [5, 12, 15, 22, 28].includes(day);
                  
                  return (
                    <Box sx={{ position: 'relative' }}>
                      {day}
                      {hasEvent && (
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 2,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            backgroundColor: '#228be6',
                          }}
                        />
                      )}
                    </Box>
                  );
                }}
              />
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
};