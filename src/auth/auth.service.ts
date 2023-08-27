import { Injectable } from '@nestjs/common';
import { AccessToken, AuthMiddleware } from './auth.middleware';

@Injectable()
export class AuthService {
  private readonly preauthMiddleware = new AuthMiddleware();
  async getAccesToken(uid: string): Promise<AccessToken> {
    return await this.preauthMiddleware.getAccesToken(uid);
  }
}
