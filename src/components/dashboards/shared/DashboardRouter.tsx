import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from '../admin/AdminDashboard';
import { OrganizerDashboard } from '../organizer/OrganizerDashboard';
import { SponsorDashboard } from '../sponsor/SponsorDashboard';
import { DesignerDashboard } from '../designer/DesignerDashboard';
import { ModelDashboard } from '../model/ModelDashboard';
import { Loader, Text, Center, Box } from '@mantine/core';

export const DashboardRouter: React.FC = () => {
  const { user, userRole, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Box ta="center">
          <Loader size="lg" />
          <Text mt="md" color="dimmed">Loading dashboard...</Text>
        </Box>
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Route to appropriate dashboard based on user role
  switch (userRole) {
    case 'admin':
    case 'super_admin':
      return <AdminDashboard />;
    
    case 'organizer':
      return <OrganizerDashboard />;
    
    case 'sponsor':
      return <SponsorDashboard />;
    
    case 'designer':
      return <DesignerDashboard />;
    
    case 'model':
      return <ModelDashboard />;
    
    case 'venue':
      // TODO: Return VenueDashboard when implemented
      return (
        <Center h="50vh">
          <Text size="lg" color="dimmed">Venue Manager coming soon...</Text>
        </Center>
      );
    
    case 'vendor':
      // TODO: Return VendorDashboard when implemented
      return (
        <Center h="50vh">
          <Text size="lg" color="dimmed">Vendor Portal coming soon...</Text>
        </Center>
      );
    
    case 'media':
      // TODO: Return MediaDashboard when implemented
      return (
        <Center h="50vh">
          <Text size="lg" color="dimmed">Media Center coming soon...</Text>
        </Center>
      );
    
    default:
      // Default dashboard for attendees or unknown roles
      return (
        <Center h="50vh">
          <Box ta="center">
            <Text size="xl" weight={700} mb="md">Welcome to FashionOS</Text>
            <Text color="dimmed">Please contact support to upgrade your account for dashboard access.</Text>
          </Box>
        </Center>
      );
  }
};
