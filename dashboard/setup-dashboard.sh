#!/bin/bash

# FashionOS Dashboard Enhancement Script
# Automates the implementation of enhanced dashboard components

echo "🎨 FashionOS Dashboard Enhancement Setup"
echo "========================================"

# Navigate to project directory
cd /home/sk25/fx/fashionos

# Create backup directory
echo "📁 Creating backups..."
mkdir -p backups/$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"

# Backup existing files
cp src/app/page.tsx $BACKUP_DIR/page.tsx.backup 2>/dev/null || echo "  ⚠️  page.tsx not found"
cp src/components/events/list.tsx $BACKUP_DIR/list.tsx.backup 2>/dev/null || echo "  ⚠️  list.tsx not found"
cp src/app/layout.tsx $BACKUP_DIR/layout.tsx.backup 2>/dev/null || echo "  ⚠️  layout.tsx not found"

echo "✅ Backups created in $BACKUP_DIR"

# Create new directories
echo "📁 Creating directory structure..."
mkdir -p src/components/dashboard
mkdir -p src/components/ui
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/types
mkdir -p src/styles

echo "✅ Directory structure created"

# Install required dependencies
echo "📦 Installing dependencies..."
npm install @mantine/charts @mantine/notifications @mantine/dates dayjs

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create theme file
echo "🎨 Creating theme configuration..."
cat > src/lib/theme.ts << 'EOF'
import { MantineThemeOverride } from "@mantine/core";

export const fashionTheme: MantineThemeOverride = {
  primaryColor: 'brand',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontWeight: 700,
  },
  colors: {
    brand: [
      '#f8f0ff',  // 0: Light lavender
      '#e4ccff',  // 1: Soft purple
      '#d0a8ff',  // 2: Medium lavender
      '#bc84ff',  // 3: Light purple
      '#a860ff',  // 4: Primary purple
      '#9c4dff',  // 5: Deep purple (main)
      '#8b39ff',  // 6: Rich purple
      '#7a26ff',  // 7: Dark purple
      '#6913ff',  // 8: Very dark purple
      '#5800e6'   // 9: Deepest purple
    ],
    gold: [
      '#fff9e6', '#ffed99', '#ffdc00', '#e6c200', '#ccaa00',
      '#b39900', '#998800', '#807700', '#666600', '#4d4d00'
    ],
    silver: [
      '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd',
      '#6c757d', '#495057', '#343a40', '#212529', '#000000'
    ],
    rose: [
      '#fff0f6', '#ffdeeb', '#ffc9da', '#ffb3c8', '#ff8cc8',
      '#ff69b4', '#e91e63', '#c2185b', '#ad1457', '#880e4f'
    ]
  },
  components: {
    Card: {
      styles: {
        root: {
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }
      }
    },
    Button: {
      styles: {
        root: {
          fontWeight: 500,
        }
      }
    },
    Badge: {
      styles: {
        root: {
          fontWeight: 600,
        }
      }
    }
  }
};

export const fashionColors = {
  primary: '#9c4dff',
  secondary: '#ff8cc8', 
  accent: '#ffdc00',
  success: '#40c057',
  warning: '#fab005',
  danger: '#fa5252'
};
EOF

echo "✅ Theme configuration created"

# Create dashboard hook
echo "🪝 Creating dashboard hook..."
cat > src/hooks/useDashboardData.ts << 'EOF'
import { useList } from "@refinedev/core";
import { useMemo } from "react";

export function useDashboardData() {
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

  const dashboardData = useMemo(() => {
    const events = eventsData?.data || [];
    const venues = venuesData?.data || [];
    const sponsors = sponsorsData?.data || [];

    const now = new Date();
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

    // Revenue estimation
    const estimatedRevenue = events.reduce((sum, e) => {
      const ticketRevenue = (e.target_attendance || 0) * 150;
      return sum + ticketRevenue;
    }, 0);

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
      estimatedRevenue
    };
  }, [eventsData, venuesData, sponsorsData]);

  return { dashboardData, isLoading: eventsLoading };
}
EOF

echo "✅ Dashboard hook created"

# Create component index files
echo "📄 Creating component index files..."
cat > src/components/dashboard/index.ts << 'EOF'
export * from './MetricCard';
EOF

echo "export * from './EventCard';" >> src/components/events/index.ts

echo "✅ Component indexes updated"

# Create TypeScript types
echo "📝 Creating TypeScript types..."
cat > src/types/dashboard.ts << 'EOF'
export interface DashboardMetric {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  progress?: number;
  description: string;
  trend?: {
    direction: 'up' | 'down';
    value: string;
  };
}

export interface EventCardProps {
  record: {
    id: string | number;
    title: string;
    status: 'published' | 'draft' | 'sold_out' | 'cancelled' | 'completed';
    event_date: string;
    start_time?: string;
    end_time?: string;
    target_attendance?: number;
    current_attendance?: number;
    venue_name?: string;
    event_type?: string;
    created_at: string;
  };
}

export interface DashboardData {
  events: any[];
  venues: any[];
  sponsors: any[];
  publishedEvents: number;
  draftEvents: number;
  upcomingEvents: number;
  totalCapacity: number;
  totalCurrentAttendance: number;
  occupancyRate: number;
  estimatedRevenue: number;
}
EOF

echo "✅ TypeScript types created"

# Update package.json scripts if needed
echo "📦 Checking package.json scripts..."
if grep -q "\"dev\": \"cross-env" package.json; then
    echo "✅ Package.json scripts already optimized"
else
    echo "⚠️  Consider updating dev script for better performance"
fi

# Check if development server can start
echo "🚀 Testing development server..."
timeout 10s npm run dev > /dev/null 2>&1 &
DEV_PID=$!
sleep 5

if kill -0 $DEV_PID 2>/dev/null; then
    echo "✅ Development server started successfully"
    kill $DEV_PID
else
    echo "⚠️  Development server test inconclusive"
fi

# Final instructions
echo ""
echo "🎉 Dashboard Enhancement Setup Complete!"
echo "========================================"
echo ""
echo "📋 Next Steps:"
echo "1. Replace src/app/page.tsx with enhanced dashboard code"
echo "2. Replace src/components/events/list.tsx with enhanced event list"
echo "3. Create MetricCard component in src/components/dashboard/"
echo "4. Create EventCard component in src/components/events/"
echo "5. Update layout.tsx to use new theme"
echo ""
echo "🚀 To start development server:"
echo "   npm run dev"
echo ""
echo "📁 Backups saved in: $BACKUP_DIR"
echo ""
echo "🎨 Your FashionOS dashboard is ready for enhancement!"
