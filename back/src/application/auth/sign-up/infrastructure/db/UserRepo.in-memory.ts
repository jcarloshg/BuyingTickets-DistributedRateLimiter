// In-memory implementation of IUserRepository using UserInMemory singleton
import type { IUserRepository } from '../../models/db/IUserRepository';
import type { User } from '../../../sign-up/models/entities/User';
import { UserInMemory } from '../../../../shared/db/in-memory/UserInMemory';

export class UserRepoInMemory implements IUserRepository {

  private db = UserInMemory.getInstance();

  async findByEmail(email: string): Promise<User | null> {
    const user = this.db.findByEmail(email);
    return user ? user : null;
  }

  async create(user: User): Promise<void> {
    this.db.add(user);
  }

}
