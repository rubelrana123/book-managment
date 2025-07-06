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
import { Edit, Trash2, BookPlus, Eye, Plus } from "lucide-react";
import { useDeleteBookMutation, useGetAllbookQuery } from "@/redux/api/bookApi";
// const books = [
//   {
//     id: "1",
//     title: "Atomic Habits",
//     author: "James Clear",
//     genre: "Self-help",
//     isbn: "9780735211292",
//     description: "A guide to building good habits and breaking bad ones.",
//     copies: 5,
//     available: true,
//     createdAt: new Date("2024-01-01"),
//     updatedAt: new Date("2024-01-10"),
//   },
//   {
//     id: "2",
//     title: "The Alchemist",
//     author: "Paulo Coelho",
//     genre: "Fiction",
//     isbn: "9780061122415",
//     description:
//       "A philosophical story about a boy's journey to fulfill his dream.",
//     copies: 3,
//     available: true,
//     createdAt: new Date("2024-02-10"),
//     updatedAt: new Date("2024-02-15"),
//   },
//   {
//     id: "3",
//     title: "1984",
//     author: "George Orwell",
//     genre: "Dystopian",
//     isbn: "9780451524935",
//     description: "A novel about a totalitarian regime and surveillance.",
//     copies: 4,
//     available: false,
//     createdAt: new Date("2024-03-05"),
//     updatedAt: new Date("2024-03-08"),
//   },
//   {
//     id: "4",
//     title: "Clean Code",
//     author: "Robert C. Martin",
//     genre: "Programming",
//     isbn: "9780132350884",
//     description: "Best practices for writing clean, maintainable code.",
//     copies: 6,
//     available: true,
//     createdAt: new Date("2024-04-01"),
//     updatedAt: new Date("2024-04-03"),
//   },
//   {
//     id: "5",
//     title: "The Pragmatic Programmer",
//     author: "Andy Hunt & Dave Thomas",
//     genre: "Programming",
//     isbn: "9780201616224",
//     description: "Tips and techniques for effective software development.",
//     copies: 2,
//     available: false,
//     createdAt: new Date("2024-04-15"),
//     updatedAt: new Date("2024-04-18"),
//   },
//   {
//     id: "6",
//     title: "Rich Dad Poor Dad",
//     author: "Robert Kiyosaki",
//     genre: "Finance",
//     isbn: "9781612680194",
//     description: "Lessons on financial independence and wealth building.",
//     copies: 7,
//     available: true,
//     createdAt: new Date("2024-05-01"),
//     updatedAt: new Date("2024-05-05"),
//   },
//   {
//     id: "7",
//     title: "Deep Work",
//     author: "Cal Newport",
//     genre: "Productivity",
//     isbn: "9781455586691",
//     description: "Strategies for focused success in a distracted world.",
//     copies: 4,
//     available: true,
//     createdAt: new Date("2024-05-20"),
//     updatedAt: new Date("2024-05-25"),
//   },
//   {
//     id: "8",
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     genre: "Classic",
//     isbn: "9780061120084",
//     description: "A story of racial injustice and childhood innocence.",
//     copies: 3,
//     available: false,
//     createdAt: new Date("2024-06-01"),
//     updatedAt: new Date("2024-06-03"),
//   },
//   {
//     id: "9",
//     title: "The Lean Startup",
//     author: "Eric Ries",
//     genre: "Business",
//     isbn: "9780307887894",
//     description: "Entrepreneurship and innovation strategies for startups.",
//     copies: 5,
//     available: true,
//     createdAt: new Date("2024-06-10"),
//     updatedAt: new Date("2024-06-12"),
//   },
//   {
//     id: "10",
//     title: "You Don’t Know JS",
//     author: "Kyle Simpson",
//     genre: "Programming",
//     isbn: "9781491904244",
//     description: "In-depth explanation of JavaScript concepts.",
//     copies: 6,
//     available: true,
//     createdAt: new Date("2024-06-20"),
//     updatedAt: new Date("2024-06-25"),
//   },
// ];

const AllBooks = () => {
    const {data : books, isError, isLoading} = useGetAllbookQuery(undefined, {
      // pollingInterval : 1000,
      refetchOnFocus : true,
      refetchOnMountOrArgChange : true,
      refetchOnReconnect : true
    });
    const [deleteBook] =useDeleteBookMutation();
    console.log({books, isError, isLoading});

  const handleDelete = async (id) => {
    console.log("delete id", id)
    try {
      await deleteBook(id).unwrap();
       
      console.log(" Optionally, handle success (e.g., optimistic updates)")
      // Optionally, handle success (e.g., optimistic updates)
    } catch (error) {
      // Handle error
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
                {books.data?.length}
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
                {books.data?.filter((book) => book?.available).length}
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
                {books.data.reduce((sum, book) => sum + book.copies, 0)}
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
            {books.data.length === 0 ? (
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
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {books.data.map((book) => (
                      <TableRow key={book.id}>
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
                              book.available
                                ? "bg-success hover:bg-success/80"
                                : ""
                            }
                          >
                            {book.available ? "Available" : "Unavailable"}
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

                            <Link to={`/edit-book/${book._id}`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit book</span>
                              </Button>
                            </Link>

                            {book.available && book.copies > 0 && (
                              <Link to={`/borrow/${book.id}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-accent"
                                >
                                  <BookPlus className="h-4 w-4" />
                                  <span className="sr-only">Borrow book</span>
                                </Button>
                              </Link>
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
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
      </div>
    </>
  );
};

export default AllBooks;
