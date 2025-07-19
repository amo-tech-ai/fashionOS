import { Button, Container, Group, Text, Box } from '@mantine/core';
import { IconTicket, IconSparkles } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './HeroTitle.module.css';

export function HeroTitle() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay} />
      <Container size={900} className={classes.inner}>
        <Text className={classes.teaseLine} tt="uppercase" fw={500} size="sm">
          Redefining runway culture in the heart of Medellín
        </Text>
        
        <h1 className={classes.title}>
          Medellín Fashion Nights{' '}
          <Text component="span" className={classes.yearAccent} inherit>
            2025
          </Text>
        </h1>

        <Text className={classes.description}>
          Where Colombian creativity meets cutting-edge couture.
        </Text>

        <Group className={classes.controls}>
          <Button
            component={Link}
            href="/tickets"
            size="xl"
            className={classes.primaryControl}
            leftSection={<IconTicket size={20} />}
          >
            Get Exclusive Access
          </Button>

          <Button
            component={Link}
            href="/designers"
            size="xl"
            variant="outline"
            className={classes.secondaryControl}
            leftSection={<IconSparkles size={20} />}
          >
            View Collections
          </Button>
        </Group>
      </Container>
    </div>
  );
}
