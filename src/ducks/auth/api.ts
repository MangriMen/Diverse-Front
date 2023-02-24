import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ServerAuthResponse } from 'dtos/auth';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { ServerUserResponse } from 'dtos/user';

import { LoginValues } from './types';

import { setUser, logout } from './index';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: build => ({
    login: build.mutation<ServerAuthResponse, LoginValues>({
      query: credentials => ({
        url: API_ENDPOINTS.LOGIN,
        method: 'post',
        body: {
          ...credentials,
        },
      }),
    }),
    getMe: build.query<ServerUserResponse, boolean>({
      query: () => ({
        url: API_ENDPOINTS.ME,
        method: 'get',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data !== null) {
            dispatch(setUser(data));
          }
        } catch (error) {
          dispatch(logout());
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
