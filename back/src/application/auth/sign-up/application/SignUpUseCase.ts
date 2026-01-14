import { IUserRepository } from '../models/IUserRepository';
import { ISignUpInput } from '../models/SignUpInput';

export class SignUpUseCase {
  constructor(private userRepo: IUserRepository, private passwordHasher: { hash: (pw: string) => Promise<string> }) {}

  async execute(input: ISignUpInput): Promise<{ id: string; email: string }> {
    const emailTaken = await this.userRepo.findUserByEmail(input.email);
    if (emailTaken) throw new Error('Email is already registered');
    const hash = await this.passwordHasher.hash(input.password);
    const user = await this.userRepo.createUser(input, hash);
    return { id: user.id, email: user.email };
  }
}
