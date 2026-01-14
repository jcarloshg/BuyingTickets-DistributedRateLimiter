// Implements IEncryptionService using Node.js 'crypto' for password hash and comparison
import { scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import type { IEncryptionService } from '../../models/services/IEncryptionService';

const scryptAsync = promisify(scrypt);
const SALT = 'app-static-salt'; // For demo, use a unique salt per-user in production.

function hashPassword(password: string): Promise<string> {
  return scryptAsync(password, SALT, 64).then(buf => (buf as Buffer).toString('hex'));
}

export class EncryptionService implements IEncryptionService {
  async compare(hash: string, password: string): Promise<boolean> {
    const hashedAttempt = await hashPassword(password);
    // Use timingSafeEqual to mitigate timing attacks
    return hash.length === hashedAttempt.length && timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(hashedAttempt, 'hex'));
  }
}
