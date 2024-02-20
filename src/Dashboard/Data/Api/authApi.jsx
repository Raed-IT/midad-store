import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'Api/auth',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_API_URL,
    }),
    endpoints: (builder) => ({


       login: builder.mutation(
            {
                query: (payload) => {
                    return ({
                        url: '/login',
                        method: 'POST',
                        body: payload,

                    })
                },

            }
        ),

    })
})
export const {useLoginMutation} = authApi;