import { Request, Response } from 'express';
import { SignUpInputSchema } from '../../application/auth/sign-up/models/SignUpInput';
import { SignUpUseCase } from '../../application/auth/sign-up/application/SignUpUseCase';
import { InMemoryUserRepository } from '../../application/auth/sign-up/infrastructure/InMemoryUserRepository';
import { Argon2CryptoService } from '../../application/shared/infrastructure/Argon2CryptoService';

const userRepo = new InMemoryUserRepository();
const hasher = new Argon2CryptoService();
const useCase = new SignUpUseCase(userRepo, hasher);

export async function signUpController(req: Request, res: Response) {
  try {
    const input = SignUpInputSchema.parse(req.body);
    const user = await useCase.execute(input);
    res.status(201).json({ user });
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? 'Sign up failed' });
  }
}
