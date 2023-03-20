import { ROUTE } from 'consts/paths';
import { selectIsAuth } from 'ducks/auth/selectors';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const Auth = () => {
  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return <Navigate to={ROUTE.HOME} replace />;
  }

  return <Outlet />;
};
