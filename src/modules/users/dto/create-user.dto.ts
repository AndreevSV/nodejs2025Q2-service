import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
