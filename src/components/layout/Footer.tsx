export function Footer() {
  return (
    <footer className="border-t py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Chronicle Canvas. All rights reserved.</p>
        <p className="text-sm mt-1">Inspired by timeless design and modern technology.</p>
      </div>
    </footer>
  );
}
