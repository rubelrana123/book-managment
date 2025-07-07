import type { Book } from "@/types/book";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["book","borrow"],
  endpoints: (builder) => ({

    addbook: builder.mutation({
      query: (body) => ({
        url: "/books", //need update from backend like create-bok
        method: "POST",
        body,
      }),
      invalidatesTags:["book"]
    }),
    
    getAllbook:builder.query({
        query:()=>"/books",
        providesTags:["book"]
      }),
    getBookById: builder.query<Book, string>({
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
   getBorrowSummary:builder.query({
        query:()=>"/borrow",
        providesTags:["borrow"]
      }),
   deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["book"]  
    }),
    }),
  });
 

export const {
  useAddbookMutation,
  useGetAllbookQuery , 
  useGetBorrowSummaryQuery,
  useDeleteBookMutation,
  useGetBookByIdQuery,
  useUpdatebookMutation
}=bookApi