import { Global, Module } from '@nestjs/common';
import { AlbumsRepository } from './albums.repository';
import { ArtistsRepository } from './artists.repository';
import { FavoritesRepository } from './favorites.repository';
import { TracksRepository } from './tracks.repository';

@Global()
@Module({
  providers: [
    AlbumsRepository,
    ArtistsRepository,
    FavoritesRepository,
    TracksRepository,
  ],
  exports: [
    AlbumsRepository,
    ArtistsRepository,
    FavoritesRepository,
    TracksRepository,
  ],
})
export class DbModule {}
