import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../modules/artists/entities/artist.entity';

@Injectable()
export class ArtistsRepository {
  private artists: Artist[] = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Artist A',
      grammy: true,
    },
    {
      id: '11111111-1111-1111-1111-111111111112',
      name: 'Artist B',
      grammy: false,
    },
    {
      id: '11111111-1111-1111-1111-111111111113',
      name: 'Artist C',
      grammy: true,
    },
    {
      id: '11111111-1111-1111-1111-111111111114',
      name: 'Artist D',
      grammy: false,
    },
    {
      id: '11111111-1111-1111-1111-111111111115',
      name: 'Artist E',
      grammy: true,
    },
  ];

  create(artist: Artist): Artist {
    this.artists.push(artist);
    return artist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist | undefined {
    return this.artists.find((artist) => artist.id === id);
  }

  update(id: string, updatedArtist: Artist) {
    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.artists[index] = updatedArtist;

    return updatedArtist;
  }

  remove(index: number): void {
    this.artists.splice(index, 1);
  }

  findArtistIndexById(id: string): number {
    return this.artists.findIndex((artist) => artist.id === id);
  }
}
