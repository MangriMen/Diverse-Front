import { ThemeProvider } from '@mui/material';
import { App } from 'components/App';
import { GlobalStylesComponent } from 'components/common/GlobalStylesComponent';
import 'configs/i18next';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from 'store';
import { defaultTheme } from 'themes/default';

export const router = createBrowserRouter([{ path: '*', element: <App /> }]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <SnackbarProvider maxSnack={3}>
          <GlobalStylesComponent />
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
