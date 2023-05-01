import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRoutes } from 'components/AppRoutes';
import { GlobalStylesComponent } from 'components/common/GlobalStylesComponent';
import 'configs/i18next';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { store } from 'store';
import { defaultTheme } from 'themes/default';

export const router = createBrowserRouter(
  createRoutesFromElements(AppRoutes(store)),
);

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline enableColorScheme />
          <GlobalStylesComponent />
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};
