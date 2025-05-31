import { Injectable } from '@nestjs/common';
import { Artist } from '../modules/artists/entities/artist.entity';

@Injectable()
export class ArtistsRepository {
  private artists: Artist[] = [];
}
