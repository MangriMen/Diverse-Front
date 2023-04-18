import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { STORAGE_KEYS } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { storageGet } from 'helpers/localStorage';
import { ServerGetCommentResponse, ServerGetPostResponse } from 'types/post';

import {
  GetCommentValues,
  SendCommentValues,
  UpdateCommentValues,
} from './types';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: build => ({
    sendComment: build.mutation<ServerGetPostResponse, SendCommentValues>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path?.post}/comments`,
        method: 'post',
        headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
        body: args.body,
      }),
    }),
    updateComment: build.mutation<string, UpdateCommentValues>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path?.post}/comments/${args.path?.comment}`,
        method: 'patch',
        headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
        body: args.body,
      }),
    }),
    deleteComment: build.mutation<void, GetCommentValues>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path?.post}/comments/${args.path?.comment}`,
        method: 'delete',
        headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
      }),
    }),
    likeComment: build.mutation<ServerGetCommentResponse, GetCommentValues>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path?.post}/comments/${args.path?.comment}/like`,
        method: 'post',
        headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
      }),
    }),
    unlikeComment: build.mutation<ServerGetCommentResponse, GetCommentValues>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path?.post}/comments/${args.path?.comment}/like`,
        method: 'delete',
        headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
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
