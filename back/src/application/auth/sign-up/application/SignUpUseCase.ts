// Depends ONLY on models (ports/interfaces/contracts)
import { IEncryptionService } from '../../../shared/models/services/IEncryptionService';
import type { IUserRepository } from '../models/db/IUserRepository';
import type { SignUpInput } from '../models/entities/SignUpInput';
import { userSchema } from '../models/entities/User';

export class SignUpUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService
  ) { }

  async execute(input: SignUpInput) {
    userSchema.parse({ ...input, passwordHash: 'dummy' }); // parse basic input
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) throw new Error('User already exists');
    const passwordHash = await this.encryptionService.hash(input.password);
    const newUser = {
      email: input.email,
      passwordHash,
      fullName: input.fullName,
    };
    await this.userRepository.create(newUser);
    return { email: newUser.email, fullName: newUser.fullName };
  }
}
