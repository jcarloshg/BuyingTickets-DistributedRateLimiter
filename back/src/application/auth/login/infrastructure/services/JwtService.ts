import jwt from 'jsonwebtoken';
import { IJwtService } from '../../models/services/IJwtService';

const JWT_SECRET = process.env.JWT_SECRET || "super-secure-dev-secret";

export class JwtService implements IJwtService {
  sign(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  }
}
