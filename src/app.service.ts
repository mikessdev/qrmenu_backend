import { Injectable } from '@nestjs/common';
import { PreauthMiddleware } from './auth/preauth.middleware';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
