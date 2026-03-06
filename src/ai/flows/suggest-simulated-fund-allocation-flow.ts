'use server';
/**
 * @fileOverview A Genkit flow for suggesting high-level strategies for simulated fund allocation.
 *
 * - suggestSimulatedFundAllocation - A function that provides a textual suggestion for fund prioritization.
 * - SuggestSimulatedFundAllocationInput - The input type for the suggestSimulatedFundAllocation function.
 * - SuggestSimulatedFundAllocationOutput - The return type for the suggestSimulatedFundAllocation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSimulatedFundAllocationInputSchema = z.object({
  totalVirtualPool: z.number().describe('The total simulated monthly contribution pool in Indian Rupees (₹).'),
});
export type SuggestSimulatedFundAllocationInput = z.infer<typeof SuggestSimulatedFundAllocationInputSchema>;

const SuggestSimulatedFundAllocationOutputSchema = z.object({
  suggestion: z.string().describe('A brief, textual suggestion for how the simulated funds could be prioritized.'),
});
export type SuggestSimulatedFundAllocationOutput = z.infer<typeof SuggestSimulatedFundAllocationOutputSchema>;

export async function suggestSimulatedFundAllocation(input: SuggestSimulatedFundAllocationInput): Promise<SuggestSimulatedFundAllocationOutput> {
  return suggestSimulatedFundAllocationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulatedFundAllocationSuggestionPrompt',
  input: {schema: SuggestSimulatedFundAllocationInputSchema},
  output: {schema: SuggestSimulatedFundAllocationOutputSchema},
  prompt: `You are a civic planning advisor for Sarva Simulation Dashboard.
The total simulated monthly contribution pool available is ₹{{{totalVirtualPool}}}.

Your task is to provide a brief, high-level textual suggestion for how these simulated funds could be prioritized to maximize civic impact in India.
The suggestion should be concise, focusing on potential impact strategies (e.g., 'focus on education', 'balance infrastructure and health') rather than specific numerical allocations.
Consider the scale of the total virtual pool when making your suggestion.

Example suggestions:
- "Prioritize foundational education and basic sanitation."
- "Invest strategically in water infrastructure and air quality research, alongside expanding educational access."
- "Focus on balanced growth across all sectors, with particular emphasis on scalable infrastructure projects."

Your output should be only the suggestion itself, formatted as a JSON object with a single 'suggestion' field.`,
});

const suggestSimulatedFundAllocationFlow = ai.defineFlow(
  {
    name: 'suggestSimulatedFundAllocationFlow',
    inputSchema: SuggestSimulatedFundAllocationInputSchema,
    outputSchema: SuggestSimulatedFundAllocationOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
