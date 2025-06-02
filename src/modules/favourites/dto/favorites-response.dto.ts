import { BaseAlbumDto } from 'src/modules/albums/dto/base-album.dto';
import { BaseArtistDto } from 'src/modules/artists/dto/base-artist.dto';
import { BaseTrackDto } from 'src/modules/tracks/dto/base-track.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FavoritesResponseDto {
  @ApiProperty({ type: [BaseArtistDto] })
  artists: BaseArtistDto[];

  @ApiProperty({ type: [BaseAlbumDto] })
  albums: BaseAlbumDto[];

  @ApiProperty({ type: [BaseTrackDto] })
  tracks: BaseTrackDto[];
}
