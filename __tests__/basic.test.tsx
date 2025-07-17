import React from 'react';
import { render, screen } from '@testing-library/react';

// Simple component test
function TestComponent() {
  return <div>FashionOS is running</div>;
}

describe('Basic React Test', () => {
  test('renders without crashing', () => {
    render(<TestComponent />);
    expect(screen.getByText('FashionOS is running')).toBeInTheDocument();
  });
});