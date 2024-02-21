import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'Api/products',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token').replaceAll('"', '')}`
        },
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products',
            providesTags: ['products']
        }),
        addProduct: builder.mutation(
            {
                query: (payload, file) => {

                    const formData = new FormData();
                    for (const variable in payload) {
                        formData.append(variable, payload[variable])
                    }
                    formData.append('file', file)

                    return ({
                        url: 'add-product',
                        method: 'POST',
                        body: formData,
                    })
                },
                invalidatesTags: ['products'],
            }
        ),
        deleteProduct: builder.mutation(
            {
                query: ({id}) => {
                    return ({
                        url: `products/${id}`,
                        method: 'DELETE',


                    });
                },
                invalidatesTags: ['products'],
            }
        ),
        updateProduct: builder.mutation(
            {
                query: ({id, payload}) => {
                    return ({
                        url: `edit-product/${id}`,
                        method: 'PUT',
                        body: payload,
                    })
                },
                invalidatesTags: ['products'],
            }
        )
    })
})
export const {
    useGetProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productsApi;