import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66bf71b742533c40314632e6.mockapi.io/",
  }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/users",
      providesTags: ["Student"],
    }),
    getStudentById: builder.query({
      query: (id) => `/students/${id}`, // Fetch specific student by ID
      providesTags: (result, error, id) => [{ type: "Student", id }], // Tags the individual student
    }),
    addStudent: builder.mutation({
      query: (student) => ({
        url: "/users",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    editStudent: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`, // Specify the URL with the student's ID
        method: "PUT", // Use PUT for updating
        body: patch, // The updated data
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useEditStudentMutation,
} = studentApi;
