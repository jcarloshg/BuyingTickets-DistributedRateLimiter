import { Request, Response } from 'express';
import { SignUpUseCase } from '../../application/auth/sign-up/application/SignUpUseCase';
import { LoginUseCase } from '../../application/auth/login/application/LoginUseCase';
import { UserRepository as SignUpUserRepo } from '../../application/auth/sign-up/infrastructure/db/UserRepository';
import { EncryptionService as SignUpEncService } from '../../application/auth/sign-up/infrastructure/services/EncryptionService';
import { UserRepository as LoginUserRepo } from '../../application/auth/login/infrastructure/db/UserRepository';
import { EncryptionService as LoginEncService } from '../../application/auth/login/infrastructure/services/EncryptionService';

export class AuthController {
  private signUpUseCase: SignUpUseCase;
  private loginUseCase: LoginUseCase;

  constructor() {
    this.signUpUseCase = new SignUpUseCase(new SignUpUserRepo(), new SignUpEncService());
    this.loginUseCase = new LoginUseCase(new LoginUserRepo(), new LoginEncService());
  }

  async signUp(req: Request, res: Response) {
    try {
      const user = await this.signUpUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await this.loginUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
