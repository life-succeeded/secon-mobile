import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Act, Meter, Photo } from '../models/types';

export const actsApi = createApi({
  reducerPath: 'actsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://your-api-endpoint.com/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Acts'],
  endpoints: (builder) => ({
    getActs: builder.query<Act[], void>({
      query: () => 'acts',
      providesTags: ['Acts'],
    }),
    getActById: builder.query<Act, string>({
      query: (id) => `acts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Acts', id }],
    }),
    createAct: builder.mutation<Act, Partial<Act>>({
      query: (body) => ({
        url: 'acts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Acts'],
    }),
    syncActs: builder.mutation<void, void>({
      query: () => ({
        url: 'acts/sync',
        method: 'POST',
      }),
      invalidatesTags: ['Acts'],
    }),
    uploadPhoto: builder.mutation<{ url: string }, { meterNumber: string; photo: Blob }>({
      query: ({ meterNumber, photo }) => {
        const formData = new FormData();
        formData.append('meterNumber', meterNumber);
        formData.append('photo', photo);
        
        return {
          url: 'photos/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { 
  useGetActsQuery,
  useGetActByIdQuery,
  useCreateActMutation,
  useSyncActsMutation,
  useUploadPhotoMutation,
} = actsApi;