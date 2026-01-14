import jwt from 'jsonwebtoken';
import { ITokenService } from '../models/ITokenService';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme-this-is-insecure';

export class JwtTokenService implements ITokenService {
  issueToken(payload: any): string {
    return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: '15m' });
  }
  verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET);
  }
}
