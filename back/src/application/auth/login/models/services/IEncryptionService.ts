// IEncryptionService: Contract Only - No Logic
export interface IEncryptionService {
  compare(hash: string, password: string): Promise<boolean>;
}
