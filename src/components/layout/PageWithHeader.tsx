import { Header } from 'components/common/header/Header';
import { Outlet } from 'react-router-dom';

export const PageWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
