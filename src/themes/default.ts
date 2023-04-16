import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { THEME_DEFAULT_OPTIONS } from 'consts';

export const defaultTheme = createTheme(
  deepmerge(
    {
      palette: {
        mode: 'dark',
        common: {
          third: '#17191b',
          dimmed: '#9e9e9e',
        },
        background: {
          default: '#1f2224',
        },
        primary: {
          dark: '#1a1c1f',
          main: '#1f2224',
          light: '#222529',
        },
        secondary: {
          dark: '#3073bf',
          main: '#4f84c0',
          light: '#5e9ee6',
        },
        dimmed: {
          main: '#9e9e9e',
        },
      },
    },
    THEME_DEFAULT_OPTIONS,
  ),
);
