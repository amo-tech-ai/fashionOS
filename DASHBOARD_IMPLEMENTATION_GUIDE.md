# Multi-Role Dashboard Implementation Guide

## Current Status Analysis 🔍

### ✅ What's Already Working:
1. **Database Connection**: Supabase is properly connected
2. **Basic Tables**: users, events, sponsors, venues exist
3. **User Roles**: 8 users with different roles already created
4. **Basic Dashboard**: Admin dashboard with events management

### ❌ What's Missing:
1. **Role-specific profile tables** (designer_profiles, model_profiles, etc.)
2. **Dashboard data tables** (preferences, analytics cache)
3. **Enhanced table columns** for dashboard features
4. **RLS policies** for multi-role access
5. **Role-specific UI components**

## Implementation Plan 📋

### Phase 1: Database Enhancement (This Week)

#### Step 1: Run Migration Scripts
Copy and paste these migrations in Supabase SQL Editor:

```sql
-- 1. First, enhance existing tables
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS user_type VARCHAR(20) DEFAULT 'attendee',
ADD COLUMN IF NOT EXISTS dashboard_preferences JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS last_dashboard_access TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS dashboard_version VARCHAR(10) DEFAULT 'v1';

-- Update user_type from existing role
UPDATE users SET user_type = role WHERE role IS NOT NULL;

-- 2. Create profile tables for each role
-- Designer profiles
CREATE TABLE IF NOT EXISTS designer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  brand_name VARCHAR(255),
  style_focus TEXT[],
  years_experience INTEGER,
  portfolio_url TEXT,
  awards JSONB DEFAULT '[]',
  signature_style TEXT,
  collections_count INTEGER DEFAULT 0,
  shows_participated INTEGER DEFAULT 0,
  press_features INTEGER DEFAULT 0,
  social_followers INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Model profiles
CREATE TABLE IF NOT EXISTS model_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  stage_name VARCHAR(255),
  measurements JSONB DEFAULT '{}',
  height_cm INTEGER,
  experience_level VARCHAR(50),
  portfolio_images TEXT[],
  specialties TEXT[],
  availability_schedule JSONB DEFAULT '{}',
  total_shows INTEGER DEFAULT 0,
  total_earnings DECIMAL(12,2) DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Continue with venue_profiles, vendor_profiles, media_profiles, organizer_profiles...
```

#### Step 2: Create Dashboard Components

Location: `/src/components/dashboards/`

Structure:
```
src/
├── components/
│   └── dashboards/
│       ├── admin/
│       │   ├── AdminDashboard.tsx
│       │   ├── SystemHealth.tsx
│       │   └── UserManagement.tsx
│       ├── organizer/
│       │   ├── OrganizerDashboard.tsx
│       │   ├── EventTimeline.tsx
│       │   └── ResourceBooking.tsx
│       ├── sponsor/
│       │   ├── SponsorDashboard.tsx
│       │   ├── ROIAnalytics.tsx
│       │   └── LeadTracking.tsx
│       └── shared/
│           ├── DashboardLayout.tsx
│           └── RoleBasedNavigation.tsx
```

### Phase 2: Role-Based Navigation

#### Update Layout Component:
```typescript
// src/components/layout/index.tsx
import { useGetIdentity } from "@refinedev/core";
import { AdminDashboard } from "../dashboards/admin/AdminDashboard";
import { OrganizerDashboard } from "../dashboards/organizer/OrganizerDashboard";
import { SponsorDashboard } from "../dashboards/sponsor/SponsorDashboard";

export const DashboardRouter = () => {
  const { data: identity } = useGetIdentity();
  
  switch(identity?.user_type) {
    case 'admin':
    case 'super_admin':
      return <AdminDashboard />;
    case 'organizer':
      return <OrganizerDashboard />;
    case 'sponsor':
      return <SponsorDashboard />;
    // ... other roles
    default:
      return <DefaultDashboard />;
  }
};
```

### Phase 3: Create Role-Specific Dashboards

#### 1. Admin Dashboard Enhancement
```typescript
// src/components/dashboards/admin/AdminDashboard.tsx
import { Grid, Card, Title, Text, Group } from "@mantine/core";
import { AreaChart, BarChart } from "@mantine/charts";
import { SystemHealthWidget } from "./SystemHealth";
import { UserActivityFeed } from "./UserActivityFeed";

export const AdminDashboard = () => {
  return (
    <Grid>
      {/* KPI Cards */}
      <Grid.Col span={3}>
        <Card>
          <Text size="sm">Total Events</Text>
          <Title order={2}>156</Title>
          <Text color="green">+12% from last month</Text>
        </Card>
      </Grid.Col>
      
      {/* Real-time Analytics */}
      <Grid.Col span={12}>
        <Card>
          <Title order={3}>Event Pipeline</Title>
          <AreaChart data={eventPipelineData} />
        </Card>
      </Grid.Col>
      
      {/* System Health */}
      <Grid.Col span={6}>
        <SystemHealthWidget />
      </Grid.Col>
      
      {/* User Activity */}
      <Grid.Col span={6}>
        <UserActivityFeed />
      </Grid.Col>
    </Grid>
  );
};
```

