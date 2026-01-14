export interface ITokenService {
  issueToken(payload: any): string;
  verifyToken(token: string): any;
}

export interface IAuthPairService {
  issueAuthPair(userId: string): { accessToken: string; refreshToken: string };
}