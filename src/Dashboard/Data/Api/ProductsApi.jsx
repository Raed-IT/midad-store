import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
 export const productsApi = createApi({
    reducerPath: 'Api/products',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token').replaceAll('"','')}`
        },
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products',
        }),
    })
})
export const {useGetProductsQuery} = productsApi;