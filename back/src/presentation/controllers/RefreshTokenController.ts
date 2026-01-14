import { Request, Response } from 'express';
import { RefreshTokenInputSchema } from '../../application/auth/refresh-token/models/RefreshTokenInput';
import { RefreshTokenUseCase } from '../../application/auth/refresh-token/application/RefreshTokenUseCase';
import { InMemoryRefreshTokenRepository } from '../../application/auth/refresh-token/infrastructure/InMemoryRefreshTokenRepository';
import { JwtTokenService } from '../../application/shared/infrastructure/JwtTokenService';
import { UuidRefreshTokenService } from '../../application/shared/infrastructure/UuidRefreshTokenService';

const refreshTokenRepo = new InMemoryRefreshTokenRepository();
const tokenService = new JwtTokenService();
const uuidSrv = new UuidRefreshTokenService();

const issueAuthPair = (userId: string) => {
  const accessToken = tokenService.issueToken({ userId });
  const refreshToken = uuidSrv.issue();
  return { accessToken, refreshToken };
};

const useCase = new RefreshTokenUseCase(refreshTokenRepo, { issueAuthPair });

export async function refreshTokenController(req: Request, res: Response) {
  try {
    const input = RefreshTokenInputSchema.parse(req.body);
    const tokens = await useCase.execute(input);
    res.status(200).json(tokens);
  } catch (err: any) {
    res.status(401).json({ error: err.message ?? 'Refresh failed' });
  }
}
