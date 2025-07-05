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
  getBorrowSummary:builder.query({
        query:()=>"/borrow",
        providesTags:["borrow"]
      })
    }),
  });
 

export const {useAddbookMutation,useGetAllbookQuery , useGetBorrowSummaryQuery}=bookApi