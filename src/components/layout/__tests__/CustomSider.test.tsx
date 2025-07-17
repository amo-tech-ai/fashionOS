import React from 'react';
import { render, screen } from '@testing-library/react';
import { CustomSider } from '../CustomSider';
import { useGetIdentity, useLogout } from '@refinedev/core';
import { useRouter, usePathname } from 'next/navigation';
import { useLocalStorage } from '@mantine/hooks';

// Mock the dependencies
jest.mock('@refinedev/core');
jest.mock('next/navigation');
jest.mock('@mantine/hooks');

const mockUseGetIdentity = useGetIdentity as jest.MockedFunction<typeof useGetIdentity>;
const mockUseLogout = useLogout as jest.MockedFunction<typeof useLogout>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockUseLocalStorage = useLocalStorage as jest.MockedFunction<typeof useLocalStorage>;

describe('CustomSider - Role-Based Visibility', () => {
  beforeEach(() => {
    // Default mocks
    mockUseLogout.mockReturnValue({ mutate: jest.fn() } as any);
    mockUseRouter.mockReturnValue({ push: jest.fn() } as any);
    mockUsePathname.mockReturnValue('/');
    mockUseLocalStorage.mockReturnValue([false, jest.fn()] as any);
  });

  test('Admin role should see all menu items', () => {
    mockUseGetIdentity.mockReturnValue({
      data: { role: 'admin' },
      isLoading: false,
    } as any);

    render(<CustomSider />);

    // Admin should see these items
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Administration')).toBeInTheDocument();
    expect(screen.getByText('Organizer Hub')).toBeInTheDocument();
    expect(screen.getByText('Sponsor Portal')).toBeInTheDocument();
    expect(screen.getByText('Model Hub')).toBeInTheDocument();
    expect(screen.getByText('Designer Studio')).toBeInTheDocument();
    expect(screen.getByText('Venue Manager')).toBeInTheDocument();
    expect(screen.getByText('Vendor Portal')).toBeInTheDocument();
    expect(screen.getByText('Media Center')).toBeInTheDocument();
  });

  test('Organizer role should see limited menu items', () => {
    mockUseGetIdentity.mockReturnValue({
      data: { role: 'organizer' },
      isLoading: false,
    } as any);

    render(<CustomSider />);

    // Organizer should see
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Organizer Hub')).toBeInTheDocument();
    
    // Organizer should NOT see
    expect(screen.queryByText('Administration')).not.toBeInTheDocument();
    expect(screen.queryByText('Sponsor Portal')).not.toBeInTheDocument();
    expect(screen.queryByText('Model Hub')).not.toBeInTheDocument();
  });

  test('Sponsor role should see sponsor-specific items', () => {
    mockUseGetIdentity.mockReturnValue({
      data: { role: 'sponsor' },
      isLoading: false,
    } as any);

    render(<CustomSider />);

    // Sponsor should see
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Sponsor Portal')).toBeInTheDocument();
    
    // Sponsor should NOT see
    expect(screen.queryByText('Administration')).not.toBeInTheDocument();
    expect(screen.queryByText('Organizer Hub')).not.toBeInTheDocument();
    expect(screen.queryByText('Model Hub')).not.toBeInTheDocument();
  });

  test('Guest/unauthenticated should see only public items', () => {
    mockUseGetIdentity.mockReturnValue({
      data: { role: 'guest' },
      isLoading: false,
    } as any);

    render(<CustomSider />);

    // Guest should see basic items
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    
    // Guest should NOT see role-specific items
    expect(screen.queryByText('Administration')).not.toBeInTheDocument();
    expect(screen.queryByText('Organizer Hub')).not.toBeInTheDocument();
    expect(screen.queryByText('Sponsor Portal')).not.toBeInTheDocument();
  });

  test('Loading state should show skeleton', () => {
    mockUseGetIdentity.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as any);

    const { container } = render(<CustomSider />);
    
    // Should show skeleton loaders
    const skeletons = container.querySelectorAll('.mantine-Skeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});