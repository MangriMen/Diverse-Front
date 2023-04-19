import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { METHOD } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { getAccessToken } from 'helpers/api';
import { ServerGetPostResponse, ServerGetPostsResponse } from 'types/post';

import { transformPosts } from './services';
import { GetPostRequest, GetPostsRequest } from './types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: build => ({
    getPosts: build.query<ServerGetPostsResponse, GetPostsRequest>({
      query: args => ({
        url: API_ENDPOINTS.POSTS,
        method: METHOD.GET,
        headers: { Authorization: getAccessToken() },
        params: args.params,
      }),
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
  useGetPostsQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} = postApi;
