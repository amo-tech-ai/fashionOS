'use client';

import { useEffect } from 'react';
import { Title, Text, Button, Container, Group } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import classes from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container className={classes.root}>
      <div className={classes.label}>500</div>
      <Title className={classes.title}>Something went wrong!</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Our servers could not handle your request. Don&apos;t worry, our development team was
        already notified. Try refreshing the page.
      </Text>
      <Group justify="center">
        <Button
          onClick={reset}
          leftSection={<IconRefresh size={20} />}
          variant="outline"
          size="md"
        >
          Refresh the page
        </Button>
      </Group>
    </Container>
  );
}
