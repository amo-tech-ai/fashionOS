'use client';

import { ErrorComponent } from '@refinedev/mantine';
import { Button, Container } from '@mantine/core';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container size="sm" py="xl">
      <ErrorComponent 
        message={error.message || "Something went wrong!"}
      />
      <Button onClick={reset} mt="md">
        Try again
      </Button>
    </Container>
  );
}
