export class CreateUserDto {
  readonly id: string;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly phoneNumber: string;
}
