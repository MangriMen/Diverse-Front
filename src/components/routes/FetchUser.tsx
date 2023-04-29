import { LoaderPage } from 'components/common/LoaderPage';
import { useFetchQuery } from 'ducks/auth/api';
import { selectIsAuth, selectUser } from 'ducks/auth/selectors';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export const FetchUser = () => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  useFetchQuery();

  if (isAuth && user === null) {
    return <LoaderPage />;
  }

  return <Outlet />;
};
