// IUserRepository: Contract Only - No Logic
export interface IUserRepository {
  findByEmail(email: string): Promise<any>;
}
