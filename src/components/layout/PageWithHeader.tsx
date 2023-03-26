import { Header } from 'components/common/header/Header';
import { Outlet } from 'react-router';

export const PageWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
