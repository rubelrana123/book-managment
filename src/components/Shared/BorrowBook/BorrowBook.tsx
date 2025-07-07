import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
 
import { BookOpen } from 'lucide-react';
import type { Book } from '@/types/book';

interface BorrowBookDialogProps {
  book: Book;
  onBookUpdated: (updatedBook: Book) => void;
}

const BorrowBookDialog = ({ book, onBookUpdated }: BorrowBookDialogProps) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // if (!dueDate) {
    //   toast({
    //     title: 'Error',
    //     description: 'Please select a due date',
    //     variant: 'destructive'
    //   });
    //   return;
    // }

    // if (quantity > book.copies) {
    //   toast({
    //     title: 'Error',
    //     description: `Only ${book.copies} copies available`,
    //     variant: 'destructive'
    //   });
    //   return;
    // }

//     try {
//       setLoading(true);
//       const borrowData = {
//         quantity,
//         dueDate: new Date(dueDate)
//       };

//       const borrowResult = await bookService.borrowBook(book.id, borrowData);
      
//       if (borrowResult) {
//         // Update book copies
//         const updatedBook = {
//           ...book,
//           copies: book.copies - quantity,
//           available: book.copies - quantity > 0
//         };
        
//         onBookUpdated(updatedBook);
        
//         toast({
//           title: 'Success',
//           description: `Successfully borrowed ${quantity} cop${quantity > 1 ? 'ies' : 'y'} of "${book.title}"`
//         });
        
//         setOpen(false);
//         setQuantity(1);
//         setDueDate('');
//         navigate('/borrow-summary');
//       }
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to borrow book',
//         variant: 'destructive'
//       });
//     } finally {
//       setLoading(false);
//     }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center space-x-1">
          <BookOpen className="h-3 w-3" />
          <span className="text-xs">Borrow</span>
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
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Available copies: {book.copies}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Borrowing...' : 'Borrow Book'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookDialog;