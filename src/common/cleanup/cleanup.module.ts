import { Module } from '@nestjs/common';
import { FavoritesRepository } from 'src/db/favorites.repository';
import { CleanupService } from './cleanup.service';
import { TracksRepository } from 'src/db/tracks.repository';
import { AlbumsRepository } from 'src/db/albums.repository';

@Module({
  providers: [
    CleanupService,
    FavoritesRepository,
    TracksRepository,
    AlbumsRepository,
  ],
  exports: [CleanupService],
})
export class CleanupModule {}
