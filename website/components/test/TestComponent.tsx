'use client';

import { Box, Title, Text, Button } from '@mantine/core';
import { useState } from 'react';

interface TestComponentProps {
  title: string;
  description?: string;
}

export function TestComponent({ title, description }: TestComponentProps) {
  const [count, setCount] = useState(0);

  return (
    <Box p="md">
      <Title order={2} mb="sm">
        {title}
      </Title>
      {description && (
        <Text c="dimmed" mb="md">
          {description}
        </Text>
      )}
      <Text mb="sm">Count: {count}</Text>
      <Button onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </Box>
  );
}