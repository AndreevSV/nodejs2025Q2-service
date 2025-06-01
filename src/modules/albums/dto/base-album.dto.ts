import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class BaseAlbumDto {
  @IsUUID()
  @IsNotEmpty()
  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist
}
