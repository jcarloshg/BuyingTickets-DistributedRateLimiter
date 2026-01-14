import { Request, Response } from 'express';
import { SignUpUseCase } from '../../../application/auth/sign-up/application/SignUpUseCase';
import { EncryptionService } from '../../../application/auth/login/infrastructure/services/EncryptionService';
import { UserRepoInMemory } from '../../../application/auth/sign-up/infrastructure/db/UserRepo.in-memory';

export class SignUpController {
  private signUpUseCase: SignUpUseCase;

  constructor() {
    const userRepoInMemory = new UserRepoInMemory();
    this.signUpUseCase = new SignUpUseCase(userRepoInMemory, new EncryptionService());
  }

  async handle(req: Request, res: Response) {
    try {
      const user = await this.signUpUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
