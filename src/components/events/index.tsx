"use client";

import React from "react";
import { useList, useNavigation, useOne } from "@refinedev/core";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Container, 
  Title, 
  Text, 
  Card, 
  Group, 
  Badge, 
  Button, 
  Grid,
  Image,
  Stack,
  Divider,
  ActionIcon
} from "@mantine/core";

export const EventList = () => {
  const { show, edit, create } = useNavigation();
  
  const { data, isLoading, isError, error } = useList({
    resource: "events",
  });

  if (isLoading) return <Container><Text>Loading events...</Text></Container>;
  if (isError) {
    console.error("Error loading events:", error);
    return <Container><Text color="red">Error loading events. Check console for details.</Text></Container>;
  }
  
  return (
    <Container size="lg" py="xl">
      <Group position="apart" mb="xl">
        <Title order={1}>Events</Title>
        <Button onClick={() => create("events")} size="md">
          Create New Event
        </Button>
      </Group>
      
      <Text color="dimmed" mb="xl">Total events: {data?.data?.length || 0}</Text>
      
      <Grid gutter="lg">
        {data?.data?.map((event: any) => (
          <Grid.Col key={event.id} span={12}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Group position="apart" mb="xs">
                <Title order={3}>{event.title}</Title>
                <Badge 
                  color={event.status === "published" ? "green" : "yellow"} 
                  variant="filled"
                >
                  {event.status}
                </Badge>
              </Group>
              
              <Text size="sm" color="dimmed" mb="md">
                {new Date(event.event_date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
              
              {event.description && (
                <Text size="sm" lineClamp={2} mb="md">
                  {event.description}
                </Text>
              )}
              
              <Group position="apart">
                <Text size="sm">
                  <strong>Target Attendance:</strong> {event.target_attendance}
                </Text>
                <Group spacing="xs">
                  <Button 
                    component={Link} 
                    href={`/events/show/${event.id}`}
                    variant="light"
                    size="sm"
                  >
                    View Details
                  </Button>
                  <Button 
                    component={Link} 
                    href={`/events/edit/${event.id}`}
                    variant="subtle"
                    color="green"
                    size="sm"
                  >
                    Edit
                  </Button>
                </Group>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export const EventCreate = () => {
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">Create Event</Title>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Text>Form will go here</Text>
      </Card>
    </Container>
  );
};

export const EventEdit = () => {
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">Edit Event</Title>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Text>Edit form will go here</Text>
      </Card>
    </Container>
  );
};

export const EventShow = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useOne({
    resource: "events",
    id: id as string,
  });

  if (isLoading) return <Container><Text>Loading event details...</Text></Container>;
  if (isError) return <Container><Text color="red">Error loading event details</Text></Container>;
  if (!data?.data) return <Container><Text>Event not found</Text></Container>;

  const event = data.data;

  return (
    <Container size="lg" py="xl">
      <Button 
        component={Link} 
        href="/events"
        variant="subtle"
        mb="xl"
      >
        ← Back to Events
      </Button>
      
      <Card shadow="sm" p="xl" radius="md" withBorder>
        <Group position="apart" mb="md">
          <Title order={1}>{event.title}</Title>
          <Badge 
            size="lg"
            color={event.status === "published" ? "green" : "yellow"} 
            variant="filled"
          >
            {event.status}
          </Badge>
        </Group>
        
        <Divider my="md" />
        
        {event.featured_image && (
          <Image
            src={event.featured_image}
            alt={event.title}
            radius="md"
            mb="xl"
            withPlaceholder
          />
        )}
        
        <Grid gutter="xl">
          <Grid.Col span={12} md={6}>
            <Stack spacing="sm">
              <Group>
                <Text weight={500}>Event Date:</Text>
                <Text>{new Date(event.event_date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</Text>
              </Group>
              
              <Group>
                <Text weight={500}>Start Time:</Text>
                <Text>{event.start_time || "TBD"}</Text>
              </Group>
              
              <Group>
                <Text weight={500}>End Time:</Text>
                <Text>{event.end_time || "TBD"}</Text>
              </Group>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={12} md={6}>
            <Stack spacing="sm">
              <Group>
                <Text weight={500}>Target Attendance:</Text>
                <Text>{event.target_attendance}</Text>
              </Group>
              
              <Group>
                <Text weight={500}>Current Attendance:</Text>
                <Text>{event.current_attendance}</Text>
              </Group>
              
              <Group>
                <Text weight={500}>Venue ID:</Text>
                <Text>{event.venue_id || "Not assigned"}</Text>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
        
        {event.description && (
          <>
            <Divider my="xl" />
            <Title order={3} mb="md">Description</Title>
            <Text>{event.description}</Text>
          </>
        )}
        
        <Divider my="xl" />
        
        <Group>
          <Button 
            component={Link} 
            href={`/events/edit/${event.id}`}
            color="green"
          >
            Edit Event
          </Button>
          <Button 
            variant="subtle"
            color="red"
          >
            Delete Event
          </Button>
        </Group>
      </Card>
    </Container>
  );
};
