 
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { BarChart3, BookPlus, Plus } from 'lucide-react';
import { useGetBorrowSummaryQuery } from '@/redux/api/bookApi';

interface IBorrowSummary {
  book : {title : string, isbn : string} 
  totalQuantity: number;
}

const BorrowSummary = () => {
 const {data, isLoading,isError} =useGetBorrowSummaryQuery(undefined);;
 const borrowedBooks = data?.data || [];
  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading borrow summary...</p>
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
          <h1 className="text-3xl font-bold text-foreground">Borrow Summary</h1>
          <p className="text-muted-foreground">Overview of all borrowed books</p>
        </div>
      </div>
 

      {/* Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Borrowing Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {borrowedBooks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <BookPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No books borrowed yet</p>
                <p className="text-sm">Start borrowing books to see the summary here</p>
              </div>
              <Link to="/books">
                <Button>Browse Available Books</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead className="text-right">Total Quantity Borrowed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borrowedBooks
                    .map((item : IBorrowSummary , index: any) => (
                    <TableRow key={`${item.book.isbn}-${index}`}>
                      <TableCell className="font-medium">{item.book.title}</TableCell>
                      <TableCell className="font-mono text-sm">{item.book.isbn}</TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center justify-center min-w-[2rem] h-6 px-2 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                          {item.totalQuantity}
                        </span>
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

export default BorrowSummary;