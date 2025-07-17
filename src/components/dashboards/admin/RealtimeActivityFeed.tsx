import React, { useEffect, useState } from 'react';
import { Box, Text, Badge, ScrollArea } from '@mantine/core';
import { IconActivity, IconUser, IconCalendarEvent, IconCurrencyDollar } from '@tabler/icons';
import { useDashboardRealtime } from '@/hooks/useRealtimeSubscription';
import { useAuth } from '@/contexts/AuthContext';

interface Activity {
  id: string;
  activity_type: string;
  activity_data: any;
  created_at: string;
  user_id: string;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'event_created':
      return <IconCalendarEvent size={14} />;
    case 'user_registered':
      return <IconUser size={14} />;
    case 'payment_received':
      return <IconCurrencyDollar size={14} />;
    default:
      return <IconActivity size={14} />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'event_created':
      return 'blue';
    case 'user_registered':
      return 'green';
    case 'payment_received':
      return 'violet';
    case 'error':
      return 'red';
    default:
      return 'gray';
  }
};

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diff = Math.floor((now.getTime() - time.getTime()) / 1000);
  
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export const RealtimeActivityFeed: React.FC = () => {
  const { user, userRole } = useAuth();
  const { activities } = useDashboardRealtime(userRole || 'admin', user?.id);
  const [displayActivities, setDisplayActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Simulate some initial activities if none exist
    if (activities.length === 0) {
      const mockActivities: Activity[] = [
        {
          id: '1',
          activity_type: 'event_created',
          activity_data: { event_name: 'Fashion Week 2025', user_name: 'Omar Organizer' },
          created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          user_id: 'mock-1'
        },
        {
          id: '2',
          activity_type: 'user_registered',
          activity_data: { user_name: 'New Designer', user_email: 'designer@new.com' },
          created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          user_id: 'mock-2'
        },
        {
          id: '3',
          activity_type: 'payment_received',
          activity_data: { amount: 2500, sponsor_name: 'Fashion Brand Co.' },
          created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          user_id: 'mock-3'
        }
      ];
      setDisplayActivities(mockActivities);
    } else {
      setDisplayActivities(activities as Activity[]);
    }
  }, [activities]);

  const getActivityMessage = (activity: Activity) => {
    const data = activity.activity_data;
    switch (activity.activity_type) {
      case 'event_created':
        return `${data.user_name} created event "${data.event_name}"`;
      case 'user_registered':
        return `New user registered: ${data.user_name}`;
      case 'payment_received':
        return `Payment received: $${data.amount} from ${data.sponsor_name}`;
      default:
        return 'New activity';
    }
  };

  return (
    <Box>
      <Box mb="md" p="xs" sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        borderRadius: theme.radius.sm,
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.xs
      })}>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#40c057' }} />
        <Text size="xs" color="dimmed">Live Activity Feed</Text>
        <Badge size="xs" color="green" variant="light">Real-time</Badge>
      </Box>
      
      <ScrollArea h={300}>
        {displayActivities.length === 0 ? (
          <Text size="sm" color="dimmed" align="center" py="xl">
            No recent activities
          </Text>
        ) : (
          displayActivities.map((activity) => (
            <Box
              key={activity.id}
              mb="sm"
              pb="sm"
              sx={(theme) => ({
                borderBottom: `1px solid ${theme.colors.gray[2]}`,
                '&:last-child': { borderBottom: 'none' }
              })}
            >
              <Group position="apart">
                <Group spacing="xs">
                  <Box sx={(theme) => ({
                    color: theme.colors[getActivityColor(activity.activity_type)][6]
                  })}>
                    {getActivityIcon(activity.activity_type)}
                  </Box>
                  <Text size="sm">{getActivityMessage(activity)}</Text>
                </Group>
                <Text size="xs" color="dimmed">
                  {formatTimeAgo(activity.created_at)}
                </Text>
              </Group>
            </Box>
          ))
        )}
      </ScrollArea>
    </Box>
  );
};