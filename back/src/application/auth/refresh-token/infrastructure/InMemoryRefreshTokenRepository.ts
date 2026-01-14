import { IRefreshTokenRepository, IRefreshTokenEntity } from '../models/IRefreshTokenRepository';
import { v4 as uuidv4 } from 'uuid';

const tokens: IRefreshTokenEntity[] = [];

export class InMemoryRefreshTokenRepository implements IRefreshTokenRepository {
  async findByToken(token: string): Promise<IRefreshTokenEntity | null> {
    return tokens.find(t => t.token === token && !t.revoked) || null;
  }
  async revokeToken(token: string): Promise<void> {
    const t = tokens.find(t => t.token === token);
    if (t) t.revoked = true;
  }
  async createToken(userId: string, token: string): Promise<IRefreshTokenEntity> {
    const tokenObj = {
      id: uuidv4(),
      userId,
      token,
      revoked: false,
      createdAt: new Date()
    };
    tokens.push(tokenObj);
    return tokenObj;
  }
}
