"use client";

import type { FormEvent } from 'react';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, SearchIcon, RotateCcwIcon, TagIcon, UserIcon } from 'lucide-react';
import type { Post } from '@/lib/types';
import { getAuthors, getAllTags, searchPosts as fetchSearchPosts } from '@/lib/posts'; // Renamed to avoid conflict
import { PostTimeline } from './PostTimeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';

export function PostSearch() {
  const [query, setQuery] = useState('');
  const [author, setAuthor] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const [availableAuthors, setAvailableAuthors] = useState<string[]>([]);
  const [allAvailableTags, setAllAvailableTags] = useState<string[]>([]);

  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedAuthors, fetchedTags] = await Promise.all([getAuthors(), getAllTags()]);
      setAvailableAuthors(fetchedAuthors);
      setAllAvailableTags(fetchedTags);
    };
    fetchData();
  }, []);

  const handleSearch = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    const results = await fetchSearchPosts(query, {
      author: author || undefined,
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    });
    setSearchResults(results);
    setIsLoading(false);
  };

  const handleReset = () => {
    setQuery('');
    setAuthor('');
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedTags([]);
    setSearchResults([]);
    setHasSearched(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <SearchIcon className="mr-2 h-6 w-6 text-primary" />
            Advanced Post Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="searchQuery" className="font-semibold">Search Term</Label>
              <Input
                id="searchQuery"
                type="text"
                placeholder="Search by title, content, or tags..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-base"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="authorFilter" className="font-semibold flex items-center">
                  <UserIcon className="mr-2 h-4 w-4 text-muted-foreground"/> Author
                </Label>
                <Select value={author} onValueChange={setAuthor}>
                  <SelectTrigger id="authorFilter" className="text-base">
                    <SelectValue placeholder="All Authors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Authors</SelectItem>
                    {availableAuthors.map(auth => (
                      <SelectItem key={auth} value={auth}>{auth}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                 <Label className="font-semibold flex items-center"><TagIcon className="mr-2 h-4 w-4 text-muted-foreground"/> Tags</Label>
                 <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal text-base">
                        {selectedTags.length > 0 ? selectedTags.join(', ') : "Select Tags"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="p-4 max-h-60 overflow-y-auto space-y-2">
                        {allAvailableTags.map(tag => (
                           <Button 
                             key={tag} 
                             variant={selectedTags.includes(tag) ? "default" : "outline"}
                             size="sm"
                             onClick={() => toggleTag(tag)}
                             className="mr-2 mb-2 text-xs"
                           >
                             {tag}
                           </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="font-semibold">Start Date</Label>
                 <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="startDate"
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal text-base ${!startDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a start date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="font-semibold">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="endDate"
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal text-base ${!endDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick an end date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={startDate ? { before: startDate } : undefined}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button type="submit" className="w-full sm:w-auto text-base" disabled={isLoading}>
                <SearchIcon className="mr-2 h-5 w-5" />
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset} className="w-full sm:w-auto text-base" disabled={isLoading}>
                <RotateCcwIcon className="mr-2 h-5 w-5" />
                Reset Filters
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {hasSearched && (
        <section aria-labelledby="search-results-heading">
          <h2 id="search-results-heading" className="text-2xl font-semibold mb-6 pb-3 border-b">
            Search Results
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="ml-3 text-muted-foreground">Loading results...</p>
            </div>
          ) : (
            <PostTimeline posts={searchResults} />
          )}
        </section>
      )}
    </div>
  );
}
