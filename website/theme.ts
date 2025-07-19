'use client';

import { createTheme, rem, MantineColorsTuple } from '@mantine/core';

// Custom color scales following Mantine's 10-shade system
const fashionBlack: MantineColorsTuple = [
  '#f5f5f5', // 0 - lightest
  '#e7e7e7',
  '#cdcdcd',
  '#b2b2b2',
  '#9a9a9a',
  '#8b8b8b',
  '#717171',
  '#656565',
  '#141414', // 8 - main dark background
  '#0a0a0a', // 9 - deepest black
];

const fashionGold: MantineColorsTuple = [
  '#fff9e1',
  '#ffeaa4',
  '#ffdc68',
  '#ffce3d',
  '#ffc426', // 4 - primary gold
  '#ffb81c',
  '#e5a100',
  '#cc8f00',
  '#b37c00',
  '#805900',
];

const fashionNeutral: MantineColorsTuple = [
  '#fafafa',
  '#f4f4f5',
  '#e4e4e7',
  '#d4d4d8',
  '#a1a1aa', // 4 - muted text
  '#71717a',
  '#52525b',
  '#3f3f46',
  '#27272a',
  '#18181b',
];

export const theme = createTheme({
  // Primary color configuration
  primaryColor: 'fashionGold',
  primaryShade: 4,
  
  // Color definitions
  colors: {
    fashionBlack,
    fashionGold,
    fashionNeutral,
  },

  // Typography - Premium Sans-Serif Fonts
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
  
  headings: {
    fontFamily: 'Syne, system-ui, sans-serif', // Modern geometric sans-serif
    fontWeight: '300',
    sizes: {
      h1: { 
        fontSize: rem(56), 
        lineHeight: '1.1',
        fontWeight: '200', // Ultra-light for luxury feel
      },
      h2: { 
        fontSize: rem(40), 
        lineHeight: '1.2',
        fontWeight: '300',
      },
      h3: { 
        fontSize: rem(32), 
        lineHeight: '1.3',
        fontWeight: '300',
      },
      h4: { 
        fontSize: rem(24), 
        lineHeight: '1.4',
        fontWeight: '400',
      },
      h5: { 
        fontSize: rem(20), 
        lineHeight: '1.5',
        fontWeight: '400',
      },
      h6: { 
        fontSize: rem(16), 
        lineHeight: '1.5',
        fontWeight: '500',
      },
    },
  },

  // Font sizes using rem function
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },

  // Line heights
  lineHeights: {
    xs: '1.4',
    sm: '1.5',
    md: '1.6',
    lg: '1.7',
    xl: '1.8',
  },

  // Spacing scale (using rem for consistency)
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
    '2xl': rem(48),
    '3xl': rem(64),
    '4xl': rem(80),
  },

  // Border radius
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },

  // Shadows - Subtle for luxury feel
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.4)',
    sm: '0 2px 8px rgba(0, 0, 0, 0.5)',
    md: '0 8px 24px rgba(0, 0, 0, 0.6)',
    lg: '0 16px 48px rgba(0, 0, 0, 0.7)',
    xl: '0 24px 64px rgba(0, 0, 0, 0.8)',
  },

  // Default radius for components
  defaultRadius: 'sm',

  // Default gradient
  defaultGradient: {
    from: 'fashionGold.4',
    to: 'fashionGold.6',
    deg: 135,
  },

  // Responsive breakpoints
  breakpoints: {
    xs: '576',
    sm: '768',
    md: '992',
    lg: '1200',
    xl: '1400',
  },

  // Other theme customizations
  other: {
    // Custom transitions
    transitionDuration: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
      slower: '500ms',
    },
    
    // Custom spacing tokens
    containerPadding: {
      mobile: rem(16),
      tablet: rem(24),
      desktop: rem(32),
    },
    
    // Header height
    headerHeight: rem(80),
  },
});
