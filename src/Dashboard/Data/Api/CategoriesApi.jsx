import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
    reducerPath: 'Api/categories',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token').replaceAll('"','')}`
        },
    }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories',
        }),
        deleteCategory: builder.mutation(
            {
                query: ({id}) => ({
                    url: `categories/${id}`,
                    method: 'DELETE',
                }),
            }
        )
    })
})
export const {useGetCategoriesQuery} = categoriesApi;