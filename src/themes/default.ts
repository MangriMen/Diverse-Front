import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { THEME_DEFAULT_OPTIONS } from 'consts';

export const defaultTheme = createTheme(
  deepmerge(
    {
      palette: {
        mode: 'dark',
        common: {
          third: '#141618',
        },
        third: {
          main: '#141618',
          contrastText: '#fff',
        },
        background: {
          default: '#1f2224',
        },
        primary: {
          main: '#d9d9d9',
        },
        secondary: {
          dark: '#3073bf',
          main: '#4f84c0',
          light: '#3c3f40',
        },
      },
    },
    THEME_DEFAULT_OPTIONS,
  ),
);
