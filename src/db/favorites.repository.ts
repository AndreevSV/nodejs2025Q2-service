import { Injectable } from '@nestjs/common';
import { Favorites } from '../modules/favourites/entities/favorites.entity';

@Injectable()
export class FavoritesRepository {
  private favorites: Favorites = {
    artists: [
      '11111111-1111-1111-1111-111111111111',
      '11111111-1111-1111-1111-111111111113',
    ],
    albums: [
      '22222222-2222-2222-2222-222222222221',
      '22222222-2222-2222-2222-222222222223',
    ],
    tracks: [
      '33333333-3333-3333-3333-333333333331',
      '33333333-3333-3333-3333-333333333333',
    ],
  };

  findAll(): Favorites {
    return this.favorites;
  }

  addTrack(id: string): string {
    this.favorites.tracks.push(id);
    return id;
  }

  removeTrack(index: number): void {
    this.favorites.tracks.splice(index, 1);
  }

  addAlbum(id: string): string {
    this.favorites.albums.push(id);
    return id;
  }

  removeAlbum(index: number): void {
    this.favorites.albums.splice(index, 1);
  }

  addArtist(id: string): string {
    this.favorites.artists.push(id);
    return id;
  }

  removeArtist(index: number): void {
    this.favorites.artists.splice(index, 1);
  }

  findTrackIndex(id: string) {
    return this.favorites.tracks.findIndex((trackId) => trackId === id);
  }

  findAlbumIndex(id: string) {
    return this.favorites.albums.findIndex((albumId) => albumId === id);
  }

  findArtistIndex(id: string) {
    return this.favorites.artists.findIndex((artistId) => artistId === id);
  }
}
