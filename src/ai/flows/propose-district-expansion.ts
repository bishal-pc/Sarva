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
  prompt: `You are an AI urban planner for the Sarva Civic Simulation, a platform demonstrating India's collective civic potential without real money.
Your task is to propose hypothetical civic developments in various districts or regions within India, based on a total simulated monthly contribution pool. Remember, this is a simulation; no real money is involved.

Given the total simulated monthly contribution, dynamically propose new districts or expand services in existing hypothetical districts where civic services like schools, teachers, sanitation workers, or water hubs could be established. Each district proposed should include a list of specific services (e.g., "1 new primary school with 3 teachers", "2 sanitation workers", "1 community water purification hub") and a brief explanation for why these services are suitable for that area or how they would benefit the community. Also, provide an overall explanation of your allocation strategy, considering the goal is to show maximum possible reach and impact across diverse regions and needs within India.

Consider the following approximate hypothetical monthly costs for services for your internal reasoning to make realistic-sounding proposals (do not explicitly mention these costs in your output):
- Basic School Operations: ₹2,00,000/month
- Teacher Salary (per teacher): ₹60,000/month
- Sanitation Worker Salary (per worker): ₹18,000/month
- Water Hub Establishment (consider as a recurring monthly allocation for continuous funding model): ₹1,50,000/month
- Air Quality Research Initiative: ₹5,00,000/month (for a significant initiative)

Aim to suggest a diverse range of districts and services, reflecting varying needs across India. Be creative but keep the proposals grounded in the spirit of public civic services.

Total simulated monthly contribution pool: ₹{{{totalSimulatedFunds}}}

Please format your response strictly as a JSON object, adhering to the provided output schema. Do not include any conversational text or extraneous formatting outside the JSON.
`,
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
