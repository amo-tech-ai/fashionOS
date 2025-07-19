'use client';

import { Title, Text, Button, Container, Group } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './not-found.module.css';

export default function NotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Page not found</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        The page you are looking for does not exist. It might have been moved or deleted.
      </Text>
      <Group justify="center">
        <Button
          component={Link}
          href="/"
          leftSection={<IconHome size={20} />}
          variant="subtle"
          size="md"
        >
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
