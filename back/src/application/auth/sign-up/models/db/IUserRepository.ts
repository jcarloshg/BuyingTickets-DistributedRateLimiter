// IUserRepository: Contract Only - No Logic
export interface IUserRepository {
  findByEmail(email: string): Promise<any>;
  create(user: any): Promise<void>;
}
