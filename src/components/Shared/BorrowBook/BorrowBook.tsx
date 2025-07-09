import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {  BookPlus} from "lucide-react";
import toast from "react-hot-toast";
import type { IBook } from "@/types/book";
import { useBorrowBookMutation } from "@/redux/api/bookApi";

interface BorrowBookDialogProps {
  book: IBook;
}

const BorrowBookDialog = ({ book }: BorrowBookDialogProps) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [borrowBook, { isLoading: loading }] = useBorrowBookMutation();
  const navigate = useNavigate();
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }

    if (quantity > book.copies) {
      toast.error(`Only ${book.copies} copies available`);
      return;
    }

    try {
      console.log({
        book: book._id,
        quantity: quantity,
        dueDate: new Date(dueDate),
      });
      await borrowBook({
        book: book._id,
        quantity: quantity,
        dueDate: new Date(dueDate).toISOString(),
      }).unwrap();

      toast.success(
        `Successfully borrowed ${quantity} cop${
          quantity > 1 ? "ies" : "y"
        } of "${book.title}"`
      );

      setOpen(false);
      setQuantity(1);
      setDueDate("");
        navigate('/borrow-summary');
    } catch (error) {
      toast.error("Failed to borrow book");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>

        <Button variant="ghost" size="sm" className="text-black block">
          <BookPlus className="h-4 w-4" />
          <span className="sr-only">Borrow book</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
          <DialogDescription>
            Borrow "{book.title}" by {book.author}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={book.copies}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="col-span-3"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Available copies: {book.copies}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Borrowing..." : "Borrow Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookDialog;
