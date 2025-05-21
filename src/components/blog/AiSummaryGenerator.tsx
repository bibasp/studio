
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { generatePostSummary } from '@/ai/flows/generate-post-summary'; // Assuming this is a server action
import { useToast } from "@/hooks/use-toast";

export function AiSummaryGenerator() {
  const [postContent, setPostContent] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    if (!postContent.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some content to summarize.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSummary('');
    try {
      // The generatePostSummary flow is already defined as a server action
      // It can be directly called from a client component if using Next.js App Router with 'use server'
      const result = await generatePostSummary({ postContent, maxLength: 250 });
      setSummary(result.summary);
      toast({
        title: "Summary Generated!",
        description: "The AI has crafted a summary for your content.",
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Error Generating Summary",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setSummary('Failed to generate summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Sparkles className="mr-2 h-6 w-6 text-primary" />
          AI Post Summary Generator
        </CardTitle>
        <CardDescription>
          Paste your blog post content below to generate a concise and engaging summary.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="postContent" className="text-lg font-medium">Post Content</Label>
          <Textarea
            id="postContent"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Enter your full blog post content here..."
            rows={10}
            className="text-base text-foreground"
            disabled={isLoading}
          />
        </div>
        <Button
          onClick={handleGenerateSummary}
          disabled={isLoading || !postContent.trim()}
          className="w-full text-lg py-3"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Summary
            </>
          )}
        </Button>
        {summary && (
          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="generatedSummary" className="text-lg font-medium">Generated Summary</Label>
            <Textarea
              id="generatedSummary"
              value={summary}
              readOnly
              rows={5}
              className="bg-muted text-base text-muted-foreground"
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          AI summaries are optimized for timeline previews and social sharing. Max length approx 250 characters.
        </p>
      </CardFooter>
    </Card>
  );
}

