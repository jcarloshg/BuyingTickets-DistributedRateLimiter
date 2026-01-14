import { ILoginRepository } from '../models/ILoginRepository';
import { ILoginInput } from '../models/LoginInput';

export class LoginUseCase {
  constructor(
    private userRepo: ILoginRepository,
    private passwordVerifier: { verify: (hash: string, pw: string) => Promise<boolean> },
    private tokenService: { issueToken: (payload: any) => string }
  ) {}

  async execute(input: ILoginInput): Promise<{ accessToken: string }> {
    const user = await this.userRepo.findUserByEmail(input.email);
    if (!user) throw new Error('Invalid credentials');
    const ok = await this.passwordVerifier.verify(user.passwordHash, input.password);
    if (!ok) throw new Error('Invalid credentials');
    const token = this.tokenService.issueToken({ userId: user.id, email: user.email });
    return { accessToken: token };
  }
}
