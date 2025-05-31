import { Injectable } from '@nestjs/common';
import { Favourites } from '../modules/favourites/entities/favourites.entity';

@Injectable()
export class FavoritesRepository {
  private favourites: Favourites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
