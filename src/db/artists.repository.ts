import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../modules/artists/entities/artist.entity';

@Injectable()
export class ArtistsRepository {
  private artists: Artist[] = [];

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
    let index = this.artists.findIndex((artist) => artist.id === id);

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
