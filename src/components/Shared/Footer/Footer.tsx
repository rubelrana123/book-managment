import { BookOpenText } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-muted text-muted-foreground mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
            <Link to="/" className="flex items-center space-x-2">
            <BookOpenText className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">LibraryHub</span>
          </Link>
          <p className="mt-2 text-sm">
            Your digital library for managing books with ease — track, update, and organize your collection seamlessly.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-md font-semibold text-foreground mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/books" className="hover:underline">Library</Link></li>
            <li><Link to="/add-book" className="hover:underline">Add Book</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
          </ul>
        </div>

        {/* Contact / Info */}
        <div>
          <h3 className="text-md font-semibold text-foreground mb-2">Contact</h3>
          <p className="text-sm">Have feedback or questions?</p>
          <p className="text-sm mt-1">Email: <a href="mailto:support@bookvault.com" className="underline">support@bookvault.com</a></p>
        </div>
      </div>

      <div className="border-t mt-6 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BookVault. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
