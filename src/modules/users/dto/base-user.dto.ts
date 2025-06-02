import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  id: string; // uuid v4

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  version: number; // integer number, increments on update

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  createdAt: number; // timestamp of creation

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  updatedAt: number; // timestamp of last update
}
