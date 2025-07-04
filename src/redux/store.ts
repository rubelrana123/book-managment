import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/bookApi";
import booksSlice from "./features/bookSlice"

export const store = configureStore({
  reducer: {
    books: booksSlice,
    [bookApi.reducerPath]:bookApi.reducer
  },
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(bookApi.middleware)
  }
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;