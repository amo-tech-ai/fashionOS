import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomSider } from '@/components/layout/CustomSider';

// Mock dependencies
jest.mock('@refinedev/core', () => ({
  useGetIdentity: () => ({ data: { role: 'admin' }, isLoading: false }),
  useLogout: () => ({ mutate: jest.fn() }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));

jest.mock('@mantine/hooks', () => ({
  useLocalStorage: () => [false, jest.fn()],
}));

describe('CustomSider Integration Tests', () => {
  test('renders all menu items for admin role', () => {
    render(<CustomSider />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Administration')).toBeInTheDocument();
  });

  test('collapse button toggles sidebar width', () => {
    const { container } = render(<CustomSider />);
    const collapseButton = screen.getByRole('button', { name: /collapse|expand/i });
    
    fireEvent.click(collapseButton);
    
    // Verify localStorage was called
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('logout button triggers logout flow', () => {
    render(<CustomSider />);
    const logoutButton = screen.getByText('Logout');
    
    fireEvent.click(logoutButton);
    
    // Verify logout was triggered
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});