import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BookOpenText, Eye, Trash2, Pencil, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation, useUpdatebookMutation } from "@/redux/api/bookApi";
import { Link } from "react-router";
import EditBookModal from "../../Shared/EditBook/EditBook";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import EditBookDialog from "../../Shared/EditBook/EditBook";
import BorrowBookDialog from "@/components/Shared/BorrowBook/BorrowBook";

export const EachBookCard = ({ book }) => {
  const { title, author, genre, description, copies, _id } = book;
  console.log(book);
  const [deleteBook] = useDeleteBookMutation();
  const [updatebook,{isError,isSuccess}] = useUpdatebookMutation();

  const handleDelete = async (id) => {
    console.log("delete id", id);
    try {
      await deleteBook(id).unwrap();

      console.log(" Optionally, handle success (e.g., optimistic updates)");
      // Optionally, handle success (e.g., optimistic updates)
    } catch (error) {
      // Handle error
    }
  };
    const handleBookUpdated = async(updatedBook) => {
         await updatebook({ id: book._id, data: formData }).unwrap();

     
  };

  return (
    <Card className="w-full max-w-sm shadow-md rounded-2xl border border-gray-200">
      <CardHeader className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-t-2xl p-4">
        <div className="flex justify-between items-start">
          <BookOpenText className="w-6 h-6" />
          <p className="text-xs uppercase bg-green-600 text-shadow-white font-medium rounded p-1">
            {genre}
          </p>
        </div>
        <div className="mt-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm italic opacity-90">{author}</p>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
          {description}
        </p>
        <p className="text-green-600 text-sm font-medium">
          Available Copies: {copies}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4">
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
                                  {book.available && book.copies > 0 && (
                            <BorrowBookDialog 
                              book={book} 
                              onBookUpdated={handleBookUpdated}
                            />
                          )}
        </Button>
        <div className="flex gap-2">
          <Link to={`/books/${book._id}`}>
            <Button variant="outline" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>

      {/* <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
         </Button> */}
       
                           <EditBookDialog 
                            book={book} 
                            onBookUpdated={handleBookUpdated}
                          />
          <Button
            onClick={() => handleDelete(_id)}
            variant="destructive"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
