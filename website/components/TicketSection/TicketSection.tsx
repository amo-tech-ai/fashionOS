import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Stack,
  Group,
  Button,
  List,
  ThemeIcon,
  Badge,
  Center,
  Box,
  Divider,
} from '@mantine/core';
import { IconCheck, IconLock, IconCreditCard } from '@tabler/icons-react';
import { useInterval } from '@mantine/hooks';
import classes from './TicketSection.module.css';

// Reusable Time Segment Component
interface TimeSegmentProps {
  value: string;
  label: string;
}

function TimeSegment({ value, label }: TimeSegmentProps) {
  return (
    <Stack align="center" gap={4}>
      <Title order={3} size="2.5rem" fw={700} c="white">
        {value}
      </Title>
      <Text size="xs" c="fashionNeutral.4" tt="uppercase">
        {label}
      </Text>
    </Stack>
  );
}

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    // Set your target date here - example: Feb 14, 2025
    const targetDate = new Date('2025-02-14T20:00:00');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }
  };

  useInterval(calculateTimeLeft, 1000, { autoInvoke: true });

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  // Data-driven approach instead of hard-coded segments
  const timeSegments = [
    { value: formatNumber(timeLeft.days), label: 'Days' },
    { value: formatNumber(timeLeft.hours), label: 'Hours' },
    { value: formatNumber(timeLeft.minutes), label: 'Minutes' },
    { value: formatNumber(timeLeft.seconds), label: 'Seconds' },
  ];

  return (
    <Group 
      justify="center" 
      gap="md" 
      mb={40}
      role="timer"
      aria-live="polite"
      aria-label="Time remaining until Medellín Fashion Nights 2025"
    >
      {timeSegments.map((segment, index) => (
        <React.Fragment key={segment.label}>
          <TimeSegment value={segment.value} label={segment.label} />
          {index < timeSegments.length - 1 && (
            <Divider 
              orientation="vertical" 
              size="sm" 
              color="fashionNeutral.6"
              h={60}
              style={{ alignSelf: 'center' }}
            />
          )}
        </React.Fragment>
      ))}
    </Group>
  );
}

// Ticket data
const ticketData = [
  {
    title: 'General Admission',
    description: 'Standard access to the Fashionistas Valentine\'s Event',
    price: 99,
    perks: [
      'Standard seating',
      'Welcome drink',
      'Event program',
      'Access to general areas',
      'Basic networking opportunities',
    ],
    footerText: 'Limited Tickets Remaining',
    isPopular: false,
  },
  {
    title: 'VIP Experience',
    description: 'Premium access with exclusive perks and privileges',
    price: 249,
    perks: [
      'Front-row seating',
      'Welcome champagne',
      'VIP lounge access',
      'Meet & Greet opportunities',
      'After-party entry',
    ],
    footerText: 'Only 20 VIP Tickets Left',
    isPopular: true,
  },
  {
    title: 'Sponsor Package',
    description: 'Ultimate experience with maximum visibility',
    price: 499,
    perks: [
      'Premium seating',
      'Unlimited premium drinks',
      'Private suite access',
      'Brand visibility opportunities',
      'Private after-party suite',
    ],
    footerText: '5 Exclusive Spots Left',
    isPopular: false,
  },
];

export function TicketSection() {
  const tickets = ticketData.map((ticket) => (
    <Card
      key={ticket.title}
      shadow="md"
      radius="md"
      padding="xl"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {ticket.isPopular && (
        <Badge
          color="pink"
          variant="filled"
          size="sm"
          radius="sm"
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          VIP
        </Badge>
      )}

      <Stack gap="lg" h="100%">
        <div>
          <Title order={3} c="white" mb={8}>
            {ticket.title}
          </Title>
          <Text size="sm" c="dimmed">
            {ticket.description}
          </Text>
        </div>

        <div>
          <Group align="baseline" gap={4}>
            <Text size="2.5rem" fw={700} c="white">
              ${ticket.price}
            </Text>
            <Text size="sm" c="dimmed">
              /person
            </Text>
          </Group>
        </div>

        <List
          spacing="sm"
          size="sm"
          center
          icon={
            <ThemeIcon color="pink" size={20} radius="xl">
              <IconCheck size={12} stroke={1.5} />
            </ThemeIcon>
          }
          style={{ flex: 1 }}
        >
          {ticket.perks.map((perk, index) => (
            <List.Item key={index} style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              {perk}
            </List.Item>
          ))}
        </List>

        <Stack gap="sm" mt="auto">
          <Group gap={8}>
            <IconLock size={14} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
            <Text size="xs" c="dimmed">
              Secure payment with Stripe
            </Text>
          </Group>

          <Button
            fullWidth
            size="md"
            variant="filled"
            color="pink"
            styles={{
              root: {
                background: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
                },
              },
            }}
          >
            Select Ticket
          </Button>

          <Text size="xs" c="dimmed" ta="center">
            {ticket.footerText}
          </Text>
        </Stack>
      </Stack>
    </Card>
  ));

  return (
    <Box
      style={{
        backgroundColor: '#0a0a0a',
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      <Container size="lg">
        <Stack gap="xl">
          <div>
            <Title
              order={1}
              ta="center"
              c="white"
              size="3rem"
              fw={300}
              mb="md"
            >
              Choose Your Perfect Ticket
            </Title>
            <Text ta="center" c="dimmed" size="lg" maw={600} mx="auto">
              Reserve your spot for Medellín's most glamorous night!
            </Text>
            <Text ta="center" c="dimmed" size="sm" mt="xs">
              Join 100+ attendees who've already secured their tickets
            </Text>
          </div>

          <CountdownTimer />

          <Text ta="center" c="dimmed" size="sm" mb="xl">
            Don't miss out on Medellín's most glamorous event!
          </Text>

          <SimpleGrid 
            cols={{ base: 1, md: 2, lg: 3 }} 
            spacing="lg" 
            verticalSpacing="lg" 
            style={{ alignItems: 'stretch' }}
          >
            {tickets}
          </SimpleGrid>

          <Center mt="xl">
            <Group gap="xs">
              <IconCreditCard size={16} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
              <Text size="sm" c="dimmed">
                Secure Checkout - Verified by Stripe
              </Text>
              <IconLock size={14} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
            </Group>
          </Center>
        </Stack>
      </Container>
    </Box>
  );
}