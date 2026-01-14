import { z } from 'zod';

export const RefreshTokenInputSchema = z.object({
  refreshToken: z.string().uuid(),
});

export type IRefreshTokenInput = z.infer<typeof RefreshTokenInputSchema>;
