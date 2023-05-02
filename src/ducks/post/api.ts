import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { STORAGE_KEYS } from 'consts';
import { METHOD } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { getAccessToken } from 'helpers/api';
import { storageGet } from 'helpers/localStorage';
import { ServerGetPostResponse, ServerGetPostsResponse } from 'types/post';

import { transformPosts } from './services';
import { GetPostRequest, GetPostsValues, PostValues } from './types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: build => ({
    createPost: build.mutation<ServerGetPostsResponse, PostValues>({
      query: arg => ({
        url: API_ENDPOINTS.POSTS,
        method: METHOD.POST,
        headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
        body: arg,
      }),
    }),
    getPosts: build.query<ServerGetPostsResponse, GetPostsValues>({
      query: arg => ({
        url: API_ENDPOINTS.POSTS,
        method: METHOD.GET,
        headers: {
          Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}`,
        },
        params: arg.params,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return [
          endpointName,
          queryArgs.params?.type,
          queryArgs.params?.user_id,
        ].join('_');
      },
      //TODO: need fix it
      merge: (currentCache, newItems) => {
        let isUpdated = false;
        for (const newItem of newItems.data) {
          isUpdated = false;

          for (const itemIndex in currentCache.data) {
            if (newItem.id === currentCache.data[itemIndex].id) {
              currentCache.data[itemIndex] = newItem;
              isUpdated = true;
              break;
            }
          }

          if (!isUpdated) {
            currentCache.data.push(newItem);
          }
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return previousArg !== currentArg;
      },
      transformResponse: transformPosts,
    }),
    deletePost: build.mutation<ServerGetPostsResponse, GetPostRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}`,
        method: METHOD.DELETE,
        headers: { Authorization: getAccessToken() },
      }),
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
