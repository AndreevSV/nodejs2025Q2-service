import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksRepository } from 'src/db/tracks.repository';
import { CleanupModule } from 'src/common/cleanup/cleanup.module';

@Module({
  imports: [CleanupModule],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  exports: [TracksService],
})
export class TracksModule {}
