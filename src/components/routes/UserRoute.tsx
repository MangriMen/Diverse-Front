import { ROUTE } from 'consts/paths';
import { selectIsAuth } from 'ducks/auth/selectors';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const UserRoute = () => {
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to={ROUTE.AUTH} replace />;
  }

  return <Outlet />;
};
