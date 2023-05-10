import { userApi } from 'ducks/user/api';
import { LoaderFunctionArgs } from 'react-router-dom';
import { AppDispatch, Store } from 'store';
import { User } from 'types/auth';

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
