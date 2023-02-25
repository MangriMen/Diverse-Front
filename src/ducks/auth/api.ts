import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ServerAuthResponse } from 'dtos/auth';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';

import { LoginValues, RegisterValues } from './types';

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
    register: build.mutation<ServerAuthResponse, RegisterValues>({
      query: credentials => ({
        url: API_ENDPOINTS.REGISTER,
        method: 'post',
        body: {
          ...credentials,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
