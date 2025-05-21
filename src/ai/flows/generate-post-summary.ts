// src/ai/flows/generate-post-summary.ts
'use server';

/**
 * @fileOverview AI-powered tool which generates concise and engaging summaries of blog posts.
 *
 * - generatePostSummary - A function that handles the generation of blog post summaries.
 * - GeneratePostSummaryInput - The input type for the generatePostSummary function.
 * - GeneratePostSummaryOutput - The return type for the generatePostSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePostSummaryInputSchema = z.object({
  postContent: z
    .string()
    .describe('The full content of the blog post to be summarized.'),
  maxLength: z
    .number()
    .optional()
    .default(200)
    .describe('The maximum length of the summary in characters.'),
});
export type GeneratePostSummaryInput = z.infer<
  typeof GeneratePostSummaryInputSchema
>;

const GeneratePostSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise and engaging summary of the blog post.'),
});
export type GeneratePostSummaryOutput = z.infer<
  typeof GeneratePostSummaryOutputSchema
>;

export async function generatePostSummary(
  input: GeneratePostSummaryInput
): Promise<GeneratePostSummaryOutput> {
  return generatePostSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePostSummaryPrompt',
  input: {schema: GeneratePostSummaryInputSchema},
  output: {schema: GeneratePostSummaryOutputSchema},
  prompt: `You are an expert content writer specializing in creating engaging summaries.

  Please generate a concise and engaging summary of the following blog post content.
  The summary should be no more than {{maxLength}} characters.

  Blog Post Content:
  {{postContent}}`,
});

const generatePostSummaryFlow = ai.defineFlow(
  {
    name: 'generatePostSummaryFlow',
    inputSchema: GeneratePostSummaryInputSchema,
    outputSchema: GeneratePostSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
