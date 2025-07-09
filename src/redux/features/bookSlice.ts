import type { RootState } from "@/redux/store";
// import type { IBook} from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { bookData } from "./books";
import type { IBook } from "@/types/book";
interface InitialState {
    books :  IBook[]
}
const initialState  = {
    books :  bookData
}
const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
 

    }
})

export default booksSlice.reducer;
 