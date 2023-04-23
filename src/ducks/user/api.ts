import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { METHOD } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { transformUser } from 'ducks/auth/services';
import { getAccessToken } from 'helpers/api';
import {
  ServerGetRelationsCountResponse,
  ServerGetRelationsResponse,
  ServerGetUserResponse,
} from 'types/user';

import { transformRelations } from './services';
import {
  GetRelationsCountRequest,
  GetRelationsRequest,
  GetUserRequest,
} from './types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
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
    }),
    getRelations: build.query<ServerGetRelationsResponse, GetRelationsRequest>({
      query: args => ({
        url: `${API_ENDPOINTS.USERS}/${args.path.user}/relations`,
        method: METHOD.GET,
        headers: { Authorization: getAccessToken() },
        params: args.params,
      }),
      transformResponse: transformRelations,
    }),
    // deleteRelation: build.mutation<void, void>({
    //   query: args => ({
    //     url: `${API_ENDPOINTS.POSTS}/users/${args.path.user}/relations/${args.path.relationUser}`,
    //     method: 'delete',
    //     headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
    //   }),
    // }),
  }),
});

export const {
  useGetUserByUsernameQuery,
  useGetRelationsCountQuery,
  useGetRelationsQuery,
} = userApi;
