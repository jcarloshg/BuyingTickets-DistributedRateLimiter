import { Request, Response } from 'express';
import { SignUpUseCase } from '../../../application/auth/sign-up/application/SignUpUseCase';
import { UserRepoInMemory } from '../../../application/auth/sign-up/infrastructure/db/UserRepo.in-memory';
import { EncryptionService } from '../../../application/shared/infrastructure/services/EncryptionService';

export class SignUpController {
  private signUpUseCase: SignUpUseCase;

  constructor() {
    const userRepoInMemory = new UserRepoInMemory();
    const encryptionService = new EncryptionService();
    this.signUpUseCase = new SignUpUseCase(userRepoInMemory, encryptionService);
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
