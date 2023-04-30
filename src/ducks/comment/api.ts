import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { METHOD } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { getAccessToken } from 'helpers/api';
import { ServerGetCommentResponse, ServerGetPostResponse } from 'types/post';

import {
  CreateCommentRequest,
  GetCommentRequest,
  UpdateCommentRequest,
} from './types';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: build => ({
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
  useSendCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} = commentApi;
