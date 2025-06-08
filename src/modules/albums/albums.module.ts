import { Module } from '@nestjs/common';
import { CleanupModule } from 'src/common/cleanup/cleanup.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [CleanupModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
