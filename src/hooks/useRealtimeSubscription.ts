import { useEffect, useState } from 'react';
import { supabaseClient } from '@/utility/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

interface UseRealtimeOptions {
  table: string;
  filter?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  schema?: string;
}

export const useRealtimeSubscription = <T extends Record<string, any>>({
  table,
  filter,
  event = '*',
  schema = 'public'
}: UseRealtimeOptions) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    // Initial data fetch
    const fetchInitialData = async () => {
      try {
        let query = supabaseClient.from(table).select('*');
        
        if (filter) {
          // Parse simple filters like "user_id=eq.123"
          const [field, operator, value] = filter.split(/[=.]/);
          if (operator === 'eq') {
            query = query.eq(field, value);
          }
        }
        
        const { data: initialData, error: fetchError } = await query;
        
        if (fetchError) throw fetchError;
        
        setData(initialData || []);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchInitialData();

    // Set up real-time subscription
    const channelName = `realtime-${table}-${Date.now()}`;
    const newChannel = supabaseClient.channel(channelName);

    const subscription = newChannel
      .on(
        'postgres_changes',
        {
          event,
          schema,
          table,
          filter
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          
          switch (payload.eventType) {
            case 'INSERT':
              setData(current => [...current, payload.new as T]);
              break;
            
            case 'UPDATE':
              setData(current =>
                current.map(item =>
                  item.id === payload.new.id ? payload.new as T : item
                )
              );
              break;
            
            case 'DELETE':
              setData(current =>
                current.filter(item => item.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    setChannel(newChannel);

    // Cleanup
    return () => {
      if (newChannel) {
        supabaseClient.removeChannel(newChannel);
      }
    };
  }, [table, filter, event, schema]);

  return { data, loading, error, channel };
};

// Hook for dashboard-specific real-time data
export const useDashboardRealtime = (userRole: string, userId?: string) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  
  useEffect(() => {
    if (!userId) return;

    // Subscribe to user-specific notifications
    const notificationChannel = supabaseClient
      .channel('dashboard-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          setNotifications(current => [payload.new, ...current]);
        }
      )
      .subscribe();

    // Subscribe to activity log based on role
    let activityFilter = '';
    switch (userRole) {
      case 'admin':
        // Admin sees all activities
        activityFilter = '';
        break;
      case 'organizer':
        // Organizer sees event-related activities
        activityFilter = `activity_type=in.(event_created,event_updated,registration_new)`;
        break;
      case 'sponsor':
        // Sponsor sees lead-related activities
        activityFilter = `activity_type=in.(lead_captured,sponsor_view,roi_update)`;
        break;
      default:
        activityFilter = `user_id=eq.${userId}`;
    }

    const activityChannel = supabaseClient
      .channel('dashboard-activities')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_activity_log',
          filter: activityFilter
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setActivities(current => [payload.new, ...current].slice(0, 50));
          }
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      supabaseClient.removeChannel(notificationChannel);
      supabaseClient.removeChannel(activityChannel);
    };
  }, [userRole, userId]);

  return { notifications, activities };
};

// Hook for real-time event updates
export const useEventRealtime = (eventId?: string) => {
  const { data: registrations, loading: registrationsLoading } = useRealtimeSubscription({
    table: 'registrations',
    filter: eventId ? `event_id=eq.${eventId}` : undefined,
    event: '*'
  });

  const { data: updates, loading: updatesLoading } = useRealtimeSubscription({
    table: 'event_updates',
    filter: eventId ? `event_id=eq.${eventId}` : undefined,
    event: 'INSERT'
  });

  return {
    registrations,
    updates,
    loading: registrationsLoading || updatesLoading
  };
};

// Hook for real-time analytics
export const useAnalyticsRealtime = (dashboardType: string) => {
  const [metrics, setMetrics] = useState<any>({});
  
  useEffect(() => {
    const metricsChannel = supabaseClient
      .channel(`analytics-${dashboardType}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'dashboard_analytics_cache',
          filter: `cache_key=eq.${dashboardType}_metrics`
        },
        (payload) => {
          if (payload.new && payload.new.data) {
            setMetrics(payload.new.data);
          }
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(metricsChannel);
    };
  }, [dashboardType]);

  return { metrics };
};
