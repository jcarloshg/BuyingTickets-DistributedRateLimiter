import { Request, Response } from 'express';
import { LoginUseCase } from '../../application/auth/login/application/LoginUseCase';
import { UserRepository } from '../../application/auth/login/infrastructure/db/UserRepository';
import { EncryptionService } from '../../application/auth/login/infrastructure/services/EncryptionService';

export class LoginController {
  private loginUseCase: LoginUseCase;

  constructor() {
    this.loginUseCase = new LoginUseCase(new UserRepository(), new EncryptionService());
  }

  async handle(req: Request, res: Response) {
    try {
      const result = await this.loginUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
