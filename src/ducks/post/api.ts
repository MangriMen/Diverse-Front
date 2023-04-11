import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { STORAGE_KEYS } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { storageGet } from 'helpers/localStorage';
import { ServerGetPostsResponse } from 'types/post';

import { GetPostsValues } from './types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: build => ({
    getPosts: build.query<ServerGetPostsResponse, GetPostsValues>({
      query: args => ({
        url: API_ENDPOINTS.POSTS,
        method: 'get',
        headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
        params: args.params,
      }),
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
