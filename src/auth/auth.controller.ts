import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessToken } from './auth.middleware';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getAccesToken(@Query('uid') uid: string): Promise<AccessToken> {
    return await this.authService.getAccesToken(uid);
  }
}
