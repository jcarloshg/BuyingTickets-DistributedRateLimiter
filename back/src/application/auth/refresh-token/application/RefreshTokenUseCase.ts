import { IRefreshTokenRepository } from '../models/IRefreshTokenRepository';
import { IRefreshTokenInput } from '../models/RefreshTokenInput';

export class RefreshTokenUseCase {
  constructor(
    private refreshTokenRepo: IRefreshTokenRepository,
    private tokenService: {
      issueAuthPair: (userId: string) => { accessToken: string; refreshToken: string }
    }
  ) {}
  async execute(input: IRefreshTokenInput): Promise<{ accessToken: string; refreshToken: string }> {
    // 1. Validate refresh token exists and is not revoked
    const dbToken = await this.refreshTokenRepo.findByToken(input.refreshToken);
    if (!dbToken) throw new Error('Invalid or expired refresh token');
    // 2. Rotate – revoke old, generate+persist new, return pair
    await this.refreshTokenRepo.revokeToken(input.refreshToken);
    const { accessToken, refreshToken } = this.tokenService.issueAuthPair(dbToken.userId);
    await this.refreshTokenRepo.createToken(dbToken.userId, refreshToken);
    return { accessToken, refreshToken };
  }
}
