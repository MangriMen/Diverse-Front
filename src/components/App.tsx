import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRoutes } from 'components/AppRoutes';
import { GlobalStylesComponent } from 'components/common/GlobalStylesComponent';
import 'configs/i18next';
import { MAX_SNACK_COUNT } from 'consts/app';
import ModalProvider from 'mui-modal-provider';
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
        <SnackbarProvider maxSnack={MAX_SNACK_COUNT}>
          <ModalProvider>
            <CssBaseline enableColorScheme />
            <GlobalStylesComponent />
            <RouterProvider router={router} />
          </ModalProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};
