import { PageWithNavbar } from 'components/layout/PageWithNavbar';
import { AuthPage } from 'components/pages/AuthPage';
import { AuthRoute } from 'components/routes/AuthRoute';
import { UserRoute } from 'components/routes/UserRoute';
import { ROUTE } from 'consts';
import { Route, Routes } from 'react-router-dom';

import { User } from './routes/User';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<User />}>
        <Route element={<AuthRoute />}>
          <Route path={ROUTE.AUTH} element={<AuthPage />} />
        </Route>
        <Route element={<UserRoute />}>
          <Route element={<PageWithNavbar />}>
            <Route path={ROUTE.HOME} />
            <Route path={ROUTE.ME} element={<></>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
