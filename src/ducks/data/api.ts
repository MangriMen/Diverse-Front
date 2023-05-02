import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { METHOD, STORAGE_KEYS } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { storageGet } from 'helpers/localStorage';

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: build => ({
    data: build.mutation<string, FormData>({
      query: arg => ({
        url: API_ENDPOINTS.DATA,
        method: METHOD.POST,
        headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
        body: arg,
      }),
    }),
  }),
});

export const { useDataMutation } = dataApi;
