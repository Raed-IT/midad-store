import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
    reducerPath: 'Api/categories',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_API_URL,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token').replaceAll('"', '')}`
        },
    }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories',
            providesTags: ['categories'],
        }),
        deleteCategory: builder.mutation(
            {
                query: ({id}) => {
                    return ({
                        url: `categories/${id}`,
                        method: 'DELETE',
                    });
                },
                invalidatesTags: ['categories'],
            }
        ),
        addCategory: builder.mutation(
            {
                query: (payload) => {
                    console.log(payload)
                    return ({
                        url: 'add-cat',
                        method: 'POST',
                        body: payload,
                    })
                },
                invalidatesTags: ['categories'],
            }
        )
    })
})
export const {useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation} = categoriesApi;