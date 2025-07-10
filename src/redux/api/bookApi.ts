
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  //http://localhost:5000/api/books
  //"https://libary-managment.vercel.app/api",
  tagTypes: ["book","borrow"],
  endpoints: (builder) => ({

    addbook: builder.mutation({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags:["book"]
    }),
    getAllbook: builder.query({
  query: ({ page = 1, limit = 6 }) =>
    `/books?page=${page}&limit=${limit}`,
  providesTags: ["book"],
}),
    // getAllbook:builder.query({
    //     query:()=>"/books",
    //     providesTags:["book"]
    //   }),
    getBookById: builder.query({
      query: (id) => `books/${id}`,
    }),
    updatebook: builder.mutation({
      query: ({ id, body }) => ({
        url: `books/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags:["book"]
    }),
      deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["book"]  
    }),
     borrowBook: builder.mutation({
      query: (body) => ({
        url: "/borrow",
        method: "POST",
        body,
      }),
      invalidatesTags:["borrow", "book"]
    }),
   getBorrowSummary:builder.query({
        query:()=>"/borrow",
        providesTags:["borrow"]
      }),
    }),
  });
 

export const {
  useAddbookMutation,
  useGetAllbookQuery , 
  useGetBorrowSummaryQuery,
  useDeleteBookMutation,
  useGetBookByIdQuery,
  useUpdatebookMutation,
  useBorrowBookMutation
}=bookApi