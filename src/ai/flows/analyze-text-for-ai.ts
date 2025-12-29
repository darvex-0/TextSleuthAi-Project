'use server';

/**
 * @fileOverview AI text detection flow.
 *
 * - analyzeTextForAI - Analyzes text to determine if it was AI-generated.
 * - AnalyzeTextForAIInput - The input type for the analyzeTextForAI function.
 * - AnalyzeTextForAIOutput - The return type for the analyzeTextForAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTextForAIInputSchema = z.object({
  text: z.string().describe('The text to analyze.'),
});
export type AnalyzeTextForAIInput = z.infer<typeof AnalyzeTextForAIInputSchema>;

const AnalyzeTextForAIOutputSchema = z.object({
  isAiGenerated: z.boolean().describe('Whether the text is AI-generated or not.'),
  confidenceScore: z.number().describe('The confidence score of the AI detection.'),
});
export type AnalyzeTextForAIOutput = z.infer<typeof AnalyzeTextForAIOutputSchema>;

export async function analyzeTextForAI(input: AnalyzeTextForAIInput): Promise<AnalyzeTextForAIOutput> {
  return analyzeTextForAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTextForAIPrompt',
  input: {schema: AnalyzeTextForAIInputSchema},
  output: {schema: AnalyzeTextForAIOutputSchema},
  prompt: `You are an AI text detector. Analyze the following text and determine if it was AI-generated or human-written. Return a boolean value for isAiGenerated. Also, return a confidence score between 0 and 1 for the AI detection.\n\nText: {{{text}}}`,
});

const analyzeTextForAIFlow = ai.defineFlow(
  {
    name: 'analyzeTextForAIFlow',
    inputSchema: AnalyzeTextForAIInputSchema,
    outputSchema: AnalyzeTextForAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
