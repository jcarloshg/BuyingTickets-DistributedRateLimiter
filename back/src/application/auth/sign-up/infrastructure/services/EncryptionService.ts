// Implements IEncryptionService
import type { IEncryptionService } from '../../models/services/IEncryptionService.js';
export class EncryptionService implements IEncryptionService {
  async hash(password: string): Promise<string> {
    throw new Error('Method not implemented');
  }
  async compare(hash: string, password: string): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}
