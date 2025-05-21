import type { Post } from './types';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    slug: 'the-future-of-web-development',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    content: 'Web development is an ever-evolving field. In 2024, several key trends are shaping its future. AI-powered tools, server-side rendering with client-side enhancements, and the rise of edge computing are just a few. This post delves into what developers should keep an eye on.',
    author: 'Alex Johnson',
    date: '2024-07-15T10:00:00Z',
    tags: ['web development', 'trends', '2024', 'ai'],
    summary: 'Explore the key web development trends for 2024, including AI, SSR, and edge computing.',
    imageUrl: 'https://placehold.co/600x400.png?text=Web+Dev+Future',
    // data-ai-hint for placeholder: technology code
  },
  {
    id: '2',
    slug: 'mastering-minimalist-design',
    title: 'Mastering Minimalist Design: Less is More',
    content: 'Minimalism in design is not just about what you remove, but about intentionality. Every element serves a purpose. This guide explores the principles of minimalist design, how to apply them effectively, and showcases inspiring examples. From typography to color palettes, learn how to create impactful designs with simplicity.',
    author: 'Sarah Miller',
    date: '2024-07-10T14:30:00Z',
    tags: ['design', 'minimalism', 'ui', 'ux'],
    summary: 'A comprehensive guide to understanding and implementing minimalist design principles for impactful and clean aesthetics.',
    imageUrl: 'https://placehold.co/600x400.png?text=Minimalist+Design',
    // data-ai-hint for placeholder: simple abstract
  },
  {
    id: '3',
    slug: 'the-art-of-storytelling-in-blogs',
    title: 'The Art of Storytelling: Engaging Your Blog Audience',
    content: 'A successful blog does more than just present facts; it tells a story. Storytelling captivates readers, builds connections, and makes your content memorable. This article discusses techniques for weaving narratives into your blog posts, understanding your audience, and creating an emotional impact.',
    author: 'David Lee',
    date: '2024-07-05T09:00:00Z',
    tags: ['blogging', 'writing', 'storytelling', 'content creation'],
    summary: 'Learn how to use storytelling techniques to captivate your blog readers and make your content more memorable.',
    imageUrl: 'https://placehold.co/600x400.png?text=Storytelling+Art',
    // data-ai-hint for placeholder: open book
  },
  {
    id: '4',
    slug: 'navigating-the-world-of-ai-ethics',
    title: 'Navigating the Complex World of AI Ethics',
    content: 'As artificial intelligence becomes more integrated into our lives, the ethical implications grow. This post explores the key ethical challenges in AI, including bias, privacy, accountability, and the societal impact. It aims to provide a framework for thinking about these issues and fostering responsible AI development.',
    author: 'Dr. Emily Carter',
    date: '2024-06-28T11:00:00Z',
    tags: ['ai', 'ethics', 'technology', 'society'],
    summary: 'An exploration of the key ethical challenges posed by artificial intelligence and a call for responsible development.',
    imageUrl: 'https://placehold.co/600x400.png?text=AI+Ethics',
    // data-ai-hint for placeholder: abstract circuits
  },
  {
    id: '5',
    slug: 'sustainable-living-small-changes-big-impact',
    title: 'Sustainable Living: Small Changes, Big Impact',
    content: 'Adopting a sustainable lifestyle can seem daunting, but many small changes can collectively make a significant difference. This article offers practical tips for reducing your environmental footprint, from conscious consumption and waste reduction to energy saving and supporting sustainable businesses. Start your journey towards a greener life today.',
    author: 'Maria Rodriguez',
    date: '2024-06-20T16:15:00Z',
    tags: ['sustainability', 'eco-friendly', 'lifestyle', 'environment'],
    summary: 'Practical tips for adopting a more sustainable lifestyle through small, manageable changes that have a large collective impact.',
    imageUrl: 'https://placehold.co/600x400.png?text=Sustainable+Living',
    // data-ai-hint for placeholder: green nature
  },
];

// Sort posts by date descending by default
MOCK_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getAllPosts = async (): Promise<Post[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return MOCK_POSTS;
};

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return MOCK_POSTS.find(post => post.slug === slug);
};

export const searchPosts = async (
  query: string,
  filters: { author?: string; startDate?: string; endDate?: string; tags?: string[] }
): Promise<Post[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const lowerQuery = query.toLowerCase();
  
  return MOCK_POSTS.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(lowerQuery);
    const contentMatch = post.content.toLowerCase().includes(lowerQuery);
    const tagQueryMatch = post.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

    const queryMatch = titleMatch || contentMatch || tagQueryMatch;
    if (!queryMatch && query.trim() !== "") return false;

    if (filters.author && post.author.toLowerCase() !== filters.author.toLowerCase()) {
      return false;
    }

    const postDate = new Date(post.date);
    if (filters.startDate && postDate < new Date(filters.startDate)) {
      return false;
    }
    if (filters.endDate) {
      // Include posts on the endDate
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999); 
      if (postDate > endDate) {
        return false;
      }
    }
    
    if (filters.tags && filters.tags.length > 0) {
      const postTagsLower = post.tags.map(t => t.toLowerCase());
      const filterTagsLower = filters.tags.map(t => t.toLowerCase());
      if (!filterTagsLower.every(ft => postTagsLower.includes(ft))) {
        return false;
      }
    }
    
    return true;
  });
};

export const getAuthors = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  const authors = new Set(MOCK_POSTS.map(post => post.author));
  return Array.from(authors).sort();
};

export const getAllTags = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  const tags = new Set(MOCK_POSTS.flatMap(post => post.tags));
  return Array.from(tags).sort();
};
