import { BaseAlbumDto } from 'src/modules/albums/dto/base-album.dto';
import { BaseArtistDto } from 'src/modules/artists/dto/base-artist.dto';
import { BaseTrackDto } from 'src/modules/tracks/dto/base-track.dto';

export class FavoritesResponseDto {
  artists: BaseArtistDto[];
  albums: BaseAlbumDto[];
  tracks: BaseTrackDto[];
}
