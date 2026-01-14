import { IUserRepository, IUserEntity } from '../models/IUserRepository';
import { ISignUpInput } from '../models/SignUpInput';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryUserRepository implements IUserRepository {
  private users: IUserEntity[] = [];

  async createUser(input: ISignUpInput, passwordHash: string): Promise<IUserEntity> {
    const user = {
      id: uuidv4(),
      email: input.email,
      passwordHash,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<IUserEntity | null> {
    return this.users.find(u => u.email === email) || null;
  }
}
