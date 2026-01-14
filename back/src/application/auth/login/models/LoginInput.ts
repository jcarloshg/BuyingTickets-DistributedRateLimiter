import { z } from 'zod';

export const LoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type ILoginInput = z.infer<typeof LoginInputSchema>;
