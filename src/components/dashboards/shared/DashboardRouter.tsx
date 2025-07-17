import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from '../admin/AdminDashboard';
import { OrganizerDashboard } from '../organizer/OrganizerDashboard';
import { SponsorDashboard } from '../sponsor/SponsorDashboard';
import { DesignerDashboard } from '../designer/DesignerDashboard';
import { ModelDashboard } from '../model/ModelDashboard';
import { VenueDashboard } from '../venue/VenueDashboard';
import { VendorDashboard } from '../vendor/VendorDashboard';
import { MediaDashboard } from '../media/MediaDashboard';
import { Loader, Text, Center, Box } from '@mantine/core';

export const DashboardRouter: React.FC = () => {
  const { user, userRole, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

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
    return null; // Redirect handled in useEffect
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
      return <VenueDashboard />;
    
    case 'vendor':
      return <VendorDashboard />;
    
    case 'media':
      return <MediaDashboard />;
    
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
