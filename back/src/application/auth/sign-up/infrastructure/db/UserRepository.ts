// Implements IUserRepository
import type { IUserRepository } from '../../models/db/IUserRepository';
export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<any> {
    throw new Error('Method not implemented');
  }
  async create(user: any): Promise<void> {
    throw new Error('Method not implemented');
  }
}
