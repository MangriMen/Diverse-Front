import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { THEME_DEFAULT_OPTIONS } from 'consts/componentDefaultOptions';

export const defaultTheme = createTheme(
  deepmerge(
    {
      typography: {
        button: {
          textTransform: 'none',
        },
      },
      palette: {
        mode: 'dark',
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
        },
      },
    },
    THEME_DEFAULT_OPTIONS,
  ),
);
