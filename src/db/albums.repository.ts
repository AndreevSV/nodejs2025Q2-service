import { Injectable } from '@nestjs/common';
import { Album } from '../modules/albums/entities/album.entity';
import { BaseAlbumDto } from 'src/modules/albums/dto/base-album.dto';

@Injectable()
export class AlbumsRepository {
  private albums: Album[] = [
    {
      id: '22222222-2222-2222-2222-222222222221',
      name: 'Album A',
      year: 2020,
      artistId: '11111111-1111-1111-1111-111111111111',
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Album B',
      year: 2021,
      artistId: '11111111-1111-1111-1111-111111111112',
    },
    {
      id: '22222222-2222-2222-2222-222222222223',
      name: 'Album C',
      year: 2022,
      artistId: '11111111-1111-1111-1111-111111111113',
    },
    {
      id: '22222222-2222-2222-2222-222222222224',
      name: 'Album D',
      year: 2023,
      artistId: '11111111-1111-1111-1111-111111111114',
    },
    {
      id: '22222222-2222-2222-2222-222222222225',
      name: 'Album E',
      year: 2024,
      artistId: '11111111-1111-1111-1111-111111111115',
    },
  ];

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
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
