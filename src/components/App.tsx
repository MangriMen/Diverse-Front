import { ThemeProvider, CssBaseline } from '@mui/material';
import { defaultTheme } from 'themes/default';

import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline enableColorScheme />
        <NotFoundPage />
      </ThemeProvider>
    </>
  );
};
