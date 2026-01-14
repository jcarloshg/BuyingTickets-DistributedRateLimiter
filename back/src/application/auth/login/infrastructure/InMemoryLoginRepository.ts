import { ILoginRepository, IUserLoginEntity } from '../models/ILoginRepository';
import { UsersInMemory } from '../../../shared/infrastructure/db/User.in-memory';

export class InMemoryLoginRepository implements ILoginRepository {
  async findUserByEmail(email: string): Promise<IUserLoginEntity | null> {
    return UsersInMemory.find(u => u.email === email) || null;
  }
}
