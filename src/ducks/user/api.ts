import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { METHOD } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { getAccessToken } from 'helpers/api';
import { ServerGetRelationsResponse } from 'types/user';

import { transformRelations } from './services';
import { GetRelationsRequest } from './types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: build => ({
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

export const { useGetRelationsQuery } = userApi;
