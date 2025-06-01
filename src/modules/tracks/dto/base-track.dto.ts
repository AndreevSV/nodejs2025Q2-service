import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class BaseTrackDto {
  @IsUUID()
  @IsNotEmpty()
  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsUUID()
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}
