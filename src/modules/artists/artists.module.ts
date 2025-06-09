import { Module } from '@nestjs/common';
import { CleanupModule } from 'src/common/cleanup/cleanup.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [CleanupModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
