// Depends ONLY on models (ports/interfaces/contracts)
import type { IUserRepository } from '../models/db/IUserRepository';
import type { LoginInput } from '../models/entities/LoginInput';
import { IEncryptionService } from '../../../shared/models/services/IEncryptionService';
import { IJwtService } from '../models/services/IJwtService';

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService,
    private jwtService: IJwtService
  ) { }

  async execute(input: LoginInput) {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new Error('Invalid credentials');
    const valid = await this.encryptionService.compare(user.passwordHash, input.password);
    if (!valid) throw new Error('Invalid credentials');
    // JWT creation
    const token = this.jwtService.sign({ sub: user.email, fullName: user.fullName });
    return { token, email: user.email, fullName: user.fullName };
  }
}
