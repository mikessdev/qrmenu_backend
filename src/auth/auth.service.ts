import { Injectable } from '@nestjs/common';
import { PreauthMiddleware } from './preauth.middleware';

@Injectable()
export class AuthService {
  // private readonly preauthMiddleware = new PreauthMiddleware();
  // async getAccesToken(uid: string): Promise<string> {
  //   return await this.preauthMiddleware.getAccesToken(uid);
  // }
}
