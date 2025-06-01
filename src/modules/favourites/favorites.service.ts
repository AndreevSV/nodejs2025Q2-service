import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesRepository } from 'src/db/favorites.repository';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { Favorites } from './entities/favorites.entity';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  findAll(): FavoritesResponseDto {
    const favorites: Favorites = this.favoritesRepository.findAll();

    const { artists, albums, tracks } = favorites;

    const favoritesResponseDto: FavoritesResponseDto = {
      artists: artists.length
        ? artists
            .map((id) => {
              try {
                return this.artistsService.findOne(id);
              } catch (error) {
                if (error instanceof NotFoundException) {
                  const index = this.favoritesRepository.findArtistIndex(id);
                  if (index !== -1) {
                    this.favoritesRepository.removeArtist(index);
                  }
                  return null;
                }
                throw error;
              }
            })
            .filter(Boolean)
        : [],
      albums: albums.length
        ? albums
            .map((id) => {
              try {
                return this.albumsService.findOne(id);
              } catch (error) {
                if (error instanceof NotFoundException) {
                  const index = this.favoritesRepository.findAlbumIndex(id);
                  if (index !== -1) {
                    this.favoritesRepository.removeAlbum(index);
                  }
                  return null;
                }
                throw error;
              }
            })
            .filter(Boolean)
        : [],
      tracks: tracks.length
        ? tracks
            .map((id) => {
              try {
                return this.tracksService.findOne(id);
              } catch (error) {
                if (error instanceof NotFoundException) {
                  const index = this.favoritesRepository.findAlbumIndex(id);
                  if (index !== -1) {
                    this.favoritesRepository.removeAlbum(index);
                  }
                  return null;
                }
                throw error;
              }
            })
            .filter(Boolean)
        : [],
    };

    return favoritesResponseDto;
  }

  addTrack(id: string) {
    const track = this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    const index = this.favoritesRepository.findTrackIndex(id);

    if (index !== -1) {
      throw new ConflictException(`Track with id ${id} already in Favorites`);
    }

    return this.favoritesRepository.addTrack(id);
  }

  removeTrack(id: string): void {
    const index = this.favoritesRepository.findTrackIndex(id);

    if (index === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.favoritesRepository.removeTrack(index);
  }

  addAlbum(id: string) {
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    const index = this.favoritesRepository.findAlbumIndex(id);

    if (index !== -1) {
      throw new ConflictException(`Album with id ${id} already in Favorites`);
    }

    return this.favoritesRepository.addAlbum(id);
  }

  removeAlbum(id: string): void {
    const index = this.favoritesRepository.findAlbumIndex(id);

    if (index === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.favoritesRepository.removeAlbum(index);
  }

  addArtist(id: string) {
    const track = this.artistsService.findOne(id);

    if (!track) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const index = this.favoritesRepository.findArtistIndex(id);

    if (index !== -1) {
      throw new ConflictException(`Artist with id ${id} already in Favorites`);
    }

    return this.favoritesRepository.addArtist(id);
  }

  removeArtist(id: string): void {
    const index = this.favoritesRepository.findArtistIndex(id);

    if (index === -1) {
      throw new NotFoundException(`Artistk with id ${id} not found`);
    }

    this.favoritesRepository.removeArtist(index);
  }
}
