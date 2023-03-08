import { LoaderPage } from 'components/common/LoaderPage';
import { Outlet } from 'react-router-dom';

export const User = () => {
  const isLoading = true;

  if (isLoading) {
    return <LoaderPage />;
  }

  return <Outlet />;
};
