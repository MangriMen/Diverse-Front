import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { STORAGE_KEYS } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { storageGet } from 'helpers/localStorage';
import { ServerAuthResponse } from 'types/auth';

import { enter, logout } from '.';
import { LoginValues, RegisterValues } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: build => ({
    login: build.mutation<ServerAuthResponse, LoginValues>({
      query: credentials => ({
        url: API_ENDPOINTS.LOGIN,
        method: 'post',
        body: {
          ...credentials,
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data !== null) {
            dispatch(enter(data));
          }
        } catch (error) {
          dispatch(logout());
        }
      },
    }),
    register: build.mutation<
      ServerAuthResponse,
      Omit<RegisterValues, 'passwordConfirm'>
    >({
      query: credentials => ({
        url: API_ENDPOINTS.REGISTER,
        method: 'post',
        body: {
          ...credentials,
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data !== null) {
            dispatch(enter(data));
          }
        } catch (error) {
          dispatch(logout());
        }
      },
    }),
    fetch: build.query<ServerAuthResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.FETCH,
        method: 'get',
        headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data !== null) {
            dispatch(enter(data));
          }
        } catch (error) {
          dispatch(logout());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useFetchQuery } = authApi;
