import type { RootState } from "@/redux/store";
// import type { IBook} from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { bookData } from "./books";
import type { Book } from "@/types/book";
interface InitialState {
    books :  Book[]
}
const initialState  = {
    books :  bookData
}
const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // setBooks: (state, action: PayloadAction<Book[]>) => {
    //   state?.books = action.payload;
    // },
  

    }
})

export default booksSlice.reducer;
 