import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { STORAGE_KEYS } from 'consts';
import { API_BASE_URL, API_ENDPOINTS } from 'consts/endpoints';
import { prepareRelation } from 'helpers/api';
import { storageGet } from 'helpers/localStorage';
import { ServerGetRelationsResponse } from 'types/user';

import { GetRelationsValues } from './types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: build => ({
    getRelations: build.query<ServerGetRelationsResponse, GetRelationsValues>({
      query: args => ({
        url: `${API_ENDPOINTS.USERS}/${args.path?.user}/relations`,
        method: 'get',
        headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
        params: args.params,
        transform: (response: ServerGetRelationsResponse) => {
          console.log(response);
          return response;
        },
      }),
      transformResponse: (
        response: ServerGetRelationsResponse,
      ): ServerGetRelationsResponse => {
        return {
          ...response,
          relations: response.relations.map(prepareRelation),
        };
      },
    }),
    // deleteRelation: build.mutation<void, void>({
    //   query: args => ({
    //     url: `${API_ENDPOINTS.POSTS}/users/${args.path?.user}/relations/${args.path?.relationUser}`,
    //     method: 'delete',
    //     headers: { Authorization: `Bearer ${storageGet(STORAGE_KEYS.TOKEN)}` },
    //   }),
    // }),
  }),
});

export const { useGetRelationsQuery } = userApi;
