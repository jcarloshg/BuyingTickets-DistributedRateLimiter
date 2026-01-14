import { IUserRepository, IUserEntity } from '../models/IUserRepository';
import { ISignUpInput } from '../models/SignUpInput';
import { v4 as uuidv4 } from 'uuid';
import { UsersInMemory } from '../../../shared/infrastructure/db/User.in-memory';

export class InMemoryUserRepository implements IUserRepository {
  async createUser(input: ISignUpInput, passwordHash: string): Promise<IUserEntity> {
    const user = {
      id: uuidv4(),
      email: input.email,
      passwordHash,
      createdAt: new Date(),
    };
    UsersInMemory.push(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<IUserEntity | null> {
    return UsersInMemory.find(u => u.email === email) || null;
  }
}
