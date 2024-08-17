import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const studentApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl : "https://66bf71b742533c40314632e6.mockapi.io/"
    }),
    endpoints : (builder) => ({
        getStudents : builder.query({
            query : ()=> "/users"
        })
    })
})

export const {useGetStudentsQuery} = studentApi;