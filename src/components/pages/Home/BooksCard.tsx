import { useGetAllbookQuery } from "@/redux/api/bookApi";
import { EachBookCard } from "./EachBookCard";
import type { IBook } from "@/types/book";
import { useState } from "react";

export default function BooksCard() {
  const { data, isLoading } = useGetAllbookQuery(
    { limit: 6 },
    {
      // pollingInterval : 1000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const books = data?.data || [];
  const totalPages = Math.ceil(books.length / booksPerPage);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

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
    <div>
      <h1 className="text-center font-stretch-extra-condensed text-4xl m-4 border-b-2">
        Explore All Books
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {currentBooks.map((book: IBook) => (
          <EachBookCard key={book._id} book={book} />
        ))}
      </div>
      <div></div>

      <div className="text-center my-10">
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 flex-wrap mt-10">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-sm font-medium rounded-md border 
      ${
        currentPage === 1
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-600 border-green-500"
      }
    `}
          >
            Previous
          </button>

          {/* Page Buttons */}
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            const isActive = currentPage === page;
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm font-medium rounded-md border transition-all duration-150
          ${
            isActive
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-800 border-gray-300 hover:bg-green-100"
          }
        `}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-sm font-medium rounded-md border 
      ${
        currentPage === totalPages
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-600 border-green-500"
      }
    `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
