import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class User {
  @IsUUID()
  @IsNotEmpty()
  id: string; // uuid v4
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsInt()
  @IsNotEmpty()
  version: number; // integer number, increments on update
  @IsInt()
  @IsNotEmpty()
  createdAt: number; // timestamp of creation
  @IsInt()
  @IsNotEmpty()
  updatedAt: number; // timestamp of last update
}
