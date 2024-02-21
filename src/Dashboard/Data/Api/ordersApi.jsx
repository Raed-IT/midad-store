import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
    reducerPath: 'Api/orders',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token').replaceAll('"', '')}`
        },
    }),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => 'orders',
        }),
    })
})
export const {useGetOrdersQuery} = ordersApi;