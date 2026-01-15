import { z } from 'zod';

// Input for paying tickets
export const PayTicketInputSchema = z.object({
  ticketUuids: z.array(z.string().uuid()),
  // userToken: z.string(), // JWT, validated by middleware
  creditCard: z.string().min(12).max(19), // Basic length check
});

export type PayTicketInput = z.infer<typeof PayTicketInputSchema>;
