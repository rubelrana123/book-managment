const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © 2024 LibraryPro. Built with React & TypeScript.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Professional Book Management System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;