import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, BookPlus, Eye, Plus, BookLock } from "lucide-react";
import { useDeleteBookMutation, useGetAllbookQuery } from "@/redux/api/bookApi";
import EditBookDialog from "@/components/Shared/EditBook/EditBook";
import BorrowBookDialog from "@/components/Shared/BorrowBook/BorrowBook";
import type { IBook } from "@/types/book";
import { useState } from "react";
import toast from "react-hot-toast";
const AllBooks = () => {
  const [deleteBook] = useDeleteBookMutation();
const [currentPage, setCurrentPage] = useState(1);
const booksPerPage = 6;

const { data, isLoading } = useGetAllbookQuery(
  { page: currentPage, limit: booksPerPage },
  {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  }
);

const books = data?.data || [];
const totalPages = data?.meta?.totalPages || 1;



const handleDelete = async (id: string) => {
  try {
    await deleteBook(id).unwrap();

    toast.success("Book deleted successfully 📚❌");

    // Optionally, you can also refresh the data here
  } catch (error: any) {
    console.error("Delete failed:", error);

    toast.error(
      error?.data?.message || "Failed to delete the book. Please try again."
    );
  }
};

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
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Book Library</h1>
            <p className="text-muted-foreground">Manage your book collection</p>
          </div>
          <Link to="/create-book">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New Book</span>
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Books
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {books?.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available Books
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {books?.filter((book: IBook) => book?.available).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Copies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {books.reduce(
                  (sum: number, book: IBook) => sum + book.copies,
                  0
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Books Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Books</CardTitle>
          </CardHeader>
          <CardContent>
            {books.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <BookPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No books found</p>
                  <p className="text-sm">Add your first book to get started</p>
                </div>
                <Link to="/create-book">
                  <Button>Add Your First Book</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Genre</TableHead>
                      <TableHead>ISBN</TableHead>
                      <TableHead>Copies</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className=" text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {books?.map((book: IBook) => (
                      <TableRow key={book._id}>
                        <TableCell className="font-medium">
                          {book.title}
                        </TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.genre}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {book.isbn}
                        </TableCell>
                        <TableCell>{book.copies}</TableCell>
                        <TableCell>
                          <Badge
                            variant={book.available ? "default" : "secondary"}
                            className={
                              book?.available
                                ? "bg-white text-green-500"
                                : "bg-white text-red-500 line-through"
                            }
                          >
                            {book.available ? "Available" : "available"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Link to={`/books/${book._id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                            </Link>

                            <Button variant="ghost" size="sm">
                              <EditBookDialog book={book} />
                            </Button>

                            {book.available && book.copies ? (
                              <>
                                {" "}
                                <BorrowBookDialog book={book} />
                              </>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 block"
                              >
                                <BookLock className="h-4 w-4" />
                                <span className="sr-only">Borrow book</span>
                              </Button>
                            )}

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete book</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete "{book.title}"
                                    from your library. This action cannot be
                                    undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(book._id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

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
    </>
  );
};

export default AllBooks;
