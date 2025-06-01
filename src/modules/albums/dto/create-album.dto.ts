import { OmitType } from '@nestjs/mapped-types';
import { BaseAlbumDto } from './base-album.dto';

export class CreateAlbumDto extends OmitType(BaseAlbumDto, ['id']) {}
