'use server';
/**
 * @fileOverview A plagiarism check AI agent.
 *
 * - checkTextForPlagiarism - A function that handles the plagiarism check process.
 * - CheckTextForPlagiarismInput - The input type for the checkTextForPlagiarism function.
 * - CheckTextForPlagiarismOutput - The return type for the checkTextForPlagiarism function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckTextForPlagiarismInputSchema = z.object({
  text: z.string().describe('The text to check for plagiarism.'),
});
export type CheckTextForPlagiarismInput = z.infer<typeof CheckTextForPlagiarismInputSchema>;

const CheckTextForPlagiarismOutputSchema = z.object({
  similarityPercentage: z
    .number()
    .describe('The percentage of similarity between the input text and online sources.'),
  sourceUrls: z.array(z.string()).describe('The URLs of the sources that match the input text.'),
});
export type CheckTextForPlagiarismOutput = z.infer<typeof CheckTextForPlagiarismOutputSchema>;

export async function checkTextForPlagiarism(input: CheckTextForPlagiarismInput): Promise<CheckTextForPlagiarismOutput> {
  return checkTextForPlagiarismFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkTextForPlagiarismPrompt',
  input: {schema: CheckTextForPlagiarismInputSchema},
  output: {schema: CheckTextForPlagiarismOutputSchema},
  prompt: `You are a plagiarism checker. You will receive text as input and check it for plagiarism against online sources. Return the percentage of similarity between the input text and the online sources, as well as the URLs of the sources that match the input text. Use the following format for the output:

Similarity Percentage: <percentage>
Source URLs: <url1>, <url2>, <url3>, ...

Text: {{{text}}}`,
});

const checkTextForPlagiarismFlow = ai.defineFlow(
  {
    name: 'checkTextForPlagiarismFlow',
    inputSchema: CheckTextForPlagiarismInputSchema,
    outputSchema: CheckTextForPlagiarismOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
