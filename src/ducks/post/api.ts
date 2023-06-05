import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { POSTS_FETCH_COUNT, STORAGE_KEYS } from 'consts';
import { METHOD } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { getAccessToken, preparePost } from 'helpers/api';
import { storageGet } from 'helpers/localStorage';
import {
  PostModel,
  ServerGetPostResponse,
  ServerGetPostsCountResponse,
  ServerGetPostsResponse,
} from 'types/post';

import {
  GetPostRequest,
  GetPostsCountRequest,
  GetPostsValues,
  PostValues,
} from './types';

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
    getPostsCount: build.query<
      ServerGetPostsCountResponse,
      GetPostsCountRequest
    >({
      query: args => ({
        url: `${API_ENDPOINTS.POSTS}/count`,
        method: METHOD.GET,
        headers: { Authorization: getAccessToken() },
        params: args.params,
      }),
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
      merge: (currentCache, newItems, otherArgs) => {
        const cacheIDs = postsSelector.selectIds(currentCache);
        const newItemsIDs = postsSelector.selectIds(newItems);

        const updateIDs = cacheIDs.filter(x => newItemsIDs.includes(x));
        const newIDs = newItemsIDs.filter(x => !cacheIDs.includes(x));

        const updateItems = updateIDs.map(id => ({
          id,
          changes: postsSelector.selectById(newItems, id) ?? {},
        }));

        const brandNewItems = newIDs
          .map(id => postsSelector.selectById(newItems, id))
          .reduce(
            (prev, value) => ({ ...prev, [value?.id ?? '-1']: value }),
            {},
          );

        postsAdapter.updateMany(currentCache, updateItems);

        if (otherArgs.arg.params?.last_seen_post_created_at) {
          postsAdapter.addMany(currentCache, brandNewItems);
        } else {
          const oldState = postsSelector.selectAll(currentCache);
          postsAdapter.removeAll(currentCache);
          postsAdapter.addMany(currentCache, brandNewItems);
          postsAdapter.addMany(currentCache, oldState);
        }
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
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          postApi.util.updateQueryData(
            'getPosts',
            { params: { type: 'all', count: POSTS_FETCH_COUNT.FEED } },
            draft => {
              postsAdapter.removeOne(draft, arg.path.post);
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
  useLazyGetPostsCountQuery,
  useLazyGetPostsQuery,
  useGetPostsQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} = postApi;
