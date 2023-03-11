import { LoaderPage } from 'components/common/LoaderPage';
import { useFetchQuery } from 'ducks/auth/api';
import { selectIsAuth } from 'ducks/auth/selectors';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export const User = () => {
  const { isError } = useFetchQuery();
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth && !isError) {
    return <LoaderPage />;
  }

  return <Outlet />;
};
