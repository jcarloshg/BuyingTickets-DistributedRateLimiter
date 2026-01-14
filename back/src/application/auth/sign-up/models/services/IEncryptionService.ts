// IEncryptionService: Contract Only - No Logic
export interface IEncryptionService {
  hash(password: string): Promise<string>;
  compare(hash: string, password: string): Promise<boolean>;
}
