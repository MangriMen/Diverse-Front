import { ThemeProvider, CssBaseline } from '@mui/material';
import { defaultTheme } from 'themes/default';

import { AuthPage } from './pages/AuthPage';
import { Header } from './header/Header';
import { Post } from './post/Post';

export const App = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline enableColorScheme />
        <Header />
        <Post />
        <AuthPage />
      </ThemeProvider>
    </>
  );
};
