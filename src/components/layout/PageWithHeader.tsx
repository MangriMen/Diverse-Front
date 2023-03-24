import { Header } from 'components/common/header/Header';
import { FC } from 'react';
import { Outlet } from 'react-router';

export const PageWithHeader: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
