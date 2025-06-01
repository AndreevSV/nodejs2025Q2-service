import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from 'src/db/favorites.repository';

@Injectable()
export class CleanupService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  removeTrackFromOtherResources(id: string) {
    const index = this.favoritesRepository.findTrackIndex(id);

    if (index !== -1) {
      this.favoritesRepository.removeTrack(index);
    }
  }

  removeAlbumFromOtherResources(id: string) {
    const index = this.favoritesRepository.findAlbumIndex(id);

    if (index !== -1) {
      this.favoritesRepository.removeAlbum(index);
    }
  }

  removeArtistFromOtherResources(id: string) {
    const index = this.favoritesRepository.findArtistIndex(id);

    if (index !== -1) {
      this.favoritesRepository.removeArtist(index);
    }
  }
}
