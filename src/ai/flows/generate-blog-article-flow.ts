
'use server';
/**
 * @fileOverview AI-powered tool to generate full blog articles for Chronicle Canvas.
 *
 * - generateBlogArticle - A function that handles the generation of blog articles.
 * - GenerateBlogArticleInput - The input type for the generateBlogArticle function.
 * - GenerateBlogArticleOutput - The return type for the generateBlogArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogArticleInputSchema = z.object({
  topic: z.string().describe('The main topic or theme for the blog article.'),
  wordCount: z
    .number()
    .optional()
    .default(800)
    .describe('The approximate desired word count for the article.'),
});
export type GenerateBlogArticleInput = z.infer<
  typeof GenerateBlogArticleInputSchema
>;

const GenerateBlogArticleOutputSchema = z.object({
  title: z.string().describe('A captivating and relevant title for the blog article.'),
  content: z
    .string()
    .describe(
      'The full content of the blog article, written in an engaging and insightful tone. It should be well-structured with paragraphs and potentially subheadings.'
    ),
  summary: z
    .string()
    .describe(
      'A concise summary of the article, typically 2-3 sentences long, suitable for previews.'
    ),
  tags: z
    .array(z.string())
    .describe(
      'An array of 3-5 relevant keywords or tags for the article.'
    ),
  imageHint: z
    .string()
    .describe(
      '1-2 keywords that can be used to find a suitable cover image for the article (e.g., "abstract technology", "creative writing").'
    ),
});
export type GenerateBlogArticleOutput = z.infer<
  typeof GenerateBlogArticleOutputSchema
>;

export async function generateBlogArticle(
  input: GenerateBlogArticleInput
): Promise<GenerateBlogArticleOutput> {
  return generateBlogArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogArticlePrompt',
  input: {schema: GenerateBlogArticleInputSchema},
  output: {schema: GenerateBlogArticleOutputSchema},
  prompt: `You are an expert writer for 'Chronicle Canvas,' a sophisticated online publication. Our tagline is 'Modern insights, timelessly presented.' Your task is to write a blog article on the topic: {{{topic}}}.

Adhere to the following guidelines:

Tone & Style:
- Write in an intelligent, articulate, engaging, and insightful manner.
- Maintain a polished, professional voice that is still accessible.
- Avoid overly casual slang or jargon unless essential and well-explained.
- The content should feel well-crafted and align with themes of technology, design, creativity, personal growth, AI, ethics, and societal trends.

Structure:
- Title: Create a catchy and informative title.
- Introduction: Hook the reader, state the article's purpose, and briefly outline what will be covered.
- Body: Organize with clear paragraphs. Use subheadings (e.g., starting a line with '## Subheading Title') if the content benefits from them to break up text and improve scannability. Ensure a logical flow of ideas.
- Conclusion: Summarize the main points and offer a final thought, a question for reflection, or an insightful takeaway.

Content Details:
- Aim for approximately {{wordCount}} words.
- Provide in-depth information, using examples, explanations, or anecdotes where helpful.
- Ensure factual accuracy and thoughtful exploration of the topic.

Output Requirements:
Based on the topic "{{topic}}", please generate the article and provide the output in the specified structured format.
The 'content' field should contain the full article.
The 'summary' should be a concise 2-3 sentence overview.
The 'tags' should be an array of 3-5 relevant keywords.
The 'imageHint' should be 1-2 keywords for an accompanying image.`,
});

const generateBlogArticleFlow = ai.defineFlow(
  {
    name: 'generateBlogArticleFlow',
    inputSchema: GenerateBlogArticleInputSchema,
    outputSchema: GenerateBlogArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate an article. Output was empty.');
    }
    // Ensure tags is always an array, even if AI returns a string by mistake
    if (typeof output.tags === 'string') {
        // Attempt to parse if it's a comma-separated string, or just wrap it
        output.tags = (output.tags as string).includes(',') ? (output.tags as string).split(',').map(tag => tag.trim()) : [output.tags as string];
    }
    if (!Array.isArray(output.tags)) {
        output.tags = ["general"]; // Fallback if parsing fails
    }
    return output;
  }
);
