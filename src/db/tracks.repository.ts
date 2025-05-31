import { Injectable } from '@nestjs/common';
import { Track } from '../modules/tracks/entities/track.entity';

@Injectable()
export class FavoritesRepository {
  private tracks: Track[] = [];
}
