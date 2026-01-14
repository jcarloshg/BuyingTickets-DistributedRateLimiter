import { z } from 'zod';
export const userSchema = z.object({
  email: z.string().email(),
  passwordHash: z.string(),
  fullName: z.string(),
});
export type User = z.infer<typeof userSchema>;
