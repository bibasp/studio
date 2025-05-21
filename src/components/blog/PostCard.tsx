import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, UserCircle } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg transition-shadow hover:shadow-xl">
      {post.imageUrl && (
        <Link href={`/posts/${post.slug}`} passHref legacyBehavior>
          <a aria-label={`Read more about ${post.title}`} className="block overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={`Cover image for ${post.title}`}
              width={600}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={post.tags.slice(0,2).join(" ") || "abstract background"}
            />
          </a>
        </Link>
      )}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <Link href={`/posts/${post.slug}`} passHref legacyBehavior>
            <a aria-label={`Read more about ${post.title}`}>
              <h2 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-primary group-hover:underline">
                {post.title}
              </h2>
            </a>
          </Link>
          <p className="mb-4 text-muted-foreground line-clamp-3">{post.summary}</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
            <div className="flex items-center mb-2 sm:mb-0">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4" />
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
          </div>
           <Link href={`/posts/${post.slug}`} passHref legacyBehavior>
             <a className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
               Read more &rarr;
             </a>
           </Link>
        </div>
      </div>
    </article>
  );
}
