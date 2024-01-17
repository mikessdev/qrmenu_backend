import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from '@services/app.service';

@ApiTags('app')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  @ApiResponse({ status: 200, type: String })
  getHello(): string {
    return 'Hello World!';
  }
}
