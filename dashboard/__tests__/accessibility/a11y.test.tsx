import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CustomSider } from '@/components/layout/CustomSider';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

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

describe('Accessibility Tests', () => {
  test('CustomSider has no accessibility violations', async () => {
    const { container } = render(<CustomSider />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Navigation menu has proper ARIA labels', async () => {
    const { container } = render(<CustomSider />);
    
    // Check for role attributes
    const menuItems = container.querySelectorAll('[role="menuitem"]');
    expect(menuItems.length).toBeGreaterThan(0);
    
    // Check for aria-current on active page
    const activePage = container.querySelector('[aria-current="page"]');
    expect(activePage).toBeTruthy();
  });

  test('Interactive elements are keyboard accessible', async () => {
    const { container } = render(<CustomSider />);
    
    // All buttons should be focusable
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('tabIndex');
    });
  });
});