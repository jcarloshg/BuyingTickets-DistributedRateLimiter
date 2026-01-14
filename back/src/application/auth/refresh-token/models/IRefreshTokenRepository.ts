import { z } from 'zod';
import { IRefreshTokenInput } from './RefreshTokenInput';

export interface IRefreshTokenEntity {
  id: string;
  userId: string;
  token: string;
  revoked: boolean;
  createdAt: Date;
}

export interface IRefreshTokenRepository {
  findByToken(token: string): Promise<IRefreshTokenEntity | null>;
  revokeToken(token: string): Promise<void>;
  createToken(userId: string, token: string): Promise<IRefreshTokenEntity>;
}