import { Injectable } from '@nestjs/common';
import { AlbumsRepository } from 'src/db/albums.repository';
import { FavoritesRepository } from 'src/db/favorites.repository';
import { TracksRepository } from 'src/db/tracks.repository';

@Injectable()
export class CleanupService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly tracksRepository: TracksRepository,
    private readonly albumsRepository: AlbumsRepository,
  ) {}

  removeTrackFromOtherResources(idTrack: string) {
    const index = this.favoritesRepository.findTrackIndex(idTrack);

    if (index !== -1) {
      this.favoritesRepository.removeTrack(index);
    }
  }

  removeAlbumFromOtherResources(idAlbum: string) {
    const indexAlbum = this.favoritesRepository.findAlbumIndex(idAlbum);

    if (indexAlbum !== -1) {
      this.favoritesRepository.removeAlbum(indexAlbum);
    }
    this.tracksRepository.removeAlbumFromTrack(idAlbum);
  }

  removeArtistFromOtherResources(idArtist: string) {
    const index = this.favoritesRepository.findArtistIndex(idArtist);

    if (index !== -1) {
      this.favoritesRepository.removeArtist(index);
    }
    this.tracksRepository.removeArtistFromTrack(idArtist);
    this.albumsRepository.removeArtistFromAlbum(idArtist);
  }
}
