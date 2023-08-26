import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get(':uid')
  // async getAccesToken(@Param('uid') uid: string): Promise<string> {
  //   return await this.authService.getAccesToken(uid);
  // }
}
