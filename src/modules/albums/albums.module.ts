import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from 'src/db/albums.repository';
import { CleanupModule } from 'src/common/cleanup/cleanup.module';

@Module({
  imports: [CleanupModule],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository],
  exports: [AlbumsService],
})
export class AlbumsModule {}
