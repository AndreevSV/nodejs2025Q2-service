import { OmitType } from '@nestjs/mapped-types';
import { BaseArtistDto } from './base-artist.dto';

export class CreateArtistDto extends OmitType(BaseArtistDto, ['id']) {}
