import type { RootState } from "@/redux/store";
// import type { IBook} from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { bookData } from "./books";
interface InitialState {
    users :  []
}
const initialState  = {
    books :  bookData
}
const booksSlice = createSlice({
    name :"user",
    initialState,
    reducers :{
  

    }
})

export default booksSlice.reducer;
 