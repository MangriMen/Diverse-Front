import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { METHOD } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { getAccessToken, prepareComment } from 'helpers/api';
import {
  CommentModel,
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

export const commentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    if (a.created_at > b.created_at) {
      return 1;
    } else if (a.created_at < b.created_at) {
      return -1;
    } else {
      return 0;
    }
  },
  selectId: (item: CommentModel) => item.id,
});

export const commentsSelector = commentsAdapter.getSelectors();

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['PostComments', 'Comment'],
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
    getComments: build.query<EntityState<CommentModel>, GetCommentsRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}/comments`,
        method: METHOD.GET,
        headers: { Authorization: getAccessToken() },
        params: args.params,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return [endpointName, queryArgs?.path?.post].join('_');
      },
      merge: (currentCache, newItems, otherArgs) => {
        const cacheIDs = commentsSelector.selectIds(currentCache);
        const newItemsIDs = commentsSelector.selectIds(newItems);

        const updateIDs = cacheIDs.filter(x => newItemsIDs.includes(x));
        const newIDs = newItemsIDs.filter(x => !cacheIDs.includes(x));

        const updateItems = updateIDs.map(id => ({
          id,
          changes: commentsSelector.selectById(newItems, id) ?? {},
        }));

        const brandNewItems = newIDs
          .map(id => commentsSelector.selectById(newItems, id))
          .reduce(
            (prev, value) => ({ ...prev, [value?.id ?? '-1']: value }),
            {},
          );

        commentsAdapter.updateMany(currentCache, updateItems);

        if (otherArgs.arg.params.last_seen_comment_created_at) {
          commentsAdapter.addMany(currentCache, brandNewItems);
        } else {
          const oldState = commentsSelector.selectAll(currentCache);
          commentsAdapter.removeAll(currentCache);
          commentsAdapter.addMany(currentCache, brandNewItems);
          commentsAdapter.addMany(currentCache, oldState);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return previousArg !== currentArg;
      },
      transformResponse: (response: ServerGetCommentsResponse) =>
        commentsAdapter.addMany(
          commentsAdapter.getInitialState(),
          response.data.map(prepareComment),
        ),
      providesTags: (result, _error, arg) => {
        return result
          ? [
              ...commentsSelector.selectAll(result).map(({ id }) => ({
                type: 'Comment' as const,
                id,
              })),
              { type: 'Comment' as const, id: arg.path.post },
              ...(!arg.params.last_seen_comment_id
                ? ['PostComments' as const, 'Comment' as const]
                : ['Comment' as const]),
            ]
          : ['Comment' as const];
      },
    }),
    sendComment: build.mutation<ServerGetPostResponse, CreateCommentRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/${args.path.post}/comments`,
        method: METHOD.POST,
        headers: { Authorization: getAccessToken() },
        body: args.body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Comment' as const, id: arg.path.post },
      ],
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
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Comment' as const, id: arg.path.comment },
      ],
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
  useLazyGetCommentsCountQuery,
  useGetCommentsCountQuery,
  useGetCommentsQuery,
  useLazyGetCommentsQuery,
  useSendCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} = commentApi;
