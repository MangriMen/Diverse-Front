import { Theme } from '@mui/material';

import { defaultTheme } from './default';

export * from './default';

export interface Themes {
  [x: string]: Theme;
}

export const themes: Themes = {
  default: defaultTheme,
};
