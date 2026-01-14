import { v4 as uuidv4 } from 'uuid';
export class UuidRefreshTokenService {
  issue(): string {
    return uuidv4();
  }
}
