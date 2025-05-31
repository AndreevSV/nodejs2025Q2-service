import { Injectable } from '@nestjs/common';
import { Album } from '../modules/albums/entities/album.entity';

@Injectable()
export class AlbumsRepository {
  private albums: Album[] = [];
}
