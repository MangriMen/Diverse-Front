import { Store } from '@reduxjs/toolkit';
import { PageWithHeader } from 'components/layout/PageWithHeader';
import { AuthPage } from 'components/pages/AuthPage';
import { HomePage } from 'components/pages/HomePage';
import { NotFoundPage } from 'components/pages/NotFoundPage';
import { UserPage } from 'components/pages/UserPage';
import { Auth } from 'components/routes/Auth';
import { FetchUser } from 'components/routes/FetchUser';
import { Private } from 'components/routes/Private';
import { ROUTE } from 'consts';
import { userLoader } from 'helpers';
import { Outlet, Route } from 'react-router-dom';

import { UserSettingsPage } from './pages/UserSettings/UserSettingsPage';

export const AppRoutes = (store: Store) => (
  <Route element={<Outlet />}>
    <Route element={<FetchUser />}>
      <Route element={<Auth />}>
        <Route path={ROUTE.AUTH} element={<AuthPage />} />
      </Route>
      <Route element={<Private />}>
        <Route element={<PageWithHeader />}>
          <Route path={ROUTE.HOME} element={<HomePage />} />
          <Route
            path={ROUTE.USER}
            element={<UserPage />}
            errorElement={<NotFoundPage />}
            loader={userLoader(store)}
          />
          <Route path={`${ROUTE.SETTINGS}/*`} element={<UserSettingsPage />}>
            <Route path=":page" element={<UserSettingsPage />}></Route>
          </Route>
          <Route path={ROUTE.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Route>
    </Route>
  </Route>
);
