import { z } from 'zod';
export const signUpInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(1)
});
export type SignUpInput = z.infer<typeof signUpInputSchema>;
