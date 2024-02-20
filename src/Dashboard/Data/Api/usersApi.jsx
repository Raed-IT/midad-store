import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'Api/users',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_API_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token').replaceAll('"', '')}`
        },
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users',
            providesTags: ['users']
        }),
        addUser: builder.mutation(
            {
                query: (payload) => {
                    return ({
                        url: 'add-user',
                        method: 'POST',
                        body: payload,
                    })
                },
                invalidatesTags: ['users'],
            }
        ),
        deleteUser: builder.mutation(
            {
                query: ({id}) => {
                    return ({
                        url: `users/${id}`,
                        method: 'DELETE',
                    });
                },
                invalidatesTags: ['users'],
            }
        ),
    })
})
export const {useGetUsersQuery, useAddUserMutation, useDeleteUserMutation} = usersApi;