import { OmitType } from '@nestjs/mapped-types';
import { BaseTrackDto } from './base-track.dto';

export class CreateTrackDto extends OmitType(BaseTrackDto, ['id']) {}
