import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  BookOpenText,
  Eye,
  Trash2,
  BookLock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useDeleteBookMutation,
} from "@/redux/api/bookApi";
import { Link } from "react-router-dom";
import EditBookDialog from "../../Shared/EditBook/EditBook";
import BorrowBookDialog from "@/components/Shared/BorrowBook/BorrowBook";
import type { IBook } from "@/types/book";
import toast from "react-hot-toast";

interface EachBookCardProps {
  book: IBook;
}

export const EachBookCard = ({ book }: EachBookCardProps) => {
  const { title, author, genre, description, copies, _id } = book;
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully!");
    } catch (error: any) {
      const message =
        error?.data?.message || "Failed to delete book. Please try again.";
      toast.error(message);
    }
  };

  return (
    <Card className="w-full !p-0 max-w-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
      {/* Card Header */}
      <CardHeader className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-t-xl p-4">
        <div className="flex justify-between items-start">
          <BookOpenText className="w-6 h-6" />
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium uppercase tracking-wide">
            {genre.replace("_", " ")}
          </span>
        </div>

        {/* Book title */}
        <div className="mt-3 space-y-1">
          <h2 className="text-xl font-semibold leading-snug line-clamp-1">
            {title}
          </h2>
          <p className="text-sm italic opacity-90">{author}</p>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4 space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        <p
          className={`text-sm font-medium ${
            copies > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          Available Copies: {copies}
        </p>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex justify-between items-center px-4 pb-4 pt-0">
        {/* Borrow / Not Available */}
        <div>
          {book.available && book.copies > 0 ? (
            <BorrowBookDialog book={book} />
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="text-red-500 border-red-300 bg-red-50 cursor-not-allowed"
              disabled
            >
              <BookLock className="h-4 w-4" />
              <span className="sr-only">Not available</span>
            </Button>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Link to={`/books/${book._id}`}>
            <Button variant="outline" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>

          <EditBookDialog book={book} />

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
