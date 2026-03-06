'use server';
/**
 * @fileOverview A Genkit flow for simulating civic development and proposing district expansion.
 *
 * - proposeDistrictExpansion - A function that proposes new districts or expands services based on simulated funds.
 * - SimulatedFundsInput - The input type for the proposeDistrictExpansion function.
 * - DistrictExpansionOutput - The return type for the proposeDistrictExpansion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulatedFundsInputSchema = z.object({
  totalSimulatedFunds: z
    .number()
    .describe('The total simulated monthly contribution pool in Indian Rupees.'),
});
export type SimulatedFundsInput = z.infer<typeof SimulatedFundsInputSchema>;

const DistrictExpansionOutputSchema = z.object({
  districts: z
    .array(
      z.object({
        name: z.string().describe('The name of the proposed district or region.'),
        servicesProposed: z
          .array(z.string())
          .describe('A list of services proposed for this district, e.g., "1 new primary school", "3 teachers", "1 water hub".'),
        explanation: z
          .string()
          .describe('A brief explanation for the proposed services in this district.'),
      })
    )
    .describe('A list of districts where new services are proposed based on the simulated funds.'),
  overallExplanation: z
    .string()
    .describe('An overall explanation of the proposed expansion strategy and how the funds were hypothetically allocated.'),
});
export type DistrictExpansionOutput = z.infer<typeof DistrictExpansionOutputSchema>;

export async function proposeDistrictExpansion(
  input: SimulatedFundsInput
): Promise<DistrictExpansionOutput> {
  return proposeDistrictExpansionFlow(input);
}

const proposeDistrictExpansionPrompt = ai.definePrompt({
  name: 'proposeDistrictExpansionPrompt',
  input: {schema: SimulatedFundsInputSchema},
  output: {schema: DistrictExpansionOutputSchema},
  prompt: `You are an AI urban planner for the Sarva Civic Simulation. 
Your goal is to propose hypothetical civic developments based on a total simulated monthly contribution pool.

GEOGRAPHIC PRIORITY (MANDATORY):
1. ALWAYS prioritize **Kamrup Metropolitan (Guwahati)** as the first target. If the funds are enough to sustain one full school there (approx ₹21L/month), then move to 2.
2. Next, focus on other districts within **Assam** (e.g., Kamrup Rural, Darrang, Morigaon, Nalbari).
3. Only if the funds are exceptionally high (e.g., enough for 30+ schools) should you start proposing districts in other Indian states.

For each district:
- Propose specific services (e.g., "1 new primary school", "12 teachers", "1 RO water hub").
- Use realistic teacher counts: ~34 teachers for a full Class 1-12 school.
- Provide a brief explanation of why this district was chosen.

Total simulated monthly contribution pool: ₹{{{totalSimulatedFunds}}}

Please format your response strictly as a JSON object, adhering to the provided output schema.`,
});

const proposeDistrictExpansionFlow = ai.defineFlow(
  {
    name: 'proposeDistrictExpansionFlow',
    inputSchema: SimulatedFundsInputSchema,
    outputSchema: DistrictExpansionOutputSchema,
  },
  async (input) => {
    const {output} = await proposeDistrictExpansionPrompt(input);
    if (!output) {
      throw new Error('Failed to generate district expansion proposals.');
    }
    return output;
  }
);