#### 2. Organizer Dashboard
```typescript
// src/components/dashboards/organizer/OrganizerDashboard.tsx
import { Timeline, Calendar } from "@mantine/dates";
import { TaskList } from "./TaskList";
import { ResourceStatus } from "./ResourceStatus";

export const OrganizerDashboard = () => {
  return (
    <Grid>
      {/* Event Timeline */}
      <Grid.Col span={8}>
        <Card>
          <Title order={3}>Event Timeline</Title>
          <Timeline active={1}>
            <Timeline.Item title="Pre-Event Setup">
              <TaskList stage="pre-event" />
            </Timeline.Item>
            <Timeline.Item title="Event Day">
              <TaskList stage="event-day" />
            </Timeline.Item>
            <Timeline.Item title="Post-Event">
              <TaskList stage="post-event" />
            </Timeline.Item>
          </Timeline>
        </Card>
      </Grid.Col>
      
      {/* Resource Management */}
      <Grid.Col span={4}>
        <ResourceStatus />
      </Grid.Col>
    </Grid>
  );
};
```

#### 3. Sponsor Dashboard
```typescript
// src/components/dashboards/sponsor/SponsorDashboard.tsx
import { RingProgress, LineChart } from "@mantine/charts";
import { LeadFunnel } from "./LeadFunnel";
import { ROICalculator } from "./ROICalculator";

export const SponsorDashboard = () => {
  return (
    <Grid>
      {/* ROI Overview */}
      <Grid.Col span={12}>
        <Card>
          <Group position="apart">
            <div>
              <Title order={3}>Sponsorship ROI</Title>
              <Text size="xl" weight={700}>4.2x</Text>
            </div>
            <RingProgress
              sections={[
                { value: 40, color: 'cyan' },
                { value: 25, color: 'orange' },
                { value: 15, color: 'grape' },
              ]}
            />
          </Group>
        </Card>
      </Grid.Col>
      
      {/* Lead Analytics */}
      <Grid.Col span={8}>
        <LeadFunnel />
      </Grid.Col>
      
      {/* ROI Calculator */}
      <Grid.Col span={4}>
        <ROICalculator />
      </Grid.Col>
    </Grid>
  );
};
```

### Phase 4: Data Providers

#### Create Role-Specific Data Providers:
```typescript
// src/providers/dashboard-data-provider.ts
import { supabaseClient } from "@/utility/supabaseClient";

export const dashboardDataProvider = {
  getAdminMetrics: async () => {
    const { data: events } = await supabaseClient
      .from('events')
      .select('count');
      
    const { data: users } = await supabaseClient
      .from('users')
      .select('count');
      
    const { data: revenue } = await supabaseClient
      .from('revenue_summary')
      .select('total_revenue')
      .single();
      
    return { events, users, revenue };
  },
  
  getOrganizerTasks: async (userId: string) => {
    const { data: tasks } = await supabaseClient
      .from('event_tasks')
      .select('*')
      .eq('organizer_id', userId)
      .order('due_date');
      
    return tasks;
  },
  
  getSponsorROI: async (sponsorId: string) => {
    const { data: metrics } = await supabaseClient
      .from('sponsor_analytics')
      .select('*')
      .eq('sponsor_id', sponsorId)
      .single();
      
    return metrics;
  }
};
```

### Phase 5: Real-time Features

#### Add Real-time Subscriptions:
```typescript
// src/hooks/useRealtimeDashboard.ts
import { useEffect, useState } from 'react';
import { supabaseClient } from '@/utility/supabaseClient';

export const useRealtimeDashboard = (userId: string) => {
  const [updates, setUpdates] = useState([]);
  
  useEffect(() => {
    const subscription = supabaseClient
      .channel('dashboard-updates')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public',
          table: 'user_activity_log',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          setUpdates(prev => [...prev, payload.new]);
        }
      )
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);
  
  return updates;
};
```

## Testing & Validation ✅

### 1. Test Role Switching:
```bash
# Login as different users and verify dashboards
# organizer@example.com
# sponsor@example.com
# designer@example.com
```

### 2. Performance Testing:
```bash
# Run performance tests
npm run test:performance

# Check dashboard load times
npm run lighthouse
```

### 3. Mobile Responsiveness:
```bash
# Test on various devices
npm run test:mobile
```

## Deployment Checklist 🚀

1. [ ] Database migrations applied
2. [ ] TypeScript types regenerated
3. [ ] Role-based components created
4. [ ] Navigation updated
5. [ ] Data providers configured
6. [ ] Real-time subscriptions tested
7. [ ] RLS policies verified
8. [ ] Performance optimized
9. [ ] Mobile responsive
10. [ ] Documentation updated

## Next Steps 🎯

1. **Immediate**: Apply database migrations
2. **Today**: Create base dashboard components
3. **This Week**: Implement role-specific dashboards
4. **Next Week**: Add real-time features
5. **Testing**: Comprehensive testing with all roles

Would you like me to start implementing the dashboard components?
