import type { Post } from '@/lib/types';
import { PostCard } from './PostCard';

interface PostTimelineProps {
  posts: Post[];
}

export function PostTimeline({ posts }: PostTimelineProps) {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-muted-foreground py-10">No posts found.</p>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
