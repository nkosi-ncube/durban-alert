'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized weekly weather summaries in multiple languages.
 *
 * @fileOverview
 * - generateWeeklySummary - A function that generates personalized weekly weather summaries.
 * - GenerateWeeklySummaryInput - The input type for the generateWeeklySummary function.
 * - GenerateWeeklySummaryOutput - The return type for the generateWeeklySummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWeeklySummaryInputSchema = z.object({
  area: z.string().describe('The area for which to generate the weather summary.'),
  language: z.enum(['en', 'zu', 'af']).describe('The preferred language for the summary (en: English, zu: Zulu, af: Afrikaans).'),
  userProfession: z.string().describe('The user profession to tailor weather advice'),
});
export type GenerateWeeklySummaryInput = z.infer<typeof GenerateWeeklySummaryInputSchema>;

const GenerateWeeklySummaryOutputSchema = z.object({
  summary: z.string().describe('The generated weekly weather summary.'),
});
export type GenerateWeeklySummaryOutput = z.infer<typeof GenerateWeeklySummaryOutputSchema>;

export async function generateWeeklySummary(input: GenerateWeeklySummaryInput): Promise<GenerateWeeklySummaryOutput> {
  return generateWeeklySummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWeeklySummaryPrompt',
  input: {schema: GenerateWeeklySummaryInputSchema},
  output: {schema: GenerateWeeklySummaryOutputSchema},
  prompt: `You are a weather reporter providing weekly weather summaries for Durban residents. Your summaries should highlight potential flood risks.

  The summary must be localized to the area: {{area}}.
  The summary must be in the language: {{language}}.
  The summary must give weather advice based on their profession: {{userProfession}}.

  Output the weather summary:
`,
});

const generateWeeklySummaryFlow = ai.defineFlow(
  {
    name: 'generateWeeklySummaryFlow',
    inputSchema: GenerateWeeklySummaryInputSchema,
    outputSchema: GenerateWeeklySummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
