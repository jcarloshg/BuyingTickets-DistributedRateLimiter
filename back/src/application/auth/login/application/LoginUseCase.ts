// Depends ONLY on models (ports/interfaces/contracts)
import type { IUserRepository } from '../models/db/IUserRepository';
import type { IEncryptionService } from '../models/services/IEncryptionService';
import type { LoginInput } from '../models/entities/LoginInput';

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService
  ) {}

  async execute(input: LoginInput) {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new Error('Invalid credentials');
    const valid = await this.encryptionService.compare(user.passwordHash, input.password);
    if (!valid) throw new Error('Invalid credentials');
    return { email: user.email, fullName: user.fullName };
  }
}
