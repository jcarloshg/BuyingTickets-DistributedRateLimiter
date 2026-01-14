import { ILoginRepository, IUserLoginEntity } from '../models/ILoginRepository';

const users: IUserLoginEntity[] = [];

export class InMemoryLoginRepository implements ILoginRepository {
  async findUserByEmail(email: string): Promise<IUserLoginEntity | null> {
    return users.find(u => u.email === email) || null;
  }
}
