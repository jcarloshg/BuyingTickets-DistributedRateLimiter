// Implements IEncryptionService
import type { IEncryptionService } from '../../models/services/IEncryptionService';
export class EncryptionService implements IEncryptionService {
  async compare(hash: string, password: string): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}
