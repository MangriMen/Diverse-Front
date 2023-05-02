import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { STORAGE_KEYS } from 'consts';
import { METHOD } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { getAccessToken, preparePost } from 'helpers/api';
import { storageGet } from 'helpers/localStorage';
import {
  PostModel,
  ServerGetPostResponse,
  ServerGetPostsResponse,
} from 'types/post';

import { GetPostRequest, GetPostsValues, PostValues } from './types';
import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';

export const postsAdapter = createEntityAdapter({
  selectId: (item: PostModel) => item.id,
});

export const postsSelector = postsAdapter.getSelectors();

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['Post'],
  endpoints: build => ({
    createPost: build.mutation<string, PostValues>({
      query: arg => ({
        url: API_ENDPOINTS.POSTS,
        method: METHOD.POST,
        headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
        body: arg,
      }),
      invalidatesTags: () => ['Post'],
    }),
    getPosts: build.query<EntityState<PostModel>, GetPostsValues>({
      query: arg => ({
        url: API_ENDPOINTS.POSTS,
        method: METHOD.GET,
        headers: {
          Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}`,
        },
        params: arg.params,
      }),
      providesTags: (result, _error, arg) =>
        result
          ? [
              ...postsSelector.selectAll(result).map(({ id }) => ({
                type: 'Post' as const,
                id,
              })),
              {
                type: 'Post',
                id: [arg.params?.type, arg.params?.user_id].join('_'),
              },
              'Post',
            ]
          : [
              {
                type: 'Post',
                id: [arg.params?.type, arg.params?.user_id].join('_'),
              },
              'Post',
            ],
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return [
          endpointName,
          queryArgs.params?.type,
          queryArgs.params?.user_id,
        ].join('_');
      },
      merge: (currentCache, newItems) => {
        postsAdapter.addMany(currentCache, postsSelector.selectAll(newItems));
      },
      forceRefetch({ currentArg, previousArg }) {
        return previousArg !== currentArg;
      },
      transformResponse: (response: ServerGetPostsResponse) =>
        postsAdapter.addMany(
          postsAdapter.getInitialState(),
          response.data.map(preparePost),
        ),
    }),
    deletePost: build.mutation<string, GetPostRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}`,
        method: METHOD.DELETE,
        headers: { Authorization: getAccessToken() },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Post' as const, id: arg.path.post },
      ],
    }),
    likePost: build.mutation<ServerGetPostResponse, GetPostRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}/like`,
        method: METHOD.POST,
        headers: { Authorization: getAccessToken() },
      }),
    }),
    unlikePost: build.mutation<ServerGetPostResponse, GetPostRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}/like`,
        method: METHOD.DELETE,
        headers: { Authorization: getAccessToken() },
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} = postApi;
