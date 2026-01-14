// IEncryptionService: Shared interface for encryption implementations
export interface IEncryptionService {
    hash(password: string): Promise<string>;
    compare(hash: string, password: string): Promise<boolean>;
}
