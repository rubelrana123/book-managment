import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
// import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
// import { Book } from '@/types/book';
// import { bookService } from '@/lib/bookService';
// import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Edit, BookPlus, Calendar, Hash, User, Tag, FileText, Copy } from 'lucide-react';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadBook(id);
    }
  }, [id]);

  const loadBook = async (bookId: string) => {
    try {
      setLoading(true);
      const bookData = await bookService.getBookById(bookId);
      if (bookData) {
        setBook(bookData);
      } else {
        toast({
          title: 'Error',
          description: 'Book not found',
          variant: 'destructive'
        });
        navigate('/books');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load book details',
        variant: 'destructive'
      });
      navigate('/books');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading book details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">Book not found</p>
          <Button onClick={() => navigate('/books')}>Back to Library</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/books')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Library</span>
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Link to={`/edit-book/${book.id}`}>
            <Button variant="outline" className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Edit Book</span>
            </Button>
          </Link>
          
          {book.available && book.copies > 0 && (
            <Link to={`/borrow/${book.id}`}>
              <Button className="flex items-center space-x-2">
                <BookPlus className="h-4 w-4" />
                <span>Borrow Book</span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Book Details */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl mb-2">{book.title}</CardTitle>
              <p className="text-lg text-muted-foreground">by {book.author}</p>
            </div>
            <Badge 
              variant={book.available ? "default" : "secondary"}
              className={book.available ? "bg-success hover:bg-success/80" : ""}
            >
              {book.available ? 'Available' : 'Unavailable'}
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
                  <p className="font-medium text-sm text-muted-foreground">Genre</p>
                  <p className="text-foreground">{book.genre}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Hash className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">ISBN</p>
                  <p className="font-mono text-foreground">{book.isbn}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Copy className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Available Copies</p>
                  <p className="text-foreground font-semibold">{book.copies}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Author</p>
                  <p className="text-foreground">{book.author}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {book.description && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium text-foreground">Description</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-8">
                  {book.description}
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
                <p className="font-medium text-sm text-muted-foreground">Added to Library</p>
                <p className="text-foreground">{book.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm text-muted-foreground">Last Updated</p>
                <p className="text-foreground">{book.updatedAt.toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <Separator />
          <div className="flex flex-col sm:flex-row gap-4">
            {book.available && book.copies > 0 ? (
              <Link to={`/borrow/${book.id}`} className="flex-1">
                <Button className="w-full flex items-center space-x-2">
                  <BookPlus className="h-4 w-4" />
                  <span>Borrow This Book</span>
                </Button>
              </Link>
            ) : (
              <div className="flex-1">
                <Button disabled className="w-full">
                  Not Available for Borrowing
                </Button>
              </div>
            )}
            
            <Link to={`/edit-book/${book.id}`} className="flex-1">
              <Button variant="outline" className="w-full flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Edit Book Details</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    </Layout>
  );
};

export default BookDetails;