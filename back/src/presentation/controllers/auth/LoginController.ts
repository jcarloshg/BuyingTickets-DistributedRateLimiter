import { Request, Response } from 'express';
import { LoginUseCase } from '../../../application/auth/login/application/LoginUseCase';
import { UserRepoInMemory } from '../../../application/auth/login/infrastructure/db/UserRepo.in-memory';
import { EncryptionService } from '../../../application/shared/infrastructure/services/EncryptionService';

export class LoginController {
  private loginUseCase: LoginUseCase;

  constructor() {
    const userRepoInMemory = new UserRepoInMemory();
    const encryptionService = new EncryptionService();
    this.loginUseCase = new LoginUseCase(userRepoInMemory, encryptionService);
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
