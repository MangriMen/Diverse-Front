import { CssBaseline, ThemeProvider } from '@mui/material';
import { defaultTheme } from 'themes/default';

import { Header } from './header/Header';
import { AuthPage } from './pages/AuthPage';

export const App = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline enableColorScheme />
        <Header />
        <AuthPage />
      </ThemeProvider>
    </>
  );
};
