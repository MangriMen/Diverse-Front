import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { ServerAuthResponse } from 'types/auth';

import { FetchValues, LoginValues, RegisterValues } from './types';

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
    }),
    fetch: build.mutation<ServerAuthResponse, FetchValues>({
      query: credentials => ({
        url: API_ENDPOINTS.FETCH,
        method: 'post',
        body: {
          ...credentials,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
