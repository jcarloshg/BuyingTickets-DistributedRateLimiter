import { Request, Response } from 'express';
import { SignUpUseCase } from '../../application/auth/sign-up/application/SignUpUseCase';
import { UserRepository } from '../../application/auth/sign-up/infrastructure/db/UserRepository';
import { EncryptionService } from '../../application/auth/sign-up/infrastructure/services/EncryptionService';

export class SignUpController {
  private signUpUseCase: SignUpUseCase;

  constructor() {
    this.signUpUseCase = new SignUpUseCase(new UserRepository(), new EncryptionService());
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
