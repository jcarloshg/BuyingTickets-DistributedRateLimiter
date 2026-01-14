import { z } from 'zod';
import { SignUpInputSchema, ISignUpInput } from './SignUpInput';

export interface IUserEntity {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

// Port: Interface for User storage
export interface IUserRepository {
  createUser(user: ISignUpInput, passwordHash: string): Promise<IUserEntity>;
  findUserByEmail(email: string): Promise<IUserEntity | null>;
}
