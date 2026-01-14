// Singleton in-memory user database
import type { User } from '../../../auth/sign-up/models/entities/User';

export class UserInMemory {
  private static instance: UserInMemory;
  private users: User[] = [];

  private constructor() {}

  static getInstance(): UserInMemory {
    if (!UserInMemory.instance) {
      UserInMemory.instance = new UserInMemory();
    }
    return UserInMemory.instance;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  add(user: User): void {
    this.users.push(user);
  }

  clear(): void {
    this.users = [];
  }

  all(): User[] {
    return [...this.users];
  }
}
