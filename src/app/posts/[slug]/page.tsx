import { getPostBySlug, getAllPosts } from '@/lib/posts';
import type { Post } from '@/lib/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, UserCircle, Tag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type PostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: `${post.title} | Chronicle Canvas`,
    description: post.summary,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Split content into paragraphs for better readability if it's a simple string.
  // For actual rich text, you'd use a proper parser (e.g., markdown-to-jsx or a headless CMS field).
  const paragraphs = post.content.split('\n\n').filter(p => p.trim() !== '');

  return (
    <article className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-card shadow-lg rounded-lg">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-3 text-muted-foreground text-sm">
          <div className="flex items-center">
            <UserCircle className="mr-2 h-5 w-5" />
            <span>By {post.author}</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-5 w-5" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex items-center flex-wrap gap-2">
            <Tag className="h-5 w-5 text-muted-foreground mr-1" />
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {post.imageUrl && (
        <div className="mb-8 rounded-lg overflow-hidden shadow-md">
          <Image
            src={post.imageUrl}
            alt={`Cover image for ${post.title}`}
            width={800}
            height={400}
            className="w-full h-auto object-cover"
            priority // Preload hero image
            data-ai-hint={post.tags.slice(0,2).join(" ") || "article illustration"}
          />
        </div>
      )}
      
      <Separator className="my-8" />

      <div className="prose prose-lg max-w-none text-foreground/90 dark:prose-invert">
        {/* Render content. For simple string content: */}
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-6 text-lg leading-relaxed">{paragraph}</p>
        ))}
        {/* If using Markdown, you'd parse and render it here. Example: 
        <ReactMarkdown>{post.content}</ReactMarkdown> 
        Ensure to install react-markdown and @types/react-markdown if doing so.
        */}
      </div>
      
      <Separator className="my-10" />

      <footer className="text-sm text-muted-foreground">
        <p>Thank you for reading. Find more articles on our homepage.</p>
      </footer>
    </article>
  );
}
