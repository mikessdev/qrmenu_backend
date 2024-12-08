import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Query,
} from '@nestjs/common';
import { UsersService } from '@services/users.service';
import { CreateUserDto } from '@dtos/create/create-user.dto';
import { UpdateUserDto } from '@dtos/update/update-user.dto';
import {
  ApiBody,
  ApiHeader,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Status } from '@utils/enum/status.enum';
import { Response } from 'express';
import {
  UserApiResponse,
  UserUpdateApiResponse,
} from '@utils/swagger/apiResponse/user.api.response';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserApiResponse,
  })
  async findOne(@Res() response: Response, @Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (user.status === Status.SUCCESS) {
      return response.status(HttpStatus.OK).send(JSON.stringify(user));
    }
    if (user.status === Status.FAILED) {
      return response.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(user));
    }
  }

  @Get()
  @ApiQuery({
    name: 'firebaseId',
    description: 'ID of the firebase user',
    type: String,
    required: true,
    example: '88b7fedf-59fa-4b02-875d-4345bb74c186',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserApiResponse,
  })
  async findOneByFirebaseId(
    @Res() response: Response,
    @Query('firebaseId') firebaseId: string,
  ) {
    const user = await this.usersService.findOneByFirebaseId(firebaseId);

    if (user) {
      return response.status(HttpStatus.OK).send(JSON.stringify(user));
    }

    return response.status(HttpStatus.NOT_FOUND).send(JSON.stringify({}));
  }

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserApiResponse,
  })
  async create(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user = await this.usersService.create(createUserDto);
    if (user.status === Status.SUCCESS) {
      return response.status(HttpStatus.CREATED).send(JSON.stringify(user));
    }
    if (user.status === Status.FAILED) {
      return response.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(user));
    }
  }

  @Patch(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserUpdateApiResponse,
  })
  async update(
    @Res() response: Response,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.usersService.update(id, updateUserDto);
    if (result.status === Status.SUCCESS) {
      return response.status(HttpStatus.OK).send(JSON.stringify(result));
    }
    if (result.status === Status.FAILED) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(JSON.stringify(result));
    }
  }

  @Delete(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async remove(@Res() response: Response, @Param('id') id: number) {
    const result = await this.usersService.remove(id);
    if (result.status === Status.SUCCESS) {
      return response.status(HttpStatus.NO_CONTENT).send();
    }
    if (result.status === Status.FAILED) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(JSON.stringify(result));
    }
  }
}
