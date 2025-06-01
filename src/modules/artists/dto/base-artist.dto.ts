import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BaseArtistDto {
  @IsUUID()
  @IsNotEmpty()
  id: string; // uuid v4

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
