'use client';

import { Container, Title, Text, Stack } from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';
import { HeroTitle } from '../components/HeroTitle/HeroTitle';
import { EventHighlights } from '../components/EventHighlights/EventHighlights';
import { DesignerSpotlight } from '../components/DesignerSpotlight/DesignerSpotlight';
import { TicketSection } from '../components/TicketSection/TicketSection';
import classes from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroTitle />

      {/* Event Highlights Section */}
      <EventHighlights />

      {/* Designer Spotlight Section */}
      <DesignerSpotlight />

      {/* Ticket Section */}
      <TicketSection />

      {/* Features Section */}
      <section className={classes.section}>
        <Container size="lg">
          <Stack gap="xl">
            <Title order={2} ta="center" className={classes.sectionTitle} c="white">
              Experience Fashion at Its Peak
            </Title>
            
            <div className={classes.featureGrid}>
              <div className={classes.featureCard}>
                <IconSparkles size={32} className={classes.featureIcon} />
                <Title order={4} className={classes.featureTitle}>
                  Exclusive Collections
                </Title>
                <Text className={classes.featureText}>
                  Witness avant-garde designs from Colombia's most innovative fashion houses.
                </Text>
              </div>

              <div className={classes.featureCard}>
                <IconSparkles size={32} className={classes.featureIcon} />
                <Title order={4} className={classes.featureTitle}>
                  International Designers
                </Title>
                <Text className={classes.featureText}>
                  Global fashion meets local artistry in spectacular runway presentations.
                </Text>
              </div>

              <div className={classes.featureCard}>
                <IconSparkles size={32} className={classes.featureIcon} />
                <Title order={4} className={classes.featureTitle}>
                  VIP Experience
                </Title>
                <Text className={classes.featureText}>
                  Exclusive access to designer meet & greets and private showcases.
                </Text>
              </div>
            </div>
          </Stack>
        </Container>
      </section>
    </>
  );
}
