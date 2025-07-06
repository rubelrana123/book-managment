 
import {  useGetAllbookQuery } from "@/redux/api/bookApi";
import { EachBookCard } from "./EachBookCard";

export default function BooksCard() {
        const {data : books, isError, isLoading} = useGetAllbookQuery(undefined, {
          // pollingInterval : 1000,
          refetchOnFocus : true,
          refetchOnMountOrArgChange : true,
          refetchOnReconnect : true
        });
      if (isLoading) {
        return (
          <>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading books...</p>
              </div>
            </div>
          </>
        );
      }
  return (
    <div className="grid grid-cols-3 gap-5">
        {
            books.data.map((book) =>  <EachBookCard key={book._id} book = {book}/> )
        }
  
 </div>
  )
}

