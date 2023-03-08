import { LoaderPage } from 'components/common/LoaderPage';
import { ROUTE } from 'consts/paths';
import { Navigate, Outlet } from 'react-router-dom';

export const UserRoute = () => {
  const isLoading = false;
  const isLogged = false;

  if (isLoading) {
    return <LoaderPage />;
  }

  if (!isLogged) {
    return <Navigate to={ROUTE.AUTH} replace />;
  }

  return <Outlet />;
};
