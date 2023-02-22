import { ThemeProvider, CssBaseline } from '@mui/material';
import { defaultTheme } from 'themes/default';

import { Login } from './auth/Login';

export const App = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline enableColorScheme />
        <Login />
      </ThemeProvider>
    </>
  );
};
