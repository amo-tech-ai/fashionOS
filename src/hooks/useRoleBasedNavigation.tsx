import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  IconDashboard, 
  IconCalendarEvent, 
  IconUsers, 
  IconBuildingStore,
  IconPalette,
  IconCamera,
  IconBuilding,
  IconShoppingCart,
  IconNews,
  IconSettings,
  IconLogout
} from '@tabler/icons';

export interface NavigationItem {
  label: string;
  route: string;
  icon: React.ReactNode;
  roles?: string[];
  children?: NavigationItem[];
}

export const useRoleBasedNavigation = () => {
  const { userRole, canAccessDashboard } = useAuth();

  const allNavigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: <IconDashboard size={20} />,
    },
    {
      label: 'Admin Panel',
      route: '/admin',
      icon: <IconSettings size={20} />,
      roles: ['admin', 'super_admin'],
      children: [
        {
          label: 'User Management',
          route: '/admin/users',
          icon: <IconUsers size={20} />,
        },
        {
          label: 'System Settings',
          route: '/admin/settings',
          icon: <IconSettings size={20} />,
        },
      ],
    },
    {
      label: 'Events',
      route: '/events',
      icon: <IconCalendarEvent size={20} />,
      roles: ['organizer', 'admin', 'super_admin'],
      children: [
        {
          label: 'My Events',
          route: '/events/my-events',
          icon: <IconCalendarEvent size={20} />,
          roles: ['organizer'],
        },
        {
          label: 'All Events',
          route: '/events/list',
          icon: <IconCalendarEvent size={20} />,
        },
        {
          label: 'Create Event',
          route: '/events/create',
          icon: <IconCalendarEvent size={20} />,
          roles: ['organizer', 'admin'],
        },
      ],
    },
    {
      label: 'Sponsorships',
      route: '/sponsorships',
      icon: <IconBuildingStore size={20} />,
      roles: ['sponsor', 'admin', 'super_admin'],
      children: [
        {
          label: 'My Sponsorships',
          route: '/sponsorships/my',
          icon: <IconBuildingStore size={20} />,
        },
        {
          label: 'ROI Analytics',
          route: '/sponsorships/roi',
          icon: <IconBuildingStore size={20} />,
        },
        {
          label: 'Lead Management',
          route: '/sponsorships/leads',
          icon: <IconUsers size={20} />,
        },
      ],
    },
    {
      label: 'Designer Studio',
      route: '/designer',
      icon: <IconPalette size={20} />,
      roles: ['designer', 'admin'],
    },
    {
      label: 'Model Hub',
      route: '/models',
      icon: <IconCamera size={20} />,
      roles: ['model', 'admin'],
    },
    {
      label: 'Venue Manager',
      route: '/venues',
      icon: <IconBuilding size={20} />,
      roles: ['venue', 'admin'],
    },
    {
      label: 'Vendor Portal',
      route: '/vendors',
      icon: <IconShoppingCart size={20} />,
      roles: ['vendor', 'admin'],
    },
    {
      label: 'Media Center',
      route: '/media',
      icon: <IconNews size={20} />,
      roles: ['media', 'admin'],
    },
  ];

  // Filter navigation items based on user role
  const filterNavItems = (items: NavigationItem[]): NavigationItem[] => {
    return items
      .filter(item => {
        // If no roles specified, item is available to all
        if (!item.roles || item.roles.length === 0) return true;
        // Check if user has any of the required roles
        return item.roles.includes(userRole || '');
      })
      .map(item => ({
        ...item,
        children: item.children ? filterNavItems(item.children) : undefined,
      }));
  };

  const navigationItems = filterNavItems(allNavigationItems);

  // Add common items at the end
  navigationItems.push({
    label: 'Settings',
    route: '/settings',
    icon: <IconSettings size={20} />,
  });

  return { navigationItems };
};
