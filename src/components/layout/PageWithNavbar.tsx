import { Navbar } from 'components/common/Navbar';
import { FC } from 'react';
import { Outlet } from 'react-router';

export const PageWithNavbar: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
