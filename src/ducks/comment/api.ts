import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { METHOD } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { getAccessToken, prepareComment } from 'helpers/api';
import {
  ServerGetCommentResponse,
  ServerGetCommentsCountResponse,
  ServerGetCommentsResponse,
  ServerGetPostResponse,
} from 'types/post';

import {
  CreateCommentRequest,
  GetCommentRequest,
  GetCommentsCountRequest,
  GetCommentsRequest,
  UpdateCommentRequest,
} from './types';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: build => ({
    getCommentsCount: build.query<
      ServerGetCommentsCountResponse,
      GetCommentsCountRequest
    >({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}/comments/count`,
        method: METHOD.GET,
        headers: { Authorization: getAccessToken() },
      }),
    }),
    getComments: build.query<ServerGetCommentsResponse, GetCommentsRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}/comments`,
        method: METHOD.GET,
        headers: { Authorization: getAccessToken() },
        params: args.params,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return [endpointName, queryArgs?.path?.post].join('_');
      },
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        return previousArg !== currentArg;
      },
      transformResponse: (response: ServerGetCommentsResponse) => {
        response.data = response.data.map(prepareComment);
        return response;
      },
    }),
    sendComment: build.mutation<ServerGetPostResponse, CreateCommentRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}/comments`,
        method: METHOD.POST,
        headers: { Authorization: getAccessToken() },
        body: args.body,
      }),
    }),
    updateComment: build.mutation<string, UpdateCommentRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}/comments/${args.path.comment}`,
        method: METHOD.PATCH,
        headers: { Authorization: getAccessToken() },
        body: args.body,
      }),
    }),
    deleteComment: build.mutation<void, GetCommentRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}/comments/${args.path.comment}`,
        method: METHOD.DELETE,
        headers: { Authorization: getAccessToken() },
      }),
    }),
    likeComment: build.mutation<ServerGetCommentResponse, GetCommentRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}/comments/${args.path.comment}/like`,
        method: METHOD.POST,
        headers: { Authorization: getAccessToken() },
      }),
    }),
    unlikeComment: build.mutation<ServerGetCommentResponse, GetCommentRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}/comments/${args.path.comment}/like`,
        method: METHOD.DELETE,
        headers: { Authorization: getAccessToken() },
      }),
    }),
  }),
});

export const {
  useGetCommentsCountQuery,
  useGetCommentsQuery,
  useLazyGetCommentsQuery,
  useSendCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} = commentApi;
