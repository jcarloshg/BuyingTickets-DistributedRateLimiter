// Implements IEncryptionService using Node.js 'crypto' for password hash and comparison, with .env SALT
import { scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import type { IEncryptionService } from '../../models/services/IEncryptionService';
import dotenv from 'dotenv';

dotenv.config();
const SALT = process.env.SALT || 'default_demo_salt';

const scryptAsync = promisify(scrypt);

function hashPassword(password: string): Promise<string> {
  return scryptAsync(password, SALT, 64).then(buf => (buf as Buffer).toString('hex'));
}

export class EncryptionService implements IEncryptionService {
  async compare(hash: string, password: string): Promise<boolean> {
    const hashedAttempt = await hashPassword(password);
    return hash.length === hashedAttempt.length && timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(hashedAttempt, 'hex'));
  }
}
