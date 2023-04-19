import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { STORAGE_KEYS } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { storageGet } from 'helpers/localStorage';
import { ServerGetPostsResponse } from 'types/post';

import { GetPostValues, PostValues } from './types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: build => ({
    posts: build.mutation<string, PostValues>({
      query: arg => ({
        url: API_ENDPOINTS.POSTS,
        method: 'post',
        headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
        body: arg,
      }),
    }),
    endlessScroll: build.query<ServerGetPostsResponse, GetPostValues>({
      query: arg => ({
        url: API_ENDPOINTS.POSTS,
        method: 'get',
        headers: {
          Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}`,
        },
        params: arg.params,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { usePostsMutation, useEndlessScrollQuery } = postApi;
