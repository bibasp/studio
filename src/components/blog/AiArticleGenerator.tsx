
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, FileText, Tag, Image as ImageIcon } from 'lucide-react';
import { generateBlogArticle, type GenerateBlogArticleOutput } from '@/ai/flows/generate-blog-article-flow';
import { useToast } from "@/hooks/use-toast";

export function AiArticleGenerator() {
  const [topic, setTopic] = useState('');
  const [wordCount, setWordCount] = useState<number | undefined>(800);
  const [generatedArticle, setGeneratedArticle] = useState<GenerateBlogArticleOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateArticle = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for the article.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedArticle(null);
    try {
      const result = await generateBlogArticle({ topic, wordCount: wordCount || 800 });
      setGeneratedArticle(result);
      toast({
        title: "Article Generated!",
        description: "The AI has crafted an article for your topic.",
      });
    } catch (error) {
      console.error('Error generating article:', error);
      toast({
        title: "Error Generating Article",
        description: `Something went wrong: ${error instanceof Error ? error.message : 'Please try again.'}`,
        variant: "destructive",
      });
      setGeneratedArticle(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <FileText className="mr-2 h-6 w-6 text-primary" />
          AI Article Generator
        </CardTitle>
        <CardDescription>
          Enter a topic and let the AI craft a full blog article matching the Chronicle Canvas theme.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="articleTopic" className="text-lg font-medium">Article Topic</Label>
          <Input
            id="articleTopic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., The Impact of Quantum Computing on Cybersecurity"
            className="text-base text-foreground"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wordCount" className="text-base font-medium">Approximate Word Count (Optional)</Label>
          <Input
            id="wordCount"
            type="number"
            value={wordCount || ''}
            onChange={(e) => setWordCount(e.target.value ? parseInt(e.target.value, 10) : undefined)}
            placeholder="e.g., 800"
            className="text-base w-1/3 text-foreground"
            disabled={isLoading}
            min="100"
            step="50"
          />
        </div>
        <Button
          onClick={handleGenerateArticle}
          disabled={isLoading || !topic.trim()}
          className="w-full text-lg py-3"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Article...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Article
            </>
          )}
        </Button>
        
        {generatedArticle && (
          <div className="space-y-6 pt-6 border-t mt-6">
            <div>
              <Label className="text-xl font-semibold text-primary mb-2 block">Generated Article</Label>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="generatedTitle" className="text-lg font-medium">Title</Label>
              <Input
                id="generatedTitle"
                value={generatedArticle.title}
                readOnly
                className="bg-muted text-base font-semibold text-muted-foreground"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="generatedContent" className="text-lg font-medium">Content</Label>
              <Textarea
                id="generatedContent"
                value={generatedArticle.content}
                readOnly
                rows={15}
                className="bg-muted text-base leading-relaxed text-muted-foreground"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="generatedSummary" className="text-lg font-medium">Summary</Label>
              <Textarea
                id="generatedSummary"
                value={generatedArticle.summary}
                readOnly
                rows={3}
                className="bg-muted text-base text-muted-foreground"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-lg font-medium flex items-center"><Tag className="mr-2 h-5 w-5"/> Tags</Label>
              <div className="flex flex-wrap gap-2">
                {generatedArticle.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="imageHint" className="text-lg font-medium flex items-center"><ImageIcon className="mr-2 h-5 w-5"/> Image Hint</Label>
              <Input
                id="imageHint"
                value={generatedArticle.imageHint}
                readOnly
                className="bg-muted text-base text-muted-foreground"
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          AI generated content should be reviewed and edited before publishing.
        </p>
      </CardFooter>
    </Card>
  );
}

