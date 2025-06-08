import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty()
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @ApiProperty()
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}
