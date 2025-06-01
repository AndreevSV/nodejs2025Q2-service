import { Injectable } from '@nestjs/common';
import { Favorites } from '../modules/favourites/entities/favorites.entity';

@Injectable()
export class FavoritesRepository {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
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
