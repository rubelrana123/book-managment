import { Button } from '@/components/ui/button';
import { BarChart3, Book, Plus } from 'lucide-react';
import { Link } from 'react-router';
 

export default function Hero() {
     const quickActions = [
    {
      href: '/books',
      label: 'Browse Library',
      description: 'View all books in your collection',
      icon: Book,
      variant: 'default' as const
    },
    {
      href: '/create-book',
      label: 'Add New Book',
      description: 'Add a book to your library',
      icon: Plus,
      variant: 'outline' as const
    },
    {
      href: '/borrow-summary',
      label: 'View Summary',
      description: 'Check borrowing statistics',
      icon: BarChart3,
      variant: 'outline' as const
    }
  ];
  return (
    <div>
              <div className="text-center space-y-6 py-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary text-primary-foreground rounded-full">
              <Book className="h-12 w-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Welcome to <span className="text-primary">LibraryHub</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A professional book management system designed to help you organize, track, 
            and manage your library collection with ease and efficiency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} to={action.href}>
                  <Button 
                    variant={action.variant}
                    size="lg"
                    className="flex items-center space-x-2 min-w-[180px]"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{action.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

  
    </div>
  )
}
