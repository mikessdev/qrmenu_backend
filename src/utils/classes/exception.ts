import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ValidationError, UniqueConstraintError } from 'sequelize';

export class Exception {
  static handler(error: ValidationError | UniqueConstraintError | Error) {
    if (error instanceof ValidationError) {
      throw new BadRequestException(
        error.errors.map((err: any) => err.message).join(', '),
      );
    }

    if (error instanceof UniqueConstraintError) {
      throw new BadRequestException('A item with this data already exists.');
    }

    if (error instanceof Error) {
      throw new BadRequestException(error.message);
    }

    throw new InternalServerErrorException('An unexpected error occurred.');
  }
}
