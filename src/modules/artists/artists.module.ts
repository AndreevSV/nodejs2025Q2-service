import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from 'src/db/artists.repository';
import { CleanupModule } from 'src/common/cleanup/cleanup.module';

@Module({
  imports: [CleanupModule],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsRepository],
  exports: [ArtistsService],
})
export class ArtistsModule {}
