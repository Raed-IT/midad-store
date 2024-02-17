import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const citiesApi = createApi({
    reducerPath: 'Api/cities',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_API_URL
    }),
    endpoints: (builder) => ({
        getCities: builder.query({
            query: () => 'cities',
        }),
    })
})
export const {useGetCitiesQuery} = citiesApi;