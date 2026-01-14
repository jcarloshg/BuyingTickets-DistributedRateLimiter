export interface IJwtService {
  sign(payload: object): string;
}
