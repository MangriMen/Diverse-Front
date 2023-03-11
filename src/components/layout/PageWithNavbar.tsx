import { Header } from 'components/common/header/Header';
import { FC } from 'react';
import { Outlet } from 'react-router';

export const PageWithNavbar: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
