import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { METHOD } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { transformUser } from 'ducks/auth/services';
import { getAccessToken } from 'helpers/api';
import {
  ServerGetRelationStatusResponse,
  ServerGetRelationsCountResponse,
  ServerGetRelationsResponse,
  ServerGetUserResponse,
} from 'types/user';

import { transformRelations } from './services';
import {
  CreateRelationRequest,
  DeleteRelationRequest,
  GetRelationStatusRequest,
  GetRelationsCountRequest,
  GetRelationsRequest,
  GetUserRequest,
} from './types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['RelationStatus'],
  endpoints: build => ({
    getUserByUsername: build.query<ServerGetUserResponse, GetUserRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.USERS}/username/${args.path.username}`,
        mehtod: METHOD.GET,
        headers: { Authorization: getAccessToken() },
      }),
      transformResponse: transformUser,
    }),
    getRelationsCount: build.query<
      ServerGetRelationsCountResponse,
      GetRelationsCountRequest
    >({
      query: args => ({
        url: `${API_ENDPOINTS.USERS}/${args.path.user}/relations/count`,
        method: METHOD.GET,
        headers: { Authorization: getAccessToken() },
        params: args.params,
      }),
      providesTags: ['RelationStatus'],
    }),
    getRelations: build.query<ServerGetRelationsResponse, GetRelationsRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.USERS}/${args.path.user}/relations`,
        method: METHOD.GET,
        headers: { Authorization: getAccessToken() },
        params: args.params,
      }),
      transformResponse: transformRelations,
      providesTags: ['RelationStatus'],
    }),
    getRelationStatus: build.query<
      ServerGetRelationStatusResponse,
      GetRelationStatusRequest
    >({
      query: args => ({
        url: `${API_ENDPOINTS.USERS}/${args.path.user}/relations/${args.path.relationUser}`,
        method: METHOD.GET,
        headers: { Authorization: getAccessToken() },
      }),
      providesTags: ['RelationStatus'],
    }),
    createRelation: build.mutation<void, CreateRelationRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.USERS}/${args.path.user}/relations/${args.path.relationUser}`,
        method: METHOD.POST,
        headers: { Authorization: getAccessToken() },
        params: args.params,
      }),
      invalidatesTags: ['RelationStatus'],
    }),
    deleteRelation: build.mutation<void, DeleteRelationRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.USERS}/${args.path.user}/relations/${args.path.relationUser}`,
        method: METHOD.DELETE,
        headers: { Authorization: getAccessToken() },
        params: args.params,
      }),
      invalidatesTags: ['RelationStatus'],
    }),
  }),
});

export const {
  useGetUserByUsernameQuery,
  useLazyGetUserByUsernameQuery,
  useGetRelationsCountQuery,
  useGetRelationsQuery,
  useGetRelationStatusQuery,
  useCreateRelationMutation,
  useDeleteRelationMutation,
} = userApi;
