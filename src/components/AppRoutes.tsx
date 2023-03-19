import { PageWithHeader } from 'components/layout/PageWithHeader';
import { AuthPage } from 'components/pages/AuthPage';
import { Auth } from 'components/routes/Auth';
import { Private } from 'components/routes/Private';
import { ROUTE } from 'consts';
import { Route, Routes } from 'react-router-dom';

import { FetchUser } from './routes/FetchUser';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<FetchUser />}>
        <Route element={<Auth />}>
          <Route path={ROUTE.AUTH} element={<AuthPage />} />
        </Route>
        <Route element={<Private />}>
          <Route element={<PageWithHeader />}>
            <Route path={ROUTE.HOME} element={<>{'Home'}</>} />
            <Route path={ROUTE.NOT_FOUND} element={<>{'404'}</>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
