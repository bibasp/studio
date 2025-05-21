import { PostTimeline } from '@/components/blog/PostTimeline';
import { getAllPosts } from '@/lib/posts';
import type { Post } from '@/lib/types';

export default async function HomePage() {
  const posts: Post[] = await getAllPosts();

  return (
    <div className="space-y-12">
      <section aria-labelledby="latest-posts-heading">
        <h1 id="latest-posts-heading" className="text-3xl font-bold tracking-tight sm:text-4xl mb-8 pb-4 border-b">
          Latest Articles
        </h1>
        <PostTimeline posts={posts} />
      </section>
    </div>
  );
}
