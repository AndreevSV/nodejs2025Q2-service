import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../modules/tracks/entities/track.entity';

@Injectable()
export class TracksRepository {
  private tracks: Track[] = [
    {
      id: '33333333-3333-3333-3333-333333333331',
      name: 'Track A',
      duration: 180,
      artistId: '11111111-1111-1111-1111-111111111111',
      albumId: '22222222-2222-2222-2222-222222222221',
    },
    {
      id: '33333333-3333-3333-3333-333333333332',
      name: 'Track B',
      duration: 190,
      artistId: '11111111-1111-1111-1111-111111111112',
      albumId: '22222222-2222-2222-2222-222222222222',
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      name: 'Track C',
      duration: 200,
      artistId: '11111111-1111-1111-1111-111111111113',
      albumId: '22222222-2222-2222-2222-222222222223',
    },
    {
      id: '33333333-3333-3333-3333-333333333334',
      name: 'Track D',
      duration: 210,
      artistId: '11111111-1111-1111-1111-111111111114',
      albumId: '22222222-2222-2222-2222-222222222224',
    },
    {
      id: '33333333-3333-3333-3333-333333333335',
      name: 'Track E',
      duration: 220,
      artistId: '11111111-1111-1111-1111-111111111115',
      albumId: '22222222-2222-2222-2222-222222222225',
    },
  ];

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
