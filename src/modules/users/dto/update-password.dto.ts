import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}
