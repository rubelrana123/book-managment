import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ArrowLeft, Save } from "lucide-react";
import { useAddbookMutation, useGetAllbookQuery } from "@/redux/api/bookApi";
import toast from "react-hot-toast";
import type { IBook } from "@/types/book";

// ------------------- Zod Schema -------------------
const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z
    .string()
    .min(10, "ISBN must be at least 10 characters")
    .max(13, "ISBN must be no more than 13 characters"),
  description: z.string().optional(),
  copies: z
    .number({
      required_error: "Copies is required",
      invalid_type_error: "Copies must be a number",
    })
    .min(1, "At least 1 copy is required"),
});

type TBook = z.infer<typeof bookSchema>;

const CreateBook = () => {
  const navigate = useNavigate();
  const [addbook, {  isLoading }] = useAddbookMutation();
  const {data : allBooks} = useGetAllbookQuery(undefined)
 console.log(allBooks)

  const form = useForm<TBook>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
    },
  });

  const onSubmit: SubmitHandler<TBook> = async (data) => {
    const existingBook = allBooks.data.find((book: IBook) => book.isbn === data.isbn);
    if (existingBook) {
        throw new Error("ISBN already exists");
    }
    const bookData = {
      ...data,
      available: true,
    };

    try {
      const res = await addbook(bookData).unwrap();
      console.log("Book Added:", res);

    toast.success("Book added successfully!");
      form.reset();
      navigate("/books");
    } catch (error : any) {
      console.log(error, error?.data.error.errors.isbn.message)
        toast.error( (error?.data.error.errors.isbn.message) || "Failed to add book.");
  };
  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading ...</p>
          </div>
        </div>
      </>
    );
  }
  }
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
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

      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Book</h1>
        <p className="text-muted-foreground">
          Add a new book to your library collection
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Book Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter book title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Author */}
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter author name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Genre */}
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue="FICTION"
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FICTION">FICTION</SelectItem>
                          <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                          <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                          <SelectItem value="HISTORY">HISTORY</SelectItem>
                          <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                          <SelectItem value="FANTASY">FANTASY</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ISBN */}
                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISBN *</FormLabel>
                      <FormControl>
                        <Input placeholder="978-0-123456-78-9" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Copies */}
                <FormField
                  control={form.control}
                  name="copies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Copies *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={1000}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter book description (optional)"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{isLoading ? "Adding Book..." : "Add Book"}</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/books")}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBook;
