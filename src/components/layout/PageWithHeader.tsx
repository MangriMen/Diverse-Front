import { Header } from 'components/common/Header/Header';
import { Outlet } from 'react-router-dom';

export const PageWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
