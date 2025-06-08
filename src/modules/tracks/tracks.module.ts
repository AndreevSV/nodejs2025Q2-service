import { Module } from '@nestjs/common';
import { CleanupModule } from 'src/common/cleanup/cleanup.module';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [CleanupModule],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
