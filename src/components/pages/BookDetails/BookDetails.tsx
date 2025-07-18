import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  ArrowLeft,
  Calendar,
  Hash,
  User,
  Tag,
  FileText,
  Copy,
  BookLock,
} from "lucide-react";
import { useGetBookByIdQuery } from "@/redux/api/bookApi";
import EditBookDialog from "@/components/Shared/EditBook/EditBook";
import BorrowBookDialog from "@/components/Shared/BorrowBook/BorrowBook";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: book, isLoading } = useGetBookByIdQuery(id as string);

  console.log(book);

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading book details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!book) {
    return (
      <>
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">Book not found</p>
          <Button onClick={() => navigate("/books")}>Back to Library</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/books")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Library</span>
            </Button>
          </div>
        </div>

        {/* Book Details */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-2xl mb-2">
                  {book.data.title}
                </CardTitle>
                <p className="text-lg text-muted-foreground">
                  by {book.data.author}
                </p>
              </div>
              {/*  //action  */}
              <div className="flex justify-end ">
                <Button variant="ghost" size="sm">
                  <EditBookDialog book={book.data} />
                </Button>

                {book.data.available && book.data.copies > 0 ? (
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
              </div>

              <Badge
                variant={book.data.available ? "default" : "secondary"}
                className={
                  book.data.available ? "bg-success hover:bg-success/80" : ""
                }
              >
                {book.data.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">
                      Genre
                    </p>
                    <p className="text-foreground">{book.data.genre}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Hash className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">
                      ISBN
                    </p>
                    <p className="font-mono text-foreground">
                      {book.data.isbn}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Copy className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">
                      Available Copies
                    </p>
                    <p className="text-foreground font-semibold">
                      {book.data.copies}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">
                      Author
                    </p>
                    <p className="text-foreground">{book.data.author}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {book.data.description && (
              <>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium text-foreground">Description</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-8">
                    {book.data.description}
                  </p>
                </div>
              </>
            )}

            {/* Timestamps */}
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Added to Library
                  </p>
                  <p className="text-foreground">{book.data.createdAt}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    Last Updated
                  </p>
                  <p className="text-foreground">{book.data.updatedAt}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default BookDetails;
