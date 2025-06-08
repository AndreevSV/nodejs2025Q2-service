import { Injectable } from '@nestjs/common';
import { Album } from '../modules/albums/entities/album.entity';
import { BaseAlbumDto } from 'src/modules/albums/dto/base-album.dto';

@Injectable()
export class AlbumsRepository {
  private albums: Album[] = [];

  create(albumDto: BaseAlbumDto): BaseAlbumDto {
    this.albums.push(albumDto);
    return albumDto;
  }

  findAll(): BaseAlbumDto[] {
    return this.albums;
  }

  findOne(id: string): BaseAlbumDto {
    const album = this.albums.find((album) => album.id === id);
    return album;
  }

  update(index: number, albumDto: BaseAlbumDto): BaseAlbumDto {
    this.albums[index] = albumDto;
    return albumDto;
  }

  remove(index: number): void {
    this.albums.splice(index, 1);
  }

  findIndexById(id: string): number {
    const index = this.albums.findIndex((album) => album.id === id);
    return index;
  }

  removeArtistFromAlbum(artistId: string) {
    this.albums = this.albums.map((album) => {
      if (album.artistId === artistId) {
        return {
          ...album,
          artistId: null,
        };
      }
      return album;
    });
  }
}
