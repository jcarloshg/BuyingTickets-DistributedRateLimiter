import { Request, Response } from 'express';
import { LoginInputSchema } from '../../application/auth/login/models/LoginInput';
import { LoginUseCase } from '../../application/auth/login/application/LoginUseCase';
import { InMemoryLoginRepository } from '../../application/auth/login/infrastructure/InMemoryLoginRepository';
import { Argon2CryptoService } from '../../application/shared/infrastructure/Argon2CryptoService';
import { JwtTokenService } from '../../application/shared/infrastructure/JwtTokenService';

const loginRepo = new InMemoryLoginRepository();
const crypto = new Argon2CryptoService();
const tokenService = new JwtTokenService();
const useCase = new LoginUseCase(loginRepo, crypto, tokenService);

export async function loginController(req: Request, res: Response) {
  try {
    const input = LoginInputSchema.parse(req.body);
    const data = await useCase.execute(input);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(401).json({ error: err.message ?? 'Login failed' });
  }
}
