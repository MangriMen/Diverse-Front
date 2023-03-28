import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';

import { PostValues } from './types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: build => ({
    posts: build.mutation<string, PostValues>({
      query: credentials => ({
        url: API_ENDPOINTS.POSTS,
        method: 'post',
        body: {
          ...credentials,
        },
      }),
    }),
  }),
});

export const { usePostsMutation } = postApi;
