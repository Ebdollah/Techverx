import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const studentApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl : "https://66bf71b742533c40314632e6.mockapi.io/"
    }),
    tagTypes : ["Student"],
    endpoints : (builder) => ({
        getStudents : builder.query({
            query : ()=> "/users",
            providesTags : ["Student"],
        }),
        addStudent : builder.mutation({
            query : (student) => ({
                url : "/users",
                method : "POST",
                body : student,
            }),
            invalidatesTags : ["Student"],
        })
    })
})

export const {useGetStudentsQuery, useAddStudentMutation} = studentApi;