import argon2 from 'argon2';
import { ICryptoService } from '../models/ICryptoService';

export class Argon2CryptoService implements ICryptoService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password, { type: argon2.argon2id });
  }
  async verify(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}