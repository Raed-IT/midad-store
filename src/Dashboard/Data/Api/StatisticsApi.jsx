import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const  statisticsApi = createApi({
    reducerPath: 'Api/statistics',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token').replaceAll('"','')}`
        },
    }),
    endpoints: (builder) => ({
        getStatistics: builder.query({
            query: () => 'statistics',
        }),
    })
})
export const {useGetStatisticsQuery} = statisticsApi;