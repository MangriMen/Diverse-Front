import { LoaderPage } from 'components/common/LoaderPage';
import { ROUTE } from 'consts/paths';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthRoute = () => {
  const isLoading = false;
  const isLogged = true;

  if (isLoading) {
    return <LoaderPage />;
  }

  if (!isLogged) {
    return <Navigate to={ROUTE.HOME} replace />;
  }

  return <Outlet />;
};
