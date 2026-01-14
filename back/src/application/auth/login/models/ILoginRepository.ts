import { z } from 'zod';
import { ILoginInput } from './LoginInput';

export interface IUserLoginEntity {
  id: string;
  email: string;
  passwordHash: string;
}

export interface ILoginRepository {
  findUserByEmail(email: string): Promise<IUserLoginEntity | null>;
}