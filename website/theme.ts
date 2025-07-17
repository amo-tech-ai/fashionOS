import { createTheme } from '@mantine/core';

// Fashion-focused color palette
const fashionPrimary: [string, string, string, string, string, string, string, string, string, string] = [
  '#f0f0f0',
  '#e0e0e0',
  '#c0c0c0',
  '#a0a0a0',
  '#808080',
  '#606060',
  '#404040',
  '#202020',
  '#101010',
  '#000000',
];

export const theme = createTheme({
  colors: {
    fashion: fashionPrimary,
  },
  primaryColor: 'fashion',
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
});
