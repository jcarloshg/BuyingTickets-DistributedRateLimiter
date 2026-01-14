import { z } from 'zod';

// DTO validation schema
export const SignUpInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type ISignUpInput = z.infer<typeof SignUpInputSchema>;
