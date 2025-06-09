import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../modules/tracks/entities/track.entity';

@Injectable()
export class TracksRepository {
  private tracks: Track[] = [];

  create(track: Track): Track {
    this.tracks.push(track);
    return track;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track | undefined {
    return this.tracks.find((track) => track.id === id);
  }

  update(id: string, updatedTrack: Track) {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.tracks[index] = updatedTrack;

    return updatedTrack;
  }

  remove(index: number): void {
    this.tracks.splice(index, 1);
  }

  findTrackIndexById(trackId: string): number {
    return this.tracks.findIndex((track) => track.id === trackId);
  }

  removeArtistFromTrack(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  removeAlbumFromTrack(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
