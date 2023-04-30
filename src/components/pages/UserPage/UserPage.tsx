import { Store } from '@reduxjs/toolkit';
import { LoaderPage } from 'components/common/LoaderPage';
import { userApi } from 'ducks/user/api';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { AppDispatch } from 'store';
import { User } from 'types/auth';

import { UserPageContent } from './UserPageContent';

export const userLoader =
  (store: Store) =>
  async ({ params, request }: LoaderFunctionArgs) => {
    const localUser = store.getState().auth.user as User;
    if (localUser.username === params.user) {
      return { isMe: true, user: localUser };
    }

    const promise = (store.dispatch as AppDispatch)(
      userApi.endpoints.getUserByUsername.initiate({
        path: { username: params.user ?? '' },
      }),
    );
    request.signal.onabort = promise.abort;

    const { data, isError } = await promise;

    if (isError || data?.user === undefined) {
      throw new Response('Not Found', { status: 404 });
    }

    return { isMe: false, user: data.user };
  };

export const UserPage = () => {
  const { isMe, user } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof userLoader>>
  >;

  return (
    <>
      {user === null && <LoaderPage />}
      {user !== null && <UserPageContent isMe={isMe} user={user} />}
    </>
  );
};
