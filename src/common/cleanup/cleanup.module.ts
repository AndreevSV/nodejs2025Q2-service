import { Module } from '@nestjs/common';
import { FavoritesRepository } from 'src/db/favorites.repository';
import { CleanupService } from './cleanup.service';

@Module({
  providers: [CleanupService, FavoritesRepository],
  exports: [CleanupService],
})
export class CleanupModule {}
