import '@mantine/core/styles.css';
import './globals.css';
import './style-guide.css';

import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { HeaderMenu } from '../components/HeaderMenu/HeaderMenu';
import { FooterLinks } from '../components/FooterLinks';

export const metadata = {
  title: 'Medellín Fashion Nights 2025 - Luxury Fashion Event',
  description: 'Where Colombian creativity meets cutting-edge couture. Experience exclusive runway shows, designer collections, and VIP experiences in the heart of Medellín.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body suppressHydrationWarning>
        <MantineProvider 
          theme={theme} 
          defaultColorScheme="dark"
        >
          <HeaderMenu>
            {children}
          </HeaderMenu>
          <FooterLinks />
        </MantineProvider>
      </body>
    </html>
  );
}
