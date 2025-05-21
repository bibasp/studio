"use client";

import Link from 'next/link';
import { BookOpenText, Search, Palette, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeCustomizer } from '@/components/theme/ThemeCustomizer';
import { useState, useEffect } from 'react';

export function Header() {
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <BookOpenText className="h-7 w-7" />
            <span>Chronicle Canvas</span>
          </Link>
          {/* Placeholder for nav to avoid layout shift */}
          <nav className="flex items-center gap-1">
            <div className="h-9 w-20 rounded-md bg-muted/50 animate-pulse"></div>
            <div className="h-9 w-20 rounded-md bg-muted/50 animate-pulse"></div>
            <div className="h-9 w-20 rounded-md bg-muted/50 animate-pulse"></div>
            <div className="h-9 w-9 rounded-md bg-muted/50 animate-pulse"></div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity">
            <BookOpenText className="h-7 w-7" />
            <span className="hidden sm:inline">Chronicle Canvas</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" asChild className="btn-subtle-hover">
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild className="btn-subtle-hover">
              <Link href="/search">
                <Search className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Search</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild className="btn-subtle-hover">
              <Link href="/generate-summary">
                <Sparkles className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">AI Summary</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsThemeCustomizerOpen(true)}
              aria-label="Customize Theme"
              className="btn-subtle-hover"
            >
              <Palette className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </header>
      <ThemeCustomizer open={isThemeCustomizerOpen} onOpenChange={setIsThemeCustomizerOpen} />
    </>
  );
}
