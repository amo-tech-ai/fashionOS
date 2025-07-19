'use client';

import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';
import { ActionIcon, Anchor, Button, Container, Group, SimpleGrid, Stack, Text, TextInput, Image } from '@mantine/core';
import Link from 'next/link';
import classes from './FooterLinks.module.css';

const navigationLinks = [
  { label: 'Home', link: '/' },
  { label: 'Event Highlights', link: '/events' },
  { label: 'Designer Showcase', link: '/designers' },
  { label: 'Tickets', link: '/tickets' },
  { label: 'Sponsors', link: '/sponsors' },
  { label: 'Contact', link: '/contact' },
];

export function FooterLinks() {
  const handleSubscribe = () => {
    // TODO: Implement email subscription logic
    console.log('Newsletter subscription submitted');
  };

  return (
    <footer className={classes.footer}>
      <Container size="xl" className={classes.inner}>
        <SimpleGrid cols={3} spacing={{ base: "sm", sm: "xl" }}>
          {/* Left Column - Logo, Tagline, Social */}
          <Stack gap="md">
            <div>
              <Link href="/" aria-label="Fashionistas Home" style={{ display: 'inline-block' }}>
                <Image 
                  src="/fashionistas.svg" 
                  alt="Fashionistas" 
                  h={45}
                  w="auto"
                  fit="contain"
                  className={classes.logoImage}
                />
              </Link>
              <Text size="sm" c="dimmed" mt="xs" className={classes.tagline}>
                Experience elegance and glamour in Medellín's ultimate Valentine's event.
              </Text>
            </div>
            
            <Group gap="xs" className={classes.socialGroup}>
              <ActionIcon 
                size="lg" 
                variant="subtle" 
                color="white"
                component="a"
                href="https://facebook.com/fashionistas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className={classes.socialIcon}
              >
                <IconBrandFacebook stroke={1.5} />
              </ActionIcon>
              
              <ActionIcon 
                size="lg" 
                variant="subtle" 
                color="white"
                component="a"
                href="https://instagram.com/fashionistas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className={classes.socialIcon}
              >
                <IconBrandInstagram stroke={1.5} />
              </ActionIcon>
              
              <ActionIcon 
                size="lg" 
                variant="subtle" 
                color="white"
                component="a"
                href="https://twitter.com/fashionistas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className={classes.socialIcon}
              >
                <IconBrandTwitter stroke={1.5} />
              </ActionIcon>
            </Group>

            <Button 
              variant="filled" 
              color="pink" 
              size="sm"
              component={Link}
              href="/events"
              className={classes.ctaButton}
            >
              Learn More
            </Button>
          </Stack>

          {/* Center Column - Navigation */}
          <Stack gap="md" className={classes.navigationColumn}>
            <Text size="sm" fw={500} className={classes.columnTitle}>
              Site Navigation
            </Text>
            <Stack gap="xs">
              {navigationLinks.map((link) => (
                <Anchor
                  key={link.label}
                  component={Link}
                  href={link.link}
                  size="sm"
                  c="dimmed"
                  className={classes.navLink}
                >
                  {link.label}
                </Anchor>
              ))}
            </Stack>
          </Stack>

          {/* Right Column - Newsletter & Contact */}
          <Stack gap="md">
            <div>
              <Text size="sm" fw={500} className={classes.columnTitle}>
                Stay Updated
              </Text>
              <div className={classes.subscriptionForm}>
                <TextInput
                  placeholder="Enter your email"
                  size="sm"
                  className={classes.emailInput}
                  required
                  aria-label="Email address for newsletter subscription"
                />
                <Button 
                  onClick={handleSubscribe}
                  size="sm"
                  variant="filled" 
                  color="pink"
                  className={classes.subscribeButton}
                >
                  Subscribe Now
                </Button>
              </div>
            </div>

            <Stack gap="xs" className={classes.contactInfo}>
              <Group gap="xs" className={classes.contactItem}>
                <Text size="xs" c="dimmed">📍 Skybox Medellín, Colombia</Text>
              </Group>
              <Group gap="xs" className={classes.contactItem}>
                <Text size="xs" c="dimmed">📞 (+57) 123-456-7890</Text>
              </Group>
              <Group gap="xs" className={classes.contactItem}>
                <Text size="xs" c="dimmed">✉️ contact@fashionistas.com</Text>
              </Group>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      {/* Bottom Bar */}
      <div className={classes.bottomBar}>
        <Container size="xl">
          <Group justify="space-between" wrap="nowrap">
            <Text size="xs" c="dimmed">
              © 2024 Fashionistas. All Rights Reserved.
            </Text>
            <Group gap="md">
              <Anchor
                component={Link}
                href="/privacy"
                size="xs"
                c="dimmed"
                className={classes.bottomLink}
              >
                Privacy Policy
              </Anchor>
              <Anchor
                component={Link}
                href="/terms"
                size="xs"
                c="dimmed"
                className={classes.bottomLink}
              >
                Terms of Service
              </Anchor>
            </Group>
          </Group>
        </Container>
      </div>
    </footer>
  );
}