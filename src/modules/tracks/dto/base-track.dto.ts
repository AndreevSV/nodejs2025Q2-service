import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class BaseTrackDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  id: string; // uuid v4

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  albumId: string | null; // refers to Album

  @ApiProperty()
  @IsInt()
  duration: number; // integer number
}
